<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue';
import Icone from '@/components/Icone.vue';
import { usePreferencias } from '@/composables/usePreferencias';
import type { Atividade } from '@/data/cursos/tipos';

const props = defineProps<{ atividade: Extract<Atividade, { k: 'jogoLetras' }> }>();
const emit = defineEmits<{ feito: [] }>();
const { falar } = usePreferencias();

const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const total = computed(() => props.atividade.rodadas);

const fase = ref<'inicio' | 'jogando' | 'fim'>('inicio');
const fila = ref<string[]>([]);
const pos = ref(0);
const erros = ref(0);
const errou = ref(false);
const ms = ref(0);
const campo = ref<HTMLInputElement | null>(null);
let relogio: ReturnType<typeof setInterval> | undefined;
let t0 = 0;

const letra = computed(() => fila.value[pos.value] ?? '');
const tempo = computed(() => (ms.value / 1000).toFixed(1).replace('.', ','));
const falaTempo = computed(() => `${Math.round(ms.value / 1000)} segundos`);

function sortear() {
  const f: string[] = [];
  while (f.length < total.value) {
    const l = LETRAS[Math.floor(Math.random() * LETRAS.length)];
    if (l !== f[f.length - 1]) f.push(l);
  }
  return f;
}

function parar() {
  clearInterval(relogio);
  relogio = undefined;
}

async function comecar() {
  fila.value = sortear();
  pos.value = 0;
  erros.value = 0;
  errou.value = false;
  ms.value = 0;
  fase.value = 'jogando';
  t0 = Date.now();
  parar();
  relogio = setInterval(() => (ms.value = Date.now() - t0), 100);
  await nextTick();
  campo.value?.focus();
}

function digitou(e: Event) {
  const el = e.target as HTMLInputElement;
  const c = el.value.slice(-1).toUpperCase();
  el.value = '';
  if (!c || c === ' ' || fase.value !== 'jogando') return;
  if (c === letra.value) {
    errou.value = false;
    pos.value++;
    if (pos.value >= total.value) {
      ms.value = Date.now() - t0;
      parar();
      fase.value = 'fim';
      falar(`Muito bem! Você terminou em ${falaTempo.value}.`);
      emit('feito');
    }
  } else {
    errou.value = true;
    erros.value++;
  }
}

onBeforeUnmount(parar);
</script>

<template>
  <div class="card flex flex-col gap-4">
    <p class="text-[1.05rem]">{{ atividade.instrucao }}</p>

    <div v-if="fase === 'inicio'" class="flex flex-col items-start gap-3">
      <p>Serão {{ total }} letras. O cronômetro começa quando você apertar o botão. Se errar, a letra continua na tela até você acertar.</p>
      <button type="button" class="btn btn-pri btn-g max-sm:w-full" @click="comecar">Começar o jogo <Icone nome="seta" :traco="2.6" /></button>
    </div>

    <template v-else-if="fase === 'jogando'">
      <div class="flex flex-wrap items-center justify-between gap-2 font-bold">
        <span>Letra {{ pos + 1 }} de {{ total }}</span>
        <span class="flex items-center gap-1.5" role="timer" :aria-label="`Tempo: ${falaTempo}`"><Icone nome="relogio" :tamanho="22" /> {{ tempo }} s</span>
        <span>Erros: {{ erros }}</span>
      </div>
      <div
        class="grid min-h-48 place-items-center rounded-2xl border-[3px] bg-superficie text-[7rem] leading-none font-bold sm:text-[9rem]"
        :class="errou ? 'border-sec bg-sec-claro' : 'border-ink'"
        aria-live="polite"
      >{{ letra }}</div>
      <label class="flex flex-col gap-1.5 font-bold">
        <span>Aperte a letra no teclado</span>
        <input ref="campo" type="text" class="entrada min-h-[60px] text-[1.3rem]" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Aperte a letra mostrada na tela" @input="digitou" @blur="campo?.focus()" />
      </label>
      <div role="status" class="retorno" :class="errou ? 'retorno-erro' : 'retorno-neutro'">
        <Icone :nome="errou ? 'alerta' : 'lampada'" :tamanho="28" :traco="2.4" cor="var(--color-pri)" />
        <span v-if="errou"><strong class="block">Quase lá!</strong>Essa não é a letra {{ letra }}. Tente de novo.</span>
        <span v-else>Procure no teclado a letra que aparece na tela.</span>
      </div>
    </template>

    <template v-else>
      <div role="status" class="retorno retorno-ok">
        <Icone nome="ok" :tamanho="30" :traco="2.4" cor="var(--color-pri)" />
        <span><strong class="block">Muito bem!</strong>Você acertou as {{ total }} letras em {{ tempo }} segundos, com {{ erros }} {{ erros === 1 ? 'erro' : 'erros' }}.</span>
      </div>
      <button type="button" class="btn self-start max-sm:w-full" @click="comecar"><Icone nome="repetir" :tamanho="20" :traco="2.4" /> Jogar de novo</button>
    </template>
  </div>
</template>
