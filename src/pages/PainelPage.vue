<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import Icone from '@/components/Icone.vue';
import ListaTrilhas from '@/components/ListaTrilhas.vue';
import { EXTRAS, TOTAL_LICOES, TRILHAS } from '@/data/trilhas';
import { PLANO } from '@/data/cursos';
import { useProgresso } from '@/composables/useProgresso';
import { usePreferencias } from '@/composables/usePreferencias';
import { useConta } from '@/composables/useConta';
import { ACESSO_DISPONIVEL } from '@/config/funcionalidades';

const progresso = useProgresso();
const { falar } = usePreferencias();
const total = progresso.totalConcluidas;
const extrasAbertos = ref(false);

const { conta, primeiroNome } = useConta();
const mostrarConvite = computed(() => ACESSO_DISPONIVEL && total.value >= 3 && !progresso.dados.conviteDispensado && !conta.logado);

const proxima = computed(() => {
  const item = PLANO.find((p) => !progresso.foiConcluida(p.prog)) ?? PLANO[0];
  const trilha = TRILHAS.find((t) => t.n === item.curso)!;
  return { titulo: `${item.id} · ${item.titulo}`, trilha: `Trilha ${trilha.n} · ${trilha.titulo}`, rota: item.rota, tempo: 'Cerca de 10 minutos.' };
});

const ultima = computed(() => progresso.dados.ultima);
const dataUltima = computed(() => (ultima.value ? new Date(ultima.value.data).toLocaleDateString('pt-BR') : ''));
</script>

