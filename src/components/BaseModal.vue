<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import Icone from './Icone.vue';

// Janela acessível: foco vai para dentro ao abrir, Esc fecha, Tab fica preso
// dentro da janela e o foco volta para onde estava ao fechar.
// Não fecha ao clicar fora, para evitar fechamentos sem querer.
const props = withDefaults(defineProps<{ aberto: boolean; titulo: string; sobretitulo?: string; largura?: number }>(), { largura: 640 });
const emit = defineEmits<{ fechar: [] }>();

const caixa = ref<HTMLElement | null>(null);
let anterior: HTMLElement | null = null;
const SELETOR = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

watch(
  () => props.aberto,
  async (aberto) => {
    if (aberto) {
      anterior = document.activeElement as HTMLElement | null;
      await nextTick();
      const alvo = caixa.value?.querySelector<HTMLElement>('[data-foco-inicial]') ?? caixa.value?.querySelector<HTMLElement>(SELETOR);
      alvo?.focus();
    } else {
      anterior?.focus?.();
    }
  },
);

function teclado(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.stopPropagation();
    emit('fechar');
    return;
  }
  if (e.key !== 'Tab' || !caixa.value) return;
  const focaveis = caixa.value.querySelectorAll<HTMLElement>(SELETOR);
  if (!focaveis.length) return;
  const primeiro = focaveis[0];
  const ultimo = focaveis[focaveis.length - 1];
  if (e.shiftKey && document.activeElement === primeiro) {
    e.preventDefault();
    ultimo.focus();
  } else if (!e.shiftKey && document.activeElement === ultimo) {
    e.preventDefault();
    primeiro.focus();
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="aberto" class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-marinho/60 px-4 py-[6vh]">
      <div
        ref="caixa"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        class="flex w-full flex-col gap-4 rounded-[18px] border-[3px] border-ink bg-superficie p-6 text-ink shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
        :style="{ maxWidth: `${largura}px` }"
        @keydown="teclado"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex flex-col">
            <span v-if="sobretitulo" class="text-[0.85rem] font-bold text-sec-ink">{{ sobretitulo }}</span>
            <h2 id="modal-titulo" class="text-[1.5rem] leading-tight font-bold">{{ titulo }}</h2>
          </div>
          <button type="button" class="btn btn-icone" aria-label="Fechar" @click="emit('fechar')">
            <Icone nome="fechar" :tamanho="24" :traco="2.6" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
