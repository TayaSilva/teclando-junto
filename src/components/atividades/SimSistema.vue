<script setup lang="ts">
import { computed, ref } from 'vue';
import Icone from '@/components/Icone.vue';
import PassosLista from './PassosLista.vue';
import type { Atividade } from '@/data/cursos/tipos';

// Ambiente de treino do sistema: tudo acontece na memória da página. Nenhum arquivo real é tocado.
const props = defineProps<{ atividade: Extract<Atividade, { k: 'sim' }> }>();
const emit = defineEmits<{ feito: [] }>();
const modo = props.atividade.sim;

const passo = ref(0);
const msg = ref('');
const erro = ref(false);
const fim = computed(() => passo.value >= PASSOS.length);

const TODOS: Record<string, string[]> = {
  desktop: ['Encontrar o desenho de uma pasta.', 'Encontrar o menu Iniciar.'],
  janelas: ['Maximizar a janela.', 'Minimizar a janela.', 'Abrir novamente pela barra de tarefas.', 'Fechar a janela.'],
  pasta: ['Clicar em “Nova pasta”.', 'Escrever “Minhas fotos”.', 'Confirmar o nome.', 'Abrir a pasta.'],
  salvar: ['Clicar em Salvar.', 'Escolher a pasta Documentos.', 'Dar o nome “Minha anotação”.', 'Salvar.', 'Fechar e abrir o arquivo novamente.'],
  lixeira: ['Excluir o arquivo “Foto de treino”.', 'Abrir a lixeira.', 'Restaurar o arquivo.'],
};
const FINAL: Record<string, string> = {
  desktop: 'Agora você conhece a área de trabalho.', janelas: 'Muito bem! Você aprendeu a controlar as janelas.',
  pasta: 'Você criou sua primeira pasta!', salvar: 'Agora você sabe guardar e encontrar um arquivo.',
  lixeira: 'Parabéns! Você concluiu o curso sobre o sistema do computador.',
};
const PASSOS = TODOS[modo];

function ok(m: string) { erro.value = false; msg.value = m; passo.value++; if (fim.value) { msg.value = FINAL[modo]; emit('feito'); } }
function ops(m: string) { erro.value = true; msg.value = m; }

// ---- janelas ----
const win = ref<'normal' | 'max' | 'min' | 'closed'>('normal');
const clicarJanela = (acao: 'max' | 'min' | 'abrir' | 'fechar') => {
  if (acao === 'max') { if (passo.value === 0) { win.value = 'max'; ok('Maximizada: a janela ocupa mais espaço.'); } else ops('Siga o passo em destaque.'); }
  if (acao === 'min') { if (passo.value === 1) { win.value = 'min'; ok('Minimizada: a janela ficou escondida. Ela está na barra de tarefas.'); } else ops('Siga o passo em destaque.'); }
  if (acao === 'abrir') { if (passo.value === 2) { win.value = 'max'; ok('Pronto! A janela voltou.'); } else ops('Ainda não é a hora de abrir pela barra.'); }
  if (acao === 'fechar') { if (passo.value === 3) { win.value = 'closed'; ok(FINAL.janelas); } else ops('Siga o passo em destaque.'); }
};

// ---- pasta ----
const pastaCriada = ref(false);
const nomePasta = ref('');
const pastaConfirmada = ref(false);
const pastaAberta = ref(false);
const novaPasta = () => { if (passo.value === 0) { pastaCriada.value = true; ok('Uma pasta nova apareceu. Escreva o nome dela.'); } else ops('A pasta já foi criada.'); };
const nomePastaOk = () => nomePasta.value.trim().toLowerCase() === 'minhas fotos';
const digitouPasta = () => { if (passo.value === 1 && nomePastaOk()) ok('Nome escrito. Agora confirme com Enter ou no botão.'); };
const confirmarPasta = () => { if (passo.value === 2) { pastaConfirmada.value = true; ok('Pasta criada! Agora abra a pasta.'); } else if (passo.value < 2) ops('Escreva o nome “Minhas fotos” antes de confirmar.'); };
const abrirPasta = () => { if (passo.value === 3) { pastaAberta.value = true; ok(FINAL.pasta); } else ops('Primeiro crie e confirme a pasta.'); };