<template>
  <div class="container-tj flex flex-col gap-8 pt-2 pb-16">
    <div class="flex flex-col gap-1">
      <h1 class="text-[2.2rem] leading-tight font-bold">{{ primeiroNome ? `Olá, ${primeiroNome}! Que bom ter você aqui.` : 'Olá! Que bom ter você aqui.' }}</h1>
      <p class="text-[1.05rem]">Continue de onde parou ou escolha outra trilha.</p>
    </div>

    <section v-if="mostrarConvite" aria-labelledby="conv-t" class="flex flex-wrap items-center gap-5 rounded-[18px] border-[3px] border-pri bg-superficie px-7 py-6">
      <Icone nome="ok" :tamanho="56" :traco="2" />
      <div class="flex min-w-0 flex-[1_1_420px] flex-col gap-1.5">
        <h2 id="conv-t" class="text-[1.35rem] leading-tight font-bold">Parabéns! Você concluiu {{ total }} atividades.</h2>
        <p>Agora que você já usa o teclado e o mouse, pode criar um acesso para guardar seu progresso e continuar em outro computador. É opcional.</p>
        <p class="text-[0.85rem]">Sem acesso, o progresso fica guardado só neste navegador e pode se perder se os dados dele forem apagados.</p>
      </div>
      <div class="flex flex-wrap gap-2.5">
        <RouterLink to="/cadastro" class="btn btn-pri btn-g">Criar meu acesso</RouterLink>
        <button type="button" class="btn btn-g" @click="progresso.dispensarConvite()">Agora não</button>
      </div>
    </section>

    <section aria-labelledby="prox-t" class="card-destaque flex flex-wrap items-center gap-6">
      <div class="flex min-w-0 flex-[1_1_420px] flex-col gap-2.5">
        <p class="sobretitulo">Sua próxima atividade</p>
        <h2 id="prox-t" class="text-[1.8rem] leading-tight font-bold">{{ proxima.titulo }}</h2>
        <p>{{ proxima.trilha }}</p>
        <p class="flex items-center gap-2"><Icone nome="relogio" :tamanho="20" /> {{ proxima.tempo }} Pode pausar quando quiser.</p>
        <div class="flex flex-wrap gap-2.5 pt-1.5">
          <RouterLink :to="proxima.rota" class="btn btn-pri btn-g">Continuar de onde parei <Icone nome="seta" :traco="2.6" /></RouterLink>
          <button type="button" class="btn btn-g" @click="falar(`Sua próxima atividade: ${proxima.titulo}. ${proxima.trilha}.`)"><Icone nome="som" /> Ouvir a explicação</button>
        </div>
      </div>
      <svg aria-hidden="true" width="260" height="170" viewBox="0 0 300 190" class="flex-[0_1_260px]">
        <rect x="18" y="40" width="54" height="130" rx="6" fill="#FFFFFF" stroke="#14213D" stroke-width="4" />
        <circle cx="45" cy="64" r="8" fill="none" stroke="#14213D" stroke-width="3" />
        <rect x="92" y="14" width="170" height="108" rx="8" fill="#FFFFFF" stroke="#14213D" stroke-width="4" />
        <rect x="104" y="26" width="146" height="84" rx="3" fill="#CDBDF0" />
        <path d="M165 122h24l5 18h-34z" fill="#14213D" />
        <rect x="96" y="150" width="140" height="22" rx="5" fill="#FFFFFF" stroke="#14213D" stroke-width="4" />
        <rect x="252" y="148" width="26" height="34" rx="13" fill="#FFFFFF" stroke="#14213D" stroke-width="4" />
      </svg>
    </section>

    <div class="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]">
      <section aria-labelledby="prog-t" class="card flex flex-col gap-2.5">
        <h2 id="prog-t" class="text-[1.2rem] font-bold">Seu progresso</h2>
        <p class="text-[1.6rem] font-bold">{{ total }} de {{ TOTAL_LICOES }} lições</p>
        <div class="barra" role="progressbar" aria-label="Lições concluídas" aria-valuemin="0" :aria-valuemax="TOTAL_LICOES" :aria-valuenow="total">
          <span :style="{ width: `${(total / TOTAL_LICOES) * 100}%` }" />
        </div>
        <p>Seu progresso fica salvo neste computador, sem precisar de cadastro.</p>
      </section>
      <section aria-labelledby="ult-t" class="card flex flex-col gap-2.5">
        <h2 id="ult-t" class="text-[1.2rem] font-bold">Última atividade</h2>
        <template v-if="ultima">
          <p class="text-[1.3rem] font-bold">{{ ultima.titulo }}</p>
          <p class="flex items-center gap-2"><Icone nome="ok" :traco="2.6" /> Concluída em {{ dataUltima }}</p>
        </template>
        <p v-else>Você ainda não concluiu nenhuma atividade. Que tal começar agora?</p>
      </section>
    </div>

    <section id="trilhas" aria-labelledby="trilhas-t" class="flex flex-col gap-4">
      <h2 id="trilhas-t" class="text-[1.6rem] font-bold">Trilhas de aprendizado</h2>
      <ListaTrilhas />
    </section>

    <section aria-labelledby="extras-t" class="flex flex-col gap-4 rounded-[18px] border-2 border-dashed border-sec bg-sec-claro p-4 sm:p-6">
      <h2 id="extras-t" class="m-0">
        <button type="button" class="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-transparent p-0 text-left" aria-controls="extras-lista" :aria-expanded="extrasAbertos" @click="extrasAbertos = !extrasAbertos">
          <span class="flex flex-col items-start gap-1">
            <span class="selo">Em breve</span>
            <span class="text-[1.6rem] font-bold">Módulos extras</span>
            <span class="text-[1rem] font-normal">Estamos preparando estes módulos para o dia a dia.</span>
          </span>
          <span class="btn btn-pri" aria-hidden="true">{{ extrasAbertos ? 'Fechar' : 'Ver módulos' }} <Icone nome="baixo" :tamanho="22" :traco="2.6" :class="extrasAbertos ? 'rotate-180' : ''" /></span>
        </button>
      </h2>
      <div v-if="extrasAbertos" id="extras-lista" class="flex flex-col gap-4">
        <ul class="grid list-none gap-3 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]">
          <li v-for="e in EXTRAS" :key="e.n" class="flex items-center gap-3 rounded-xl border-2 border-borda bg-superficie px-4 py-3">
            <span aria-hidden="true" class="numero border-sec bg-sec-suave text-sec-ink">{{ e.n }}</span>
            <span class="flex min-w-0 flex-col"><strong>{{ e.titulo }}</strong><span class="text-[0.9rem]">Em breve</span></span>
          </li>
        </ul>
        <span class="selo self-start">Disponíveis em breve</span>
      </div>
    </section>
  </div>
</template>
