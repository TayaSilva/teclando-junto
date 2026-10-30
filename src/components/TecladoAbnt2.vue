<script setup lang="ts">
import { computed } from 'vue';

// Teclado brasileiro (ABNT2) ilustrado. Só visual: destaca a próxima tecla e
// a última tecla apertada. A mesma informação aparece em texto (legenda).
const props = withDefaults(defineProps<{ destaques?: string[]; ultima?: string | null; legenda?: string }>(), {
  destaques: () => [],
  ultima: null,
  legenda: '',
});

type T = [id: string, rotulo: string, largura: number];
const um = (s: string): T[] => s.split('').map((c) => [c, c, 1]);

const LINHAS: T[][] = [
  [['Esc', 'Esc', 1.3], ...um('1234567890'), ['-', '-', 1], ['=', '=', 1], ['Backspace', 'Backspace', 2.2]],
  [['Tab', 'Tab', 1.6], ...um('QWERTYUIOP'), ['´', '´', 1], ['[', '[', 1]],
  [['CapsLock', 'Caps Lock', 1.9], ...um('ASDFGHJKL'), ['Ç', 'Ç', 1], ['~', '~', 1], [']', ']', 1], ['Enter', 'Enter', 1.6]],
  [['Shift', 'Shift', 1.4], ['\\', '\\', 1], ...um('ZXCVBNM'), [',', ',', 1], ['.', '.', 1], [';', ';', 1], ['/', '/', 1], ['Shift', 'Shift', 2]],
  [['Ctrl', 'Ctrl', 1.6], ['Espaço', 'espaço', 7], ['Ctrl', 'Ctrl', 1.6]],
];
const NAV: T[] = [['Home', 'Home', 1.3], ['End', 'End', 1.3], ['Delete', 'Delete', 1.3]];
const SETAS: T[][] = [
  [['', '', 1], ['↑', '↑', 1], ['', '', 1]],
  [['←', '←', 1], ['↓', '↓', 1], ['→', '→', 1]],
];

const largura = (w: number) => `${Math.round(w * 42 + (w - 1) * 6)}px`;
function classes([id, rotulo]: T) {
  return [
    'grid h-11 shrink-0 place-items-center rounded-lg border-2 border-b-[5px] border-ink font-bold',
    rotulo.length > 2 ? 'text-[12px]' : 'text-[17px]',
    id === '' ? 'invisible' : '',
    props.ultima && props.ultima === id
      ? 'bg-pri text-pri-txt'
      : props.destaques.includes(id)
        ? 'bg-sec-tecla text-[#14213D]'
        : 'bg-superficie text-ink',
  ];
}
const rotuloAcess = computed(() => 'Teclado brasileiro.' + (props.destaques.length ? ` Teclas em destaque: ${props.destaques.join(', ')}.` : ''));
</script>

<template>
  <section aria-label="Teclado" class="flex flex-col gap-2.5">
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.9rem]">
      <strong>{{ legenda }}</strong>
      <span class="inline-flex items-center gap-1.5"><span aria-hidden="true" class="inline-block size-[18px] rounded border-2 border-ink bg-sec-tecla" />tecla para apertar</span>
      <span class="inline-flex items-center gap-1.5"><span aria-hidden="true" class="inline-block size-[18px] rounded border-2 border-ink bg-pri" />última tecla apertada</span>
    </div>
    <div class="overflow-x-auto rounded-[14px] border-2 border-borda bg-pri-claro p-3.5">
      <div role="img" :aria-label="rotuloAcess" class="flex w-max gap-5">
        <div class="flex flex-col gap-1.5">
          <div v-for="(linha, i) in LINHAS" :key="i" class="flex gap-1.5">
            <span v-for="(t, j) in linha" :key="j" :class="classes(t)" :style="{ width: largura(t[2]) }">{{ t[1] }}</span>
          </div>
        </div>
        <div class="flex flex-col justify-between">
          <div class="flex gap-1.5">
            <span v-for="(t, j) in NAV" :key="j" :class="classes(t)" :style="{ width: largura(t[2]) }">{{ t[1] }}</span>
          </div>
          <div class="flex flex-col gap-1.5">
            <div v-for="(linha, i) in SETAS" :key="i" class="flex gap-1.5">
              <span v-for="(t, j) in linha" :key="j" :class="classes(t)" :style="{ width: largura(t[2]) }">{{ t[1] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