// ---- salvar ----
const textoNota = 'Minha primeira anotação.';
const dialogo = ref(false);
const pastaEscolhida = ref('');
const nomeArq = ref('');
const salvou = ref(false);
const aberto = ref(true);
const abrirSalvar = () => { if (passo.value === 0) { dialogo.value = true; ok('Escolha onde guardar: clique na pasta Documentos.'); } else ops('Siga o passo em destaque.'); };
const escolherPasta = (p: string) => { if (passo.value === 1) { if (p === 'Documentos') { pastaEscolhida.value = p; ok('Documentos escolhida. Agora dê um nome ao arquivo.'); } else ops('Para este treino, escolha a pasta Documentos.'); } };
const digitouNome = () => { if (passo.value === 2 && nomeArq.value.trim().toLowerCase() === 'minha anotação') ok('Nome escrito. Agora clique em Salvar.'); };
const confirmarSalvar = () => { if (passo.value === 3) { salvou.value = true; dialogo.value = false; ok('Salvo! Agora feche o arquivo e abra de novo, pela pasta Documentos.'); } else ops('Faça os passos na ordem.'); };
const fecharArq = () => { if (passo.value === 4 && aberto.value) { aberto.value = false; msg.value = 'Arquivo fechado. Agora procure “Minha anotação” na pasta Documentos e abra.'; erro.value = false; } else if (passo.value < 4) ops('Salve primeiro o arquivo.'); };
const abrirArq = () => { if (passo.value === 4 && !aberto.value) { aberto.value = true; ok(FINAL.salvar); } };

// ---- lixeira ----
const noArquivos = ref(true);
const noLixo = ref(false);
const verLixeira = ref(false);
const excluir = () => { if (passo.value === 0) { noArquivos.value = false; noLixo.value = true; ok('O arquivo foi para a lixeira. Agora abra a lixeira.'); } else ops('Siga o passo em destaque.'); };
const abrirLixeira = () => { if (passo.value === 1) { verLixeira.value = true; ok('Aqui está o arquivo. Clique em Restaurar.'); } else if (passo.value === 0) ops('Primeiro exclua o arquivo “Foto de treino”.'); else verLixeira.value = true; };
const restaurar = () => { if (passo.value === 2) { noLixo.value = false; noArquivos.value = true; ok(FINAL.lixeira); } };

// ---- desktop ----
const cliqueIcone = (qual: string) => {
  if (qual === 'pasta' && passo.value === 0) ok('Isso mesmo! Esse é o desenho de uma pasta. Agora encontre o menu Iniciar.');
  else if (qual === 'iniciar' && passo.value === 1) ok(FINAL.desktop);
  else ops(qual === 'iniciar' ? 'Esse é o menu Iniciar. Primeiro encontre a pasta.' : 'Esse não é o desenho de uma pasta. Procure o desenho amarelo.');
};
</script>

