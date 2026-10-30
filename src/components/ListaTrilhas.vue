<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { TRILHAS, rotaDaTrilha, type Trilha } from '@/data/trilhas';
import { useProgresso } from '@/composables/useProgresso';

const { foiConcluida } = useProgresso();

function feitas(t: Trilha) {
  return t.licoes.filter((id) => foiConcluida(id)).length;
}
function status(t: Trilha) {
  const f = feitas(t);
  if (f === 0) return 'Ainda não começou';
  if (f >= t.total) return 'Concluída';
  return `Em andamento · ${f} de ${t.total} lições`;
}
function acao(t: Trilha) {
  const f = feitas(t);
  return f === 0 ? 'Começar' : f >= t.total ? 'Rever' : 'Continuar';
}
</script>

<template>
  <ol class="grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(520px,100%),1fr))]">
    <li
      v-for="t in TRILHAS"
      :key="t.n"
      class="flex flex-wrap items-center gap-4 rounded-[14px] bg-superficie px-5 py-4"
      :class="feitas(t) > 0 && feitas(t) < t.total ? 'border-[3px] border-pri' : 'border-2 border-borda'"
    >
      <span aria-hidden="true" class="numero">{{ t.n }}</span>
      <div class="flex min-w-0 flex-[1_1_220px] flex-col gap-1">
        <strong class="text-[1.15rem]">{{ t.titulo }}</strong>
        <span class="text-[0.95rem]">{{ t.desc }}</span>
        <span class="text-[0.9rem] font-bold">{{ status(t) }}</span>
      </div>
      <RouterLink :to="rotaDaTrilha(t, foiConcluida)" class="btn max-sm:w-full" :class="feitas(t) > 0 && feitas(t) < t.total ? 'btn-pri' : ''">
        {{ acao(t) }}<span class="sr-only">: {{ t.titulo }}</span>
      </RouterLink>
    </li>
  </ol>
</template>
