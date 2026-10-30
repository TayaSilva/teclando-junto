<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

defineProps<{ atividade?: unknown }>();
const emit = defineEmits<{ feito: [] }>();

const OBJETOS = [{ id: 'maca', nome: 'maçã', e: '🍎' }, { id: 'livro', nome: 'livro', e: '📖' }, { id: 'bola', nome: 'bola', e: '⚽' }];
const guardados = reactive<Record<string, boolean>>({});
const selecionado = ref<string | null>(null); // alternativa sem arrastar: escolher o objeto e depois a caixa
const arrasto = reactive({ id: '', x: 0, y: 0, ox: 0, oy: 0 });
const msg = ref('Arraste cada objeto até a caixa que combina. Se preferir, toque no objeto e depois na caixa.');
const fim = computed(() => OBJETOS.every((o) => guardados[o.id]));

function colocar(objeto: string, caixa: string) {
  const o = OBJETOS.find((x) => x.id === objeto)!;
  if (objeto === caixa) {
    guardados[objeto] = true;
    msg.value = `Muito bem! Objeto guardado na caixa certa: ${o.nome}.`;
    if (fim.value) emit('feito');
  } else {
    msg.value = `Essa caixa não combina com o objeto “${o.nome}”. Tente outra.`;
  }
  selecionado.value = null;
}

function descer(e: PointerEvent, id: string) {
  if (guardados[id]) return;
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  Object.assign(arrasto, { id, x: e.clientX, y: e.clientY, ox: 0, oy: 0 });
}
function mover(e: PointerEvent) {
  if (!arrasto.id) return;
  arrasto.ox = e.clientX - arrasto.x;
  arrasto.oy = e.clientY - arrasto.y;
}
function soltar(e: PointerEvent) {
  if (!arrasto.id) return;
  const id = arrasto.id;
  const moveu = Math.abs(arrasto.ox) + Math.abs(arrasto.oy) > 12;
  arrasto.id = '';
  arrasto.ox = arrasto.oy = 0;
  if (!moveu) { selecionado.value = selecionado.value === id ? null : id; return; }
  const alvo = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>('[data-caixa]');
  if (alvo) colocar(id, alvo.dataset.caixa!);
  else msg.value = 'Solte o objeto em cima de uma das caixas.';
}
</script>

<template>
  <div class="card flex flex-col gap-4">
    <p class="text-[1.2rem] font-bold sm:text-[1.4rem]">{{ fim ? 'Muito bem! Você já consegue movimentar objetos na tela.' : 'Leve cada objeto até a caixa que combina com ele.' }}</p>

    <div class="flex flex-wrap justify-center gap-4 rounded-xl bg-[#EEF3F5] p-4" role="group" aria-label="Objetos para arrastar">
      <button
        v-for="o in OBJETOS"
        :key="o.id"
        type="button"
        class="grid size-[88px] touch-none place-items-center rounded-2xl border-4 bg-white text-[3rem] select-none sm:size-[104px]"
        :class="[guardados[o.id] ? 'invisible' : '', selecionado === o.id ? 'border-pri ring-4 ring-pri' : 'border-ink', arrasto.id === o.id ? 'relative z-20 cursor-grabbing' : 'cursor-grab']"
        :style="arrasto.id === o.id ? { transform: `translate(${arrasto.ox}px, ${arrasto.oy}px)` } : undefined"
        :aria-label="`Objeto: ${o.nome}${selecionado === o.id ? ' (escolhido)' : ''}`"
        :aria-pressed="selecionado === o.id"
        @pointerdown="descer($event, o.id)"
        @pointermove="mover"
        @pointerup="soltar"
        @pointercancel="arrasto.id = ''"
        @keydown.enter.prevent="selecionado = selecionado === o.id ? null : o.id"
        @keydown.space.prevent="selecionado = selecionado === o.id ? null : o.id"
      >{{ o.e }}</button>
    </div>

    <div class="grid grid-cols-3 gap-3" role="group" aria-label="Caixas">
      <button
        v-for="o in OBJETOS"
        :key="o.id"
        type="button"
        :data-caixa="o.id"
        class="flex min-h-[120px] flex-col items-center justify-center gap-1 rounded-2xl border-4 border-dashed p-2"
        :class="guardados[o.id] ? 'border-solid border-pri bg-pri-suave' : selecionado ? 'border-pri bg-pri-claro' : 'border-tracejado bg-superficie'"
        :aria-label="`Caixa da ${o.nome}${guardados[o.id] ? ' (já guardado)' : ''}`"
        @click="selecionado && colocar(selecionado, o.id)"
      >
        <span class="text-[2.2rem] sm:text-[2.6rem]" :class="guardados[o.id] ? '' : 'opacity-40'">{{ o.e }}</span>
        <span class="text-[0.9rem] font-bold">{{ guardados[o.id] ? 'Guardado' : `Caixa: ${o.nome}` }}</span>
      </button>
    </div>

    <div role="status" aria-live="polite" class="retorno" :class="fim ? 'retorno-ok' : 'retorno-neutro'"><span>{{ msg }}</span></div>
  </div>
</template>
