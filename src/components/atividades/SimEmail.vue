<script setup lang="ts">
import { computed, ref } from 'vue';
import Icone from '@/components/Icone.vue';
import PassosLista from './PassosLista.vue';
import { norm } from '@/lib/texto';
import type { Atividade } from '@/data/cursos/tipos';

// E-mail de treino: o "envio" acontece só aqui dentro. Nenhuma mensagem real é enviada.
const props = defineProps<{ atividade: Extract<Atividade, { k: 'sim' }> }>();
const emit = defineEmits<{ feito: [] }>();
const modo = props.atividade.sim as 'email-escrever' | 'email-anexo' | 'email-responder';

const TODOS = {
  'email-escrever': ['Escrever o destinatário: ana@exemplo.com.', 'Escrever o assunto: Bom dia.', 'Escrever a mensagem: Olá, Ana! Espero que você esteja bem.', 'Clicar em Enviar.'],
  'email-anexo': ['Clicar no clipe.', 'Escolher a fotografia “Flores.jpg”.', 'Confirmar.', 'Enviar a mensagem.'],
  'email-responder': ['Abrir o e-mail da Ana.', 'Clicar em Responder.', 'Escrever: Olá, Ana! Estou bem. Obrigado pela mensagem.', 'Enviar a resposta.'],
};
const PASSOS = TODOS[modo];
const passo = ref(0);
const msg = ref('');
const erro = ref(false);
const fim = computed(() => passo.value >= PASSOS.length);
const FINAL = { 'email-escrever': 'Muito bem! Você escreveu e enviou um e-mail no ambiente de treino.', 'email-anexo': 'Você aprendeu a colocar uma fotografia em um e-mail.', 'email-responder': 'Parabéns! Você aprendeu a se comunicar utilizando o computador.' };
function ok(m: string) { erro.value = false; msg.value = m; passo.value++; if (fim.value) { msg.value = FINAL[modo]; emit('feito'); } }
function ops(m: string) { erro.value = true; msg.value = m; }

const igual = (a: string, b: string) => norm(a.trim(), { ci: true, sa: true }, true) === norm(b.trim(), { ci: true, sa: true }, true);

const para = ref('');
const assunto = ref('');
const texto = ref('');
const enviado = ref(false);

// escrever
const confere = () => {
  if (modo !== 'email-escrever') return;
  if (passo.value === 0 && igual(para.value, 'ana@exemplo.com')) ok('Destinatário certo. Agora escreva o assunto.');
  else if (passo.value === 1 && igual(assunto.value, 'Bom dia')) ok('Assunto certo. Agora escreva a mensagem.');
  else if (passo.value === 2 && igual(texto.value, 'Olá, Ana! Espero que você esteja bem.')) ok('Mensagem pronta. Agora clique em Enviar.');
};
const camposVazios = () => !para.value.trim() || !assunto.value.trim() || !texto.value.trim();
function enviarEscrever() {
  if (passo.value < 3) return ops(camposVazios() ? 'Falta preencher algum campo. Siga o passo em destaque.' : 'Confira se os campos estão iguais ao treino.');
  enviado.value = true; ok('Enviado!');
}

// anexo
const seletor = ref(false);
const anexo = ref(false);
const arqEscolhido = ref(false);
const clipe = () => { if (passo.value === 0) { seletor.value = true; ok('A lista de arquivos abriu. Escolha “Flores.jpg”.'); } else ops('Siga o passo em destaque.'); };
const escolherArq = (nome: string) => { if (passo.value === 1) { if (nome === 'Flores.jpg') { arqEscolhido.value = true; ok('Boa! Agora confirme.'); } else ops('Para este treino, escolha “Flores.jpg”.'); } };
const confirmarAnexo = () => { if (passo.value === 2) { anexo.value = true; seletor.value = false; ok('A fotografia foi anexada. Agora envie a mensagem.'); } };
function enviarAnexo() { if (passo.value === 3) { enviado.value = true; ok('Enviado!'); } else ops('Anexe a fotografia antes de enviar.'); }

// responder
const aberto = ref(false);
const respondendo = ref(false);
const abrirEmail = () => { if (passo.value === 0) { aberto.value = true; ok('Esta é a mensagem da Ana. Para responder, clique em Responder.'); } };
const responder = () => { if (passo.value === 1) { respondendo.value = true; ok('Agora escreva sua resposta.'); } else ops('Primeiro abra o e-mail da Ana.'); };
const digitouResp = () => { if (passo.value === 2 && igual(texto.value, 'Olá, Ana! Estou bem. Obrigado pela mensagem.')) ok('Resposta pronta. Clique em Enviar.'); };
function enviarResp() { if (passo.value === 3) { enviado.value = true; ok('Enviada!'); } else ops('Escreva a resposta primeiro.'); }
</script>

