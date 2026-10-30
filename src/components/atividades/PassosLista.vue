<script setup lang="ts">
import Icone from '@/components/Icone.vue';

// Lista de passos de um treino: feitos, o atual em destaque e os próximos.
defineProps<{ passos: string[]; atual: number }>();
</script>

<template>
  <ol class="m-0 flex list-none flex-col gap-1.5 p-0" aria-label="Passos do treino">
    <li v-for="(p, i) in passos" :key="p" class="flex items-center gap-2 rounded-lg px-3 py-2" :class="i < atual ? 'bg-pri-suave' : i === atual ? 'border-2 border-pri font-bold' : 'opacity-70'" :aria-current="i === atual ? 'step' : undefined">
      <Icone v-if="i < atual" nome="ok" :tamanho="22" :traco="2.6" cor="var(--color-pri)" /><span v-else class="w-[22px] shrink-0 text-center">{{ i + 1 }}</span>
      <span>{{ p }}</span>
    </li>
  </ol>
</template>
