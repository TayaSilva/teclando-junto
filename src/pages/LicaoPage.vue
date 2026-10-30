<script setup lang="ts">
import { computed, ref, watch, type Component } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import Icone from '@/components/Icone.vue';
import Ilustracao from '@/components/ilustracoes/Ilustracao.vue';
import AtivEscolha from '@/components/atividades/AtivEscolha.vue';
import AtivDigitar from '@/components/atividades/AtivDigitar.vue';
import AtivPonteiro from '@/components/atividades/AtivPonteiro.vue';
import AtivClique from '@/components/atividades/AtivClique.vue';
import AtivCliqueDuplo from '@/components/atividades/AtivCliqueDuplo.vue';
import AtivArrastar from '@/components/atividades/AtivArrastar.vue';
import AtivRolagem from '@/components/atividades/AtivRolagem.vue';
import AtivMensagem from '@/components/atividades/AtivMensagem.vue';
import SimComputador from '@/components/atividades/SimComputador.vue';
import SimSistema from '@/components/atividades/SimSistema.vue';
import SimNavegador from '@/components/atividades/SimNavegador.vue';
import SimEmail from '@/components/atividades/SimEmail.vue';
import SimVideochamada from '@/components/atividades/SimVideochamada.vue';
import { LICOES_GERAIS, PLANO, itemPorId, proximoItem } from '@/data/cursos';
import type { Atividade } from '@/data/cursos/tipos';
import { TRILHAS } from '@/data/trilhas';
import { useProgresso } from '@/composables/useProgresso';
import { usePreferencias } from '@/composables/usePreferencias';

const route = useRoute();
const router = useRouter();
const progresso = useProgresso();
const { falar, parar } = usePreferencias();

const licao = computed(() => LICOES_GERAIS.find((l) => l.id === route.params.id));
const item = computed(() => itemPorId(String(route.params.id)));
const trilha = computed(() => TRILHAS.find((t) => t.n === licao.value?.curso));
const posicao = computed(() => {
  const doCurso = PLANO.filter((p) => p.curso === licao.value?.curso);
  return { n: doCurso.findIndex((p) => p.id === licao.value?.id) + 1, total: doCurso.length };
});
const proxima = computed(() => proximoItem(String(route.params.id)));

const passo = ref(0);
const feitas = ref<Record<number, boolean>>({});
const tentativa = ref(0);

const nTelas = computed(() => licao.value?.telas.length ?? 0);
const nAtiv = computed(() => licao.value?.atividades.length ?? 0);
const total = computed(() => nTelas.value + nAtiv.value + 1);
const emTela = computed(() => passo.value < nTelas.value);
const iAtiv = computed(() => passo.value - nTelas.value);
const noFim = computed(() => passo.value === total.value - 1);
const tela = computed(() => (emTela.value ? licao.value!.telas[passo.value] : null));
const ativ = computed<Atividade | null>(() => (!emTela.value && !noFim.value ? licao.value!.atividades[iAtiv.value] : null));

watch(() => route.params.id, () => { passo.value = 0; feitas.value = {}; tentativa.value++; parar(); }, { immediate: true });

watch(noFim, (v) => {
  if (v && licao.value && item.value) progresso.concluir(item.value.prog, `${licao.value.id} · ${licao.value.titulo}`);
});

