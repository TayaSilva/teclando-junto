<script setup lang="ts">
import { computed, ref } from 'vue';
import Icone from '@/components/Icone.vue';

defineProps<{ atividade?: unknown }>();
const emit = defineEmits<{ feito: [] }>();

const FLORES = [
  { cor: 'amarela', hex: '#F2C230' },
  { cor: 'vermelha', hex: '#D64545' },
  { cor: 'azul', hex: '#4A7FD1' },
  { cor: 'rosa', hex: '#E87AB0' },
];
const PEDIDOS = ['amarela', 'rosa', 'azul', 'vermelha'];
const n = ref(0);
const destaque = ref<string[]>([]);
const erro = ref('');
const alvo = computed(() => PEDIDOS[n.value]);
const fim = computed(() => n.value >= PEDIDOS.length);

function clicar(cor: string) {
  if (fim.value) return;
  if (cor !== alvo.value) { erro.value = `Essa é a flor ${cor}. Procure a flor ${alvo.value}.`; return; }
  erro.value = '';
  destaque.value.push(cor);
  n.value++;
  if (fim.value) emit('feito');
}
</script>

<template>
  <div class="card flex flex-col gap-4">
    <p class="text-[1.2rem] font-bold sm:text-[1.4rem]">{{ fim ? 'Muito bem! Você já sabe clicar com o mouse.' : `Clique na flor ${alvo}.` }}</p>
    <div class="grid grid-cols-2 gap-3 rounded-xl bg-[#DDEBD3] p-4 sm:grid-cols-4 sm:gap-5" role="group" aria-label="Jardim com quatro flores">
      <button
        v-for="f in FLORES"
        :key="f.cor"
        type="button"
        class="relative flex flex-col items-center gap-1 rounded-2xl border-4 border-transparent bg-transparent p-2"
        :class="destaque.includes(f.cor) ? '!border-pri !bg-white' : 'hover:border-ink'"
        :aria-label="`Flor ${f.cor}`"
        @click="clicar(f.cor)"
      >
        <svg viewBox="0 0 120 150" class="h-auto w-full max-w-[140px]" aria-hidden="true">
          <path d="M60 80v62" stroke="#2E7D32" stroke-width="7" stroke-linecap="round" />
          <path d="M60 118c-20-4-26-16-26-16s16-2 26 16z" fill="#43A047" />
          <g :fill="f.hex" stroke="#14213D" stroke-width="3">
            <circle cx="60" cy="30" r="20" /><circle cx="86" cy="52" r="20" /><circle cx="34" cy="52" r="20" /><circle cx="44" cy="80" r="20" /><circle cx="76" cy="80" r="20" />
          </g>
          <circle cx="60" cy="58" r="16" fill="#8B5A2B" stroke="#14213D" stroke-width="3" />
        </svg>
        <Icone v-if="destaque.includes(f.cor)" nome="ok" :tamanho="32" :traco="3" cor="var(--color-pri)" />
      </button>
    </div>
    <div role="status" aria-live="polite" class="retorno" :class="fim ? 'retorno-ok' : erro ? 'retorno-erro' : 'retorno-neutro'">
      <span>{{ fim ? 'Você clicou nas quatro flores.' : erro || `Flores encontradas: ${destaque.length} de ${PEDIDOS.length}.` }}</span>
    </div>
  </div>
</template>
