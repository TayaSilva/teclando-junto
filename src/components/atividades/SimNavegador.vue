<script setup lang="ts">
import { computed, ref } from 'vue';
import Icone from '@/components/Icone.vue';
import PassosLista from './PassosLista.vue';
import { norm } from '@/lib/texto';
import type { Atividade } from '@/data/cursos/tipos';

// Navegador de treino: nenhuma página real é aberta e nenhuma requisição de rede é feita.
const props = defineProps<{ atividade: Extract<Atividade, { k: 'sim' }> }>();
const emit = defineEmits<{ feito: [] }>();
const modo = props.atividade.sim;

const TODOS: Record<string, string[]> = {
  url: ['Clicar na barra de endereço e escrever www.exemplo.com.', 'Apertar Enter.'],
  pesquisa: ['Escrever “Como cuidar de plantas?” na pesquisa.', 'Apertar Enter ou clicar em Pesquisar.', 'Abrir um dos resultados.'],
  link: ['Clicar no link “Receitas de bolo”.'],
  abas: ['Abrir uma nova aba.', 'Acessar a página de notícias.', 'Voltar à primeira aba.', 'Fechar a segunda aba.'],
};
const FINAL: Record<string, string> = {
  url: 'Muito bem! Você abriu um site digitando o endereço.', pesquisa: 'Você aprendeu a procurar informações na internet.',
  link: 'Muito bem! Você clicou em um link e abriu outra página.', abas: 'Agora você já sabe utilizar mais de uma aba.',
};
const PASSOS = TODOS[modo];
const passo = ref(0);
const msg = ref('');
const erro = ref(false);
const fim = computed(() => passo.value >= PASSOS.length);
function ok(m: string) { erro.value = false; msg.value = m; passo.value++; if (fim.value) { msg.value = FINAL[modo]; emit('feito'); } }
function ops(m: string) { erro.value = true; msg.value = m; }