function ir(n: number) {
  parar();
  passo.value = Math.max(0, Math.min(total.value - 1, n));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
const anterior = computed(() => {
  const i = PLANO.findIndex((p) => p.id === String(route.params.id));
  return i > 0 ? PLANO[i - 1] : undefined;
});
// Na primeira tela, Voltar leva para a lição anterior (ou para as trilhas, se esta for a primeira).
function voltar() {
  if (passo.value > 0) return ir(passo.value - 1);
  router.push(anterior.value?.rota ?? '/trilhas');
}
function refazer() { feitas.value[iAtiv.value] = false; tentativa.value++; }

const COMPONENTES: Record<string, Component> = {
  escolha: AtivEscolha, digitar: AtivDigitar, ponteiro: AtivPonteiro, clique: AtivClique, cliqueduplo: AtivCliqueDuplo,
  arrastar: AtivArrastar, rolagem: AtivRolagem, mensagem: AtivMensagem,
};
function componenteDe(a: Atividade): Component {
  if (a.k !== 'sim') return COMPONENTES[a.k];
  if (a.sim === 'computador') return SimComputador;
  if (['desktop', 'janelas', 'pasta', 'salvar', 'lixeira'].includes(a.sim)) return SimSistema;
  if (['url', 'pesquisa', 'link', 'abas'].includes(a.sim)) return SimNavegador;
  if (a.sim === 'videochamada') return SimVideochamada;
  return SimEmail;
}

const ouvir = () => {
  if (tela.value) falar([tela.value.titulo, ...tela.value.texto].filter(Boolean).join('. '));
  else if (noFim.value) falar(licao.value!.conclusao);
};
</script>

<template>
  <div v-if="!licao" class="container-tj flex flex-col items-start gap-4 pt-2 pb-14">
    <h1 class="text-[1.6rem] font-bold">Não encontramos esta aula.</h1>
    <RouterLink to="/trilhas" class="btn btn-pri">Ver minhas trilhas</RouterLink>
  </div>

  <div v-else class="container-tj flex flex-col gap-5 pt-2 pb-14 max-sm:px-4">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div class="flex min-w-0 flex-col">
        <span class="text-[0.85rem]">Trilha {{ licao.curso }} · {{ trilha?.titulo }} · lição {{ posicao.n }} de {{ posicao.total }}</span>
        <h1 class="text-[1.4rem] leading-tight font-bold sm:text-[1.6rem]">{{ licao.id }} · {{ licao.titulo }}</h1>
      </div>
      <RouterLink to="/trilhas" class="btn max-sm:w-full"><Icone nome="voltar" :traco="2.6" /> Minhas trilhas</RouterLink>
    </div>

    <div class="flex flex-col gap-1.5">
      <p class="text-[0.95rem] font-bold">
        {{ emTela ? `Tela ${passo + 1} de ${nTelas}` : noFim ? 'Conclusão' : `Atividade${nAtiv > 1 ? ` ${iAtiv + 1} de ${nAtiv}` : ''}` }}
      </p>
      <div class="barra" role="progressbar" aria-label="Andamento da lição" aria-valuemin="0" :aria-valuemax="total" :aria-valuenow="passo + 1">
        <span :style="{ width: `${((passo + 1) / total) * 100}%` }" />
      </div>
    </div>

    <!-- Telas de explicação -->
    <section v-if="tela" aria-labelledby="tela-t" class="card flex flex-wrap items-center gap-6 sm:p-7">
      <div class="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
        <h2 v-if="tela.titulo" id="tela-t" class="text-[1.5rem] leading-tight font-bold sm:text-[1.8rem]">{{ tela.titulo }}</h2>
        <p v-for="(p, i) in tela.texto" :key="i" class="text-[1.15rem] leading-relaxed sm:text-[1.25rem]">{{ p }}</p>
        <div class="flex flex-wrap gap-2.5">
          <button type="button" class="btn btn-pri max-sm:flex-1" @click="ouvir"><Icone nome="som" /> Ouvir</button>
          <button type="button" class="btn max-sm:flex-1" @click="parar()"><Icone nome="pausa" /> Pausar</button>
        </div>
      </div>
      <div class="flex min-w-0 justify-center" :class="tela.largo ? 'flex-[1_1_100%]' : 'flex-[1_1_300px]'">
        <Ilustracao :nome="tela.img" class="h-auto w-full" :class="tela.largo ? '' : 'max-w-[460px]'" />
      </div>
    </section>

    <!-- Atividade -->
    <section v-else-if="ativ" aria-labelledby="ativ-t" class="flex flex-col gap-4">
      <h2 id="ativ-t" class="text-[1.3rem] font-bold">Vamos praticar</h2>
      <component :is="componenteDe(ativ)" :key="`${licao.id}-${iAtiv}-${tentativa}`" :atividade="ativ" @feito="feitas[iAtiv] = true" />
    </section>

    <!-- Conclusão -->
    <section v-else aria-labelledby="fim-t" class="flex flex-wrap items-center gap-6 rounded-[18px] border-[3px] border-ink bg-sec-suave p-6 sm:p-8">
      <svg aria-hidden="true" width="120" height="120" viewBox="0 0 120 120" class="shrink-0"><circle cx="60" cy="60" r="54" fill="#A58BDD" stroke="#14213D" stroke-width="4" /><path d="m36 62 16 16 32-34" fill="none" stroke="#14213D" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" /></svg>
      <div class="flex min-w-0 flex-[1_1_300px] flex-col gap-3">
        <span class="font-bold text-sec-ink">Lição {{ licao.id }} concluída</span>
        <h2 id="fim-t" class="text-[1.5rem] leading-tight font-bold sm:text-[1.7rem]">{{ licao.conclusao }}</h2>
        <div class="flex flex-wrap gap-2.5 pt-1.5">
          <RouterLink v-if="proxima" :to="proxima.rota" class="btn btn-pri btn-g max-sm:w-full">Próxima lição: {{ proxima.id }} {{ proxima.titulo }}</RouterLink>
          <RouterLink v-else to="/painel" class="btn btn-pri btn-g max-sm:w-full">Voltar ao início</RouterLink>
          <button type="button" class="btn btn-g max-sm:w-full" @click="ir(0); feitas = {}; tentativa++">Rever esta lição</button>
          <button type="button" class="btn max-sm:w-full" @click="ouvir"><Icone nome="som" /> Ouvir</button>
        </div>
      </div>
    </section>

    <!-- Navegação -->
    <div class="flex flex-wrap justify-between gap-2.5">
      <button type="button" class="btn max-sm:flex-1" @click="voltar"><Icone nome="voltar" :tamanho="20" :traco="2.6" /> {{ passo === 0 ? (anterior ? 'Lição anterior' : 'Minhas trilhas') : 'Voltar' }}</button>
      <div class="flex flex-wrap gap-2.5 max-sm:flex-1">
        <button v-if="ativ" type="button" class="btn max-sm:flex-1" @click="refazer"><Icone nome="repetir" :tamanho="20" :traco="2.4" /> Refazer</button>
        <button v-if="!noFim" type="button" class="btn btn-pri max-sm:flex-1" :disabled="!!ativ && !feitas[iAtiv]" @click="ir(passo + 1)">
          {{ emTela && passo === nTelas - 1 ? 'Ir para a atividade' : 'Avançar' }} <Icone nome="seta" :tamanho="20" :traco="2.6" />
        </button>
      </div>
    </div>
  </div>
</template>
