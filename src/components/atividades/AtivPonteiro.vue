<script setup lang="ts">
import { computed, ref } from 'vue';
import Icone from '@/components/Icone.vue';

// Alvos grandes em posições diferentes (em % da área). Funciona com mouse, toque e teclado (Tab + Enter).
defineProps<{ atividade?: unknown }>();
const emit = defineEmits<{ feito: [] }>();

const CIRCULOS = [
  { cor: 'azul', hex: '#2F6FB5', x: 12, y: 18 },
  { cor: 'vermelho', hex: '#C0392B', x: 70, y: 14 },
  { cor: 'verde', hex: '#2E8B57', x: 40, y: 60 },
  { cor: 'amarelo', hex: '#E0B000', x: 8, y: 66 },
  { cor: 'roxo', hex: '#6D4AAE', x: 76, y: 62 },
];
const PEDIDOS = ['azul', 'amarelo', 'verde'];
const n = ref(0);
const acertos = ref<string[]>([]);
const alvo = computed(() => PEDIDOS[n.value]);
const fim = computed(() => n.value >= PEDIDOS.length);

function tocar(cor: string) {
  if (fim.value || cor !== alvo.value) return;
  acertos.value.push(cor);
  n.value++;
  if (fim.value) emit('feito');
}
</script>

<template>
  <div class="card flex flex-col gap-4">
    <p class="text-[1.2rem] font-bold sm:text-[1.4rem]">{{ fim ? 'Você conseguiu movimentar a setinha! Agora vamos aprender a clicar.' : `Leve a setinha até o círculo ${alvo}.` }}</p>
    <p class="text-[0.95rem]">Basta passar a setinha por cima do círculo. Se estiver no celular ou tablet, toque nele. Pelo teclado, use Tab e Enter.</p>
    <div class="relative h-[320px] w-full overflow-hidden rounded-xl bg-[#EEF3F5] sm:h-[380px]" role="group" aria-label="Área com cinco círculos coloridos">
      <button
        v-for="c in CIRCULOS"
        :key="c.cor"
        type="button"
        class="absolute grid size-[72px] place-items-center rounded-full border-4 border-solid border-ink p-0 sm:size-24"
        :class="acertos.includes(c.cor) ? 'ring-8 ring-pri' : c.cor === alvo ? 'cursor-pointer' : ''"
        :style="{ left: `${c.x}%`, top: `${c.y}%`, background: c.hex }"
        :aria-label="`Círculo ${c.cor}`"
        @pointerenter="tocar(c.cor)"
        @click="tocar(c.cor)"
      >
        <Icone v-if="acertos.includes(c.cor)" nome="ok" :tamanho="40" :traco="3" cor="#fff" />
      </button>
    </div>
    <div role="status" aria-live="polite" class="retorno" :class="fim ? 'retorno-ok' : 'retorno-neutro'">
      <span>{{ fim ? 'Muito bem! Você alcançou os três círculos.' : `Círculos alcançados: ${acertos.length} de ${PEDIDOS.length}. Sem pressa.` }}</span>
    </div>
  </div>
</template>