<template>
  <div class="card flex flex-col gap-4">
    <PassosLista :passos="PASSOS" :atual="passo" />

    <div class="flex flex-col gap-3 rounded-xl border-4 border-ink bg-[#EEF3F5] p-3 sm:p-4">
      <!-- escrever -->
      <template v-if="modo === 'email-escrever'">
        <label class="flex flex-col gap-1 font-bold">Destinatário<input v-model="para" type="email" class="entrada" autocomplete="off" :readonly="enviado" @input="confere" /></label>
        <label class="flex flex-col gap-1 font-bold">Assunto<input v-model="assunto" type="text" class="entrada" autocomplete="off" :readonly="enviado" @input="confere" /></label>
        <label class="flex flex-col gap-1 font-bold">Mensagem<textarea v-model="texto" rows="4" class="entrada" :readonly="enviado" @input="confere" /></label>
        <button type="button" class="btn btn-pri self-start max-sm:w-full" :disabled="enviado" @click="enviarEscrever">Enviar</button>
      </template>

      <!-- anexo -->
      <template v-else-if="modo === 'email-anexo'">
        <p class="m-0 rounded-lg bg-white p-3"><strong>Para:</strong> ana@exemplo.com<br /><strong>Assunto:</strong> Minhas flores<br />Olá, Ana! Veja a foto que tirei.</p>
        <p v-if="anexo" class="m-0 flex items-center gap-2 rounded-lg border-2 border-pri bg-pri-suave p-3 font-bold"><Icone nome="imagem" :tamanho="26" /> Flores.jpg (anexo)</p>
        <div class="flex flex-wrap gap-2">
          <button type="button" class="btn max-sm:flex-1" :disabled="enviado" aria-label="Anexar arquivo (clipe)" @click="clipe">📎 Anexar</button>
          <button type="button" class="btn btn-pri max-sm:flex-1" :disabled="enviado" @click="enviarAnexo">Enviar</button>
        </div>
        <div v-if="seletor" class="flex flex-col gap-2 rounded-xl bg-white p-3" role="dialog" aria-label="Escolher arquivo">
          <strong>Escolha um arquivo</strong>
          <button v-for="n in ['Receita.txt', 'Flores.jpg', 'Viagem.mp4']" :key="n" type="button" class="btn justify-start" :aria-pressed="n === 'Flores.jpg' && arqEscolhido" @click="escolherArq(n)">{{ n === 'Flores.jpg' ? '🖼️' : n.endsWith('mp4') ? '🎬' : '📄' }} {{ n }}</button>
          <button type="button" class="btn btn-pri self-start max-sm:w-full" @click="confirmarAnexo">Confirmar</button>
        </div>
      </template>

      <!-- responder -->
      <template v-else>
        <button v-if="!aberto" type="button" class="flex flex-col rounded-xl border-2 border-ink bg-white p-3 text-left" @click="abrirEmail">
          <strong>Ana · ana@exemplo.com</strong><span>Como você está? <small class="opacity-70">(não lido)</small></span>
        </button>
        <template v-else>
          <p class="m-0 rounded-lg bg-white p-3"><strong>De:</strong> ana@exemplo.com<br />Olá! Gostaria de saber como você está. Um abraço, Ana.</p>
          <button v-if="!respondendo" type="button" class="btn btn-pri self-start max-sm:w-full" @click="responder">↩ Responder</button>
          <template v-else>
            <label class="flex flex-col gap-1 font-bold">Sua resposta<textarea v-model="texto" rows="3" class="entrada" :readonly="enviado" @input="digitouResp" /></label>
            <button type="button" class="btn btn-pri self-start max-sm:w-full" :disabled="enviado" @click="enviarResp">Enviar</button>
          </template>
        </template>
      </template>
    </div>

    <div role="status" aria-live="polite" class="retorno" :class="fim ? 'retorno-ok' : erro ? 'retorno-erro' : 'retorno-neutro'">
      <Icone :nome="fim ? 'ok' : erro ? 'alerta' : 'lampada'" :tamanho="28" :traco="2.4" :cor="fim ? 'var(--color-pri)' : 'var(--color-sec-ink)'" />
      <span>{{ msg || 'Siga o passo em destaque. Nenhum e-mail é enviado de verdade.' }}</span>
    </div>
  </div>
</template>