<template>
  <div class="card flex flex-col gap-4">
    <PassosLista :passos="PASSOS" :atual="passo" />

    <!-- Área de trabalho -->
    <div v-if="modo === 'desktop'" class="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-xl border-4 border-ink bg-[#3b78b8]">
      <div class="flex flex-wrap gap-3 p-3">
        <button type="button" class="flex w-[88px] flex-col items-center gap-1 rounded-lg border-2 border-transparent bg-transparent p-1.5 text-[0.8rem] font-bold text-white hover:border-white" aria-label="Ícone: pasta" @click="cliqueIcone('pasta')"><span class="text-[2.2rem]" aria-hidden="true">📁</span>Documentos</button>
        <button type="button" class="flex w-[88px] flex-col items-center gap-1 rounded-lg border-2 border-transparent bg-transparent p-1.5 text-[0.8rem] font-bold text-white hover:border-white" aria-label="Ícone: lixeira" @click="cliqueIcone('lixeira')"><span class="text-[2.2rem]" aria-hidden="true">🗑️</span>Lixeira</button>
        <button type="button" class="flex w-[88px] flex-col items-center gap-1 rounded-lg border-2 border-transparent bg-transparent p-1.5 text-[0.8rem] font-bold text-white hover:border-white" aria-label="Ícone: navegador" @click="cliqueIcone('navegador')"><span class="text-[2.2rem]" aria-hidden="true">🌐</span>Navegador</button>
      </div>
      <div class="flex h-11 items-center gap-2 bg-[#14213D] px-2">
        <button type="button" class="grid size-9 place-items-center rounded bg-white p-0 text-[1.2rem] font-bold" aria-label="Menu Iniciar" @click="cliqueIcone('iniciar')">⊞</button>
        <span class="text-[0.8rem] text-white/80">Barra de tarefas</span>
      </div>
    </div>

    <!-- Janelas -->
    <div v-else-if="modo === 'janelas'" class="flex min-h-[340px] flex-col justify-between rounded-xl border-4 border-ink bg-[#3b78b8] p-2">
      <div class="flex flex-1 items-start justify-center">
        <div v-if="win === 'normal' || win === 'max'" class="flex flex-col overflow-hidden rounded-lg border-4 border-ink bg-white" :class="win === 'max' ? 'h-full w-full' : 'mt-4 h-[180px] w-[72%] min-w-[250px]'">
          <div class="flex items-center justify-between gap-2 bg-pri-suave px-2 py-1">
            <span class="truncate text-[0.9rem] font-bold">Minhas fotos</span>
            <span class="flex gap-1">
              <button type="button" class="grid size-11 place-items-center rounded border-2 border-ink bg-white p-0 font-bold" aria-label="Minimizar" @click="clicarJanela('min')">—</button>
              <button type="button" class="grid size-11 place-items-center rounded border-2 border-ink bg-white p-0 font-bold" aria-label="Maximizar" @click="clicarJanela('max')">▢</button>
              <button type="button" class="grid size-11 place-items-center rounded border-2 border-ink bg-white p-0 font-bold" aria-label="Fechar" @click="clicarJanela('fechar')">✕</button>
            </span>
          </div>
          <p class="p-4 text-[1rem]">Esta é uma janela de treino.</p>
        </div>
      </div>
      <div class="flex h-12 items-center gap-2 bg-[#14213D] px-2">
        <button v-if="win !== 'closed'" type="button" class="btn text-[0.85rem]" :class="win === 'min' ? 'btn-pri' : ''" aria-label="Minhas fotos na barra de tarefas" @click="clicarJanela('abrir')">📁 Minhas fotos</button>
        <span v-else class="text-[0.85rem] text-white/80">Nenhuma janela aberta</span>
      </div>
    </div>

    <!-- Pasta nova -->
    <div v-else-if="modo === 'pasta'" class="flex min-h-[260px] flex-col gap-3 rounded-xl border-4 border-ink bg-[#EEF3F5] p-3">
      <div v-if="!pastaAberta" class="flex flex-col gap-3">
        <button type="button" class="btn self-start max-sm:w-full" @click="novaPasta">Nova pasta</button>
        <div v-if="pastaCriada" class="flex flex-wrap items-center gap-3 rounded-xl bg-white p-3">
          <span class="text-[2.6rem]" aria-hidden="true">📁</span>
          <template v-if="!pastaConfirmada">
            <label class="flex min-w-0 flex-[1_1_200px] flex-col gap-1 font-bold">Nome da pasta<input v-model="nomePasta" type="text" class="entrada" autocomplete="off" @input="digitouPasta" @keydown.enter="confirmarPasta" /></label>
            <button type="button" class="btn btn-pri max-sm:w-full" @click="confirmarPasta">Confirmar</button>
          </template>
          <template v-else>
            <strong class="text-[1.15rem]">{{ nomePasta }}</strong>
            <button type="button" class="btn btn-pri max-sm:w-full" @click="abrirPasta" @dblclick="abrirPasta">Abrir a pasta</button>
          </template>
        </div>
      </div>
      <p v-else class="rounded-xl bg-white p-4 text-[1.05rem]">📂 <strong>{{ nomePasta }}</strong> — a pasta está aberta. Ainda está vazia.</p>
    </div>

    <!-- Salvar -->
    <div v-else-if="modo === 'salvar'" class="flex min-h-[260px] flex-col gap-3 rounded-xl border-4 border-ink bg-[#EEF3F5] p-3">
      <template v-if="aberto && !dialogo">
        <p class="rounded-xl bg-white p-4 text-[1.1rem]">{{ salvou ? `📄 ${nomeArq || 'Minha anotação'}` : 'Documento sem título' }}<br />{{ textoNota }}</p>
        <div class="flex flex-wrap gap-2">
          <button v-if="!salvou" type="button" class="btn btn-pri max-sm:w-full" @click="abrirSalvar">Salvar</button>
          <button v-else type="button" class="btn max-sm:w-full" @click="fecharArq">Fechar o arquivo</button>
        </div>
      </template>
      <div v-if="dialogo" class="flex flex-col gap-3 rounded-xl bg-white p-4" role="dialog" aria-label="Salvar como">
        <strong>Salvar como</strong>
        <div class="flex flex-wrap gap-2" role="group" aria-label="Escolha a pasta">
          <button v-for="p in ['Documentos', 'Imagens', 'Downloads']" :key="p" type="button" class="btn max-sm:flex-1" :aria-pressed="pastaEscolhida === p" @click="escolherPasta(p)">📁 {{ p }}</button>
        </div>
        <label class="flex flex-col gap-1 font-bold">Nome do arquivo<input v-model="nomeArq" type="text" class="entrada" autocomplete="off" @input="digitouNome" /></label>
        <button type="button" class="btn btn-pri self-start max-sm:w-full" @click="confirmarSalvar">Salvar</button>
      </div>
      <div v-if="!aberto" class="flex flex-col gap-2 rounded-xl bg-white p-4">
        <strong>📁 Documentos</strong>
        <button type="button" class="btn self-start max-sm:w-full" @click="abrirArq" @dblclick="abrirArq">📄 Minha anotação</button>
      </div>
    </div>

    <!-- Lixeira -->
    <div v-else class="flex min-h-[260px] flex-col gap-3 rounded-xl border-4 border-ink bg-[#EEF3F5] p-3">
      <div class="flex flex-wrap gap-2">
        <button type="button" class="btn max-sm:flex-1" :aria-pressed="!verLixeira" @click="verLixeira = false">📁 Meus arquivos</button>
        <button type="button" class="btn max-sm:flex-1" :aria-pressed="verLixeira" @click="abrirLixeira">🗑️ Lixeira</button>
      </div>
      <div v-if="!verLixeira" class="flex flex-wrap items-center gap-3 rounded-xl bg-white p-3">
        <template v-if="noArquivos"><span class="text-[1.15rem]">🖼️ Foto de treino</span><button type="button" class="btn btn-pri max-sm:w-full" @click="excluir">Excluir</button></template>
        <span v-else>A pasta está vazia.</span>
      </div>
      <div v-else class="flex flex-wrap items-center gap-3 rounded-xl bg-white p-3">
        <template v-if="noLixo"><span class="text-[1.15rem]">🖼️ Foto de treino</span><button type="button" class="btn btn-pri max-sm:w-full" @click="restaurar">Restaurar</button></template>
        <span v-else>A lixeira está vazia.</span>
      </div>
    </div>

    <div role="status" aria-live="polite" class="retorno" :class="fim ? 'retorno-ok' : erro ? 'retorno-erro' : 'retorno-neutro'">
      <Icone :nome="fim ? 'ok' : erro ? 'alerta' : 'lampada'" :tamanho="28" :traco="2.4" :cor="fim ? 'var(--color-pri)' : 'var(--color-sec-ink)'" />
      <span>{{ msg || 'Siga o passo em destaque. Sem pressa e sem risco: é só um treino.' }}</span>
    </div>
  </div>
</template>
