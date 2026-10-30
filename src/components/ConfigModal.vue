<script setup lang="ts">
import BaseModal from './BaseModal.vue';
import Icone from './Icone.vue';
import { usePreferencias } from '@/composables/usePreferencias';

defineProps<{ aberto: boolean }>();
const emit = defineEmits<{ fechar: [] }>();
const { prefs } = usePreferencias();

const TAMANHOS = [
  { v: 1, r: 'A' },
  { v: 2, r: 'A+' },
  { v: 3, r: 'A++' },
] as const;
const TEMAS = [
  { v: 'claro', r: 'Claro', icone: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>' },
  { v: 'escuro', r: 'Escuro', icone: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>' },
  { v: 'auto', r: 'Igual ao computador', icone: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>' },
] as const;
const VELOCIDADES = [
  { v: 0, r: 'Mais devagar' },
  { v: 1, r: 'Normal' },
  { v: 2, r: 'Mais rápido' },
] as const;
</script>

<template>
  <BaseModal :aberto="aberto" titulo="Configurações" :largura="560" @fechar="emit('fechar')">
    <p class="text-[0.9rem]">Ajuste do jeito que for mais confortável para você. As escolhas ficam guardadas neste computador.</p>

    <div role="group" aria-labelledby="cfg-tam" class="flex flex-col items-start gap-2 border-t-2 border-borda pt-4">
      <span id="cfg-tam" class="font-bold">Tamanho do texto</span>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(t, i) in TAMANHOS"
          :key="t.v"
          type="button"
          class="btn min-w-14"
          :aria-pressed="prefs.tamanho === t.v"
          :style="{ fontSize: `${0.85 + i * 0.12}rem` }"
          @click="prefs.tamanho = t.v"
        >
          {{ t.r }}
        </button>
      </div>
    </div>

    <div role="group" aria-labelledby="cfg-tema" class="flex flex-col items-start gap-2 border-t-2 border-borda pt-4">
      <span id="cfg-tema" class="font-bold">Tema</span>
      <div class="flex flex-wrap gap-2">
        <button v-for="t in TEMAS" :key="t.v" type="button" class="btn text-[0.9rem]" :aria-pressed="prefs.tema === t.v" @click="prefs.tema = t.v">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" v-html="t.icone" />
          {{ t.r }}
        </button>
      </div>
    </div>

    <div role="group" aria-labelledby="cfg-con" class="flex flex-col items-start gap-2 border-t-2 border-borda pt-4">
      <span id="cfg-con" class="font-bold">Contraste</span>
      <button type="button" class="btn" :aria-pressed="prefs.altoContraste" @click="prefs.altoContraste = !prefs.altoContraste">
        Alto contraste: {{ prefs.altoContraste ? 'ligado' : 'desligado' }}
      </button>
    </div>

    <div role="group" aria-labelledby="cfg-nar" class="flex flex-col items-start gap-2 border-t-2 border-borda pt-4">
      <span id="cfg-nar" class="font-bold">Narração</span>
      <button type="button" class="btn" :aria-pressed="prefs.narracao" @click="prefs.narracao = !prefs.narracao">
        <Icone nome="som" /> Narração: {{ prefs.narracao ? 'ligada' : 'desligada' }}
      </button>
      <span class="pt-2 text-[0.9rem] font-bold">Velocidade da voz</span>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="v in VELOCIDADES"
          :key="v.v"
          type="button"
          class="btn text-[0.85rem]"
          :aria-pressed="prefs.velocidade === v.v"
          @click="prefs.velocidade = v.v"
        >
          {{ v.r }}
        </button>
      </div>
    </div>

    <button type="button" class="btn btn-pri btn-g" @click="emit('fechar')">Pronto</button>
  </BaseModal>
</template>
