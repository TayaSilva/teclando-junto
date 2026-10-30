<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps<{ atividade?: unknown }>();
const emit = defineEmits<{ feito: [] }>();

const ANIMAIS = [
  { nome: 'gato', e: '🐱' }, { nome: 'passarinho', e: '🐦' }, { nome: 'coelho', e: '🐰' },
  { nome: 'cavalo', e: '🐴' }, { nome: 'vaca', e: '🐮' }, { nome: 'cachorro', e: '🐶' }, { nome: 'peixe', e: '🐟' },
];
const area = ref<HTMLElement | null>(null);
const alvo = ref<HTMLElement | null>(null);
const achou = ref(false);

// Considera "encontrado" quando a foto do cachorro aparece na área visível. A barra de rolagem, o toque e o teclado também valem.
onMounted(() => {
  if (!area.value || !alvo.value || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && e.intersectionRatio > 0.9 && !achou.value) { achou.value = true; emit('feito'); }
  }, { root: area.value, threshold: [0.9] });
  obs.observe(alvo.value);
});
function mostrar() { alvo.value?.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
</script>

<template>
  <div class="card flex flex-col gap-4">
    <p class="text-[1.2rem] font-bold sm:text-[1.4rem]">{{ achou ? 'Parabéns! Você encontrou o cachorro e concluiu o curso de mouse.' : 'Desça a página até encontrar a fotografia do cachorro.' }}</p>
    <p class="text-[0.95rem]">Gire a rodinha do mouse para baixo. Você também pode usar a barra de rolagem ao lado, arrastar com o dedo ou usar as setas ↓ e ↑ do teclado.</p>

    <div ref="area" tabindex="0" class="h-[300px] overflow-y-scroll rounded-xl border-4 border-ink bg-white p-4 sm:h-[360px]" aria-label="Página com fotografias de animais. Role para ver todas.">
      <figure v-for="a in ANIMAIS" :key="a.nome" :ref="a.nome === 'cachorro' ? (el) => (alvo = el as HTMLElement) : undefined" class="m-0 mb-6 flex flex-col items-center gap-2 rounded-xl bg-[#EEF3F5] p-5">
        <span class="text-[4rem] sm:text-[5rem]" aria-hidden="true">{{ a.e }}</span>
        <figcaption class="text-[1.1rem] font-bold">Foto: {{ a.nome }}</figcaption>
      </figure>
    </div>

    <div role="status" aria-live="polite" class="retorno" :class="achou ? 'retorno-ok' : 'retorno-neutro'"><span>{{ achou ? 'Você chegou na fotografia do cachorro.' : 'Sem pressa. Continue descendo a página.' }}</span></div>
    <button v-if="!achou" type="button" class="btn self-start max-sm:w-full" @click="mostrar">Preciso de ajuda: mostrar o cachorro</button>
  </div>
</template>
