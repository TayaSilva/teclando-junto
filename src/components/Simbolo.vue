<script setup lang="ts">
import { computed } from 'vue';

// Símbolo do TJ Teclando Juntos: duas teclas, T e J, lado a lado.
const props = withDefaults(defineProps<{ largura?: number; variante?: 'clara' | 'escura'; fundo?: string; rotulo?: string }>(), {
  largura: 70,
  variante: 'clara',
  fundo: '#FFFFFF',
});

const c = computed(() =>
  props.variante === 'escura'
    ? { tBase: '#B9C4CC', tTopo: '#FFFFFF', tLetra: '#14213D', jBase: '#3E9AA8', jTopo: '#A8DCE3' }
    : { tBase: '#14213D', tTopo: '#2E4170', tLetra: '#FFFFFF', jBase: '#0B5D6B', jTopo: '#DCEBEE' },
);
</script>

<template>
  <svg
    :role="rotulo ? 'img' : undefined"
    :aria-label="rotulo"
    :aria-hidden="rotulo ? undefined : 'true'"
    :width="largura"
    :height="(largura * 80) / 112"
    viewBox="0 0 112 80"
    class="shrink-0"
  >
    <rect x="2" y="2" width="56" height="58" rx="14" :fill="c.tBase" />
    <rect x="7" y="4" width="46" height="45" rx="10" :fill="c.tTopo" />
    <text x="30" y="38" text-anchor="middle" font-family="Atkinson Hyperlegible, Verdana, sans-serif" font-weight="700" font-size="32" :fill="c.tLetra">T</text>
    <rect x="52" y="20" width="58" height="58" rx="14" :fill="c.jBase" :stroke="fundo" stroke-width="4" />
    <rect x="58" y="23" width="46" height="44" rx="10" :fill="c.jTopo" />
    <text x="81" y="56" text-anchor="middle" font-family="Atkinson Hyperlegible, Verdana, sans-serif" font-weight="700" font-size="32" fill="#14213D">J</text>
  </svg>
</template>