const limpa = (s: string) => norm(s.replace(/[?!.]/g, '').replace(/^https?:\/\//i, '').replace(/\/$/, '').trim(), { ci: true, sa: true }, true);

// ---- url ----
const endereco = ref('');
const pagina = ref<'inicio' | 'exemplo'>('inicio');
function digitouUrl() { if (modo === 'url' && passo.value === 0 && limpa(endereco.value) === 'www.exemplo.com') ok('Endereço escrito. Agora aperte Enter.'); }
function enterUrl() {
  if (limpa(endereco.value) !== 'www.exemplo.com') return ops('Escreva www.exemplo.com na barra de endereço e aperte Enter.');
  if (passo.value === 0) passo.value = 1;
  pagina.value = 'exemplo'; ok('A página abriu.');
}

// ---- pesquisa ----
const consulta = ref('');
const etapa = ref<'busca' | 'resultados' | 'dicas'>('busca');
const RESULTADOS = ['Dicas simples de jardinagem para iniciantes', 'Como regar suas plantas na medida certa', 'Plantas que gostam de pouca luz'];
function digitouBusca() { if (passo.value === 0 && limpa(consulta.value) === 'como cuidar de plantas') ok('Pergunta escrita. Agora aperte Enter ou clique em Pesquisar.'); }
function pesquisar() {
  if (limpa(consulta.value) !== 'como cuidar de plantas') return ops('Escreva: Como cuidar de plantas?');
  if (passo.value === 0) passo.value = 1;
  etapa.value = 'resultados'; ok('Aqui estão os resultados. Clique em um deles.');
}
function abrirResultado() { if (passo.value === 2) { etapa.value = 'dicas'; ok(FINAL.pesquisa); } }

// ---- link ----
const receita = ref(false);
function clicarLink(qual: string) {
  if (qual === 'bolo') { receita.value = true; ok(FINAL.link); } else ops('Esse é outro link. Procure “Receitas de bolo”.');
}

// ---- abas ----
const abas = ref<{ id: number; tipo: 'nova' | 'noticias' | 'inicio' }[]>([{ id: 1, tipo: 'inicio' }]);
const ativa = ref(1);
const atual = computed(() => abas.value.find((a) => a.id === ativa.value)!);
function novaAba() {
  if (passo.value !== 0) return ops('A nova aba já foi aberta.');
  abas.value.push({ id: 2, tipo: 'nova' }); ativa.value = 2; ok('Aba aberta! Agora acesse a página de notícias.');
}
function irNoticias() {
  if (passo.value === 1 && ativa.value === 2) { abas.value[1].tipo = 'noticias'; ok('Notícias abertas. Agora volte à primeira aba, clicando nela.'); } else ops('Siga o passo em destaque.');
}
function escolherAba(id: number) {
  ativa.value = id;
  if (passo.value === 2 && id === 1) ok('Você voltou à primeira aba. Agora feche a segunda aba, no X dela.');
}
function fecharAba(id: number) {
  if (passo.value === 3 && id === 2) { abas.value = abas.value.filter((a) => a.id !== 2); ativa.value = 1; ok(FINAL.abas); } else ops('Para este treino, feche a segunda aba só no final.');
}
</script>

<template>
  <div class="card flex flex-col gap-4">
    <PassosLista :passos="PASSOS" :atual="passo" />

    <div class="overflow-hidden rounded-xl border-4 border-ink bg-white">
      <!-- abas -->
      <div v-if="modo === 'abas'" class="flex flex-wrap items-end gap-1 bg-[#DCE3E7] px-2 pt-2" role="tablist">
        <div v-for="(a, i) in abas" :key="a.id" class="flex items-center rounded-t-lg border-2 border-b-0 border-ink" :class="a.id === ativa ? 'bg-white' : 'bg-[#EEF3F5]'">
          <button type="button" role="tab" :aria-selected="a.id === ativa" class="min-h-11 bg-transparent px-3 text-[0.9rem] font-bold" @click="escolherAba(a.id)">Aba {{ i + 1 }}</button>
          <button v-if="a.id === 2" type="button" class="grid size-11 place-items-center bg-transparent p-0 font-bold" aria-label="Fechar a segunda aba" @click="fecharAba(2)">✕</button>
        </div>
        <button v-if="abas.length < 2" type="button" class="mb-1 grid size-11 place-items-center rounded-full border-2 border-ink bg-white p-0 text-[1.3rem] font-bold" aria-label="Abrir nova aba" @click="novaAba">+</button>
      </div>
      <!-- barra de endereço -->
      <div class="flex items-center gap-2 border-b-2 border-ink bg-pri-claro p-2">
        <Icone nome="globo" :tamanho="26" />
        <input v-if="modo === 'url'" v-model="endereco" type="text" class="entrada min-h-11 flex-1 text-[1rem]" aria-label="Barra de endereço" placeholder="Escreva o endereço do site" autocomplete="off" @input="digitouUrl" @keydown.enter="enterUrl" />
        <span v-else class="min-w-0 flex-1 truncate rounded-lg border-2 border-borda bg-white px-3 py-2 text-[0.95rem]">{{ modo === 'pesquisa' ? 'www.buscador-treino.com' : modo === 'link' ? 'www.receitas-treino.com' : 'www.treino.com' }}</span>
      </div>

      <div class="min-h-[240px] p-4 sm:p-6">
        <template v-if="modo === 'url'">
          <p v-if="pagina === 'inicio'" class="text-[1.05rem]">Escreva o endereço na barra acima e aperte Enter.</p>
          <div v-else class="flex flex-col gap-2"><h3 class="text-[1.6rem] font-bold">Bem-vindo ao Exemplo!</h3><p class="text-[1.05rem]">Esta é uma página fictícia de boas-vindas, criada para o treino.</p></div>
        </template>

        <template v-else-if="modo === 'pesquisa'">
          <div v-if="etapa === 'busca'" class="flex flex-wrap items-end gap-2">
            <label class="flex min-w-0 flex-[1_1_240px] flex-col gap-1 font-bold">Pesquisar<input v-model="consulta" type="text" class="entrada" autocomplete="off" @input="digitouBusca" @keydown.enter="pesquisar" /></label>
            <button type="button" class="btn btn-pri max-sm:w-full" @click="pesquisar">Pesquisar</button>
          </div>
          <ul v-else-if="etapa === 'resultados'" class="m-0 flex list-none flex-col gap-3 p-0">
            <li v-for="r in RESULTADOS" :key="r"><button type="button" class="w-full rounded-xl border-2 border-borda bg-white p-3 text-left text-[1.05rem] font-bold text-pri-ink underline" @click="abrirResultado">{{ r }}</button></li>
          </ul>
          <div v-else class="flex flex-col gap-2"><h3 class="text-[1.4rem] font-bold">Dicas simples de jardinagem</h3><ul class="m-0 pl-5 text-[1.05rem]"><li>Regue de manhã cedo ou no fim da tarde.</li><li>Deixe a planta onde receba luz do dia.</li><li>Não encharque a terra: o excesso de água faz mal.</li></ul></div>
        </template>

        <template v-else-if="modo === 'link'">
          <div v-if="!receita" class="flex flex-col gap-3">
            <h3 class="text-[1.4rem] font-bold">Receitas da vovó</h3>
            <p class="text-[1.05rem]">Escolha uma receita:</p>
            <button type="button" class="self-start bg-transparent p-1 text-[1.15rem] font-bold text-pri-ink underline" @click="clicarLink('sopa')">Receitas de sopa</button>
            <button type="button" class="self-start bg-transparent p-1 text-[1.15rem] font-bold text-pri-ink underline" @click="clicarLink('bolo')">Receitas de bolo</button>
            <button type="button" class="self-start bg-transparent p-1 text-[1.15rem] font-bold text-pri-ink underline" @click="clicarLink('doce')">Receitas de doce</button>
          </div>
          <div v-else class="flex flex-col gap-2"><h3 class="text-[1.4rem] font-bold">Bolo de fubá simples</h3><p class="text-[1.05rem]">2 xícaras de fubá, 3 ovos e 1 copo de leite. Misture tudo e leve ao forno por 40 minutos.</p></div>
        </template>

        <template v-else>
          <p v-if="atual.tipo === 'inicio'" class="text-[1.05rem]">Esta é a primeira aba. {{ abas.length > 1 ? 'Ela continua aberta.' : 'Clique no + para abrir outra.' }}</p>
          <div v-else-if="atual.tipo === 'nova'" class="flex flex-col gap-3"><p class="text-[1.05rem]">Aba nova. Escolha um atalho:</p><button type="button" class="self-start bg-transparent p-1 text-[1.15rem] font-bold text-pri-ink underline" @click="irNoticias">Notícias</button></div>
          <div v-else class="flex flex-col gap-2"><h3 class="text-[1.4rem] font-bold">Notícias de hoje</h3><p class="text-[1.05rem]">Página fictícia de notícias, criada para o treino.</p></div>
        </template>
      </div>
    </div>

    <div role="status" aria-live="polite" class="retorno" :class="fim ? 'retorno-ok' : erro ? 'retorno-erro' : 'retorno-neutro'">
      <Icone :nome="fim ? 'ok' : erro ? 'alerta' : 'lampada'" :tamanho="28" :traco="2.4" :cor="fim ? 'var(--color-pri)' : 'var(--color-sec-ink)'" />
      <span>{{ msg || 'Siga o passo em destaque. É só um treino: nada sai do site.' }}</span>
    </div>
  </div>
</template>
