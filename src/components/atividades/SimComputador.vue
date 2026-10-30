<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';
import Icone from '@/components/Icone.vue';

defineProps<{ atividade?: unknown }>();
const emit = defineEmits<{ feito: [] }>();

type Estado = 'desligado' | 'iniciando' | 'pronto' | 'menu' | 'energia' | 'fim';
const estado = ref<Estado>('desligado');
let t: number | undefined;

const PASSOS = ['Clicar no botão de ligar.', 'Esperar a tela inicial aparecer.', 'Abrir o menu Iniciar.', 'Selecionar Desligar.'];
const passo = computed(() => ({ desligado: 0, iniciando: 1, pronto: 2, menu: 3, energia: 3, fim: 4 })[estado.value]);

function ligar() {
  estado.value = 'iniciando';
  t = window.setTimeout(() => (estado.value = 'pronto'), 2500); // só uma animação; não vale nota
}
function desligar() {
  estado.value = 'fim';
  emit('feito');
}
function reiniciar() { clearTimeout(t); estado.value = 'desligado'; }
onBeforeUnmount(() => clearTimeout(t));
</script>

<template>
  <div class="card flex flex-col gap-4">
    <p class="text-[1.2rem] font-bold sm:text-[1.4rem]">Vamos ligar e desligar um computador de treino.</p>
    <ol class="m-0 flex list-none flex-col gap-1.5 p-0">
      <li v-for="(p, i) in PASSOS" :key="p" class="flex items-center gap-2 rounded-lg px-3 py-2" :class="i < passo ? 'bg-pri-suave' : i === passo ? 'border-2 border-pri font-bold' : 'opacity-70'">
        <Icone v-if="i < passo" nome="ok" :tamanho="22" :traco="2.6" cor="var(--color-pri)" /><span v-else class="w-[22px] text-center">{{ i + 1 }}</span> {{ p }}
      </li>
    </ol>

    <div class="mx-auto flex w-full max-w-[640px] flex-col items-center gap-2">
      <!-- tela -->
      <div class="relative aspect-[16/10] w-full overflow-hidden rounded-xl border-[6px] border-ink" :class="estado === 'desligado' || estado === 'fim' ? 'bg-[#0b0f17]' : 'bg-[#3b78b8]'">
        <p v-if="estado === 'fim'" class="absolute inset-0 grid place-items-center p-4 text-center text-[1rem] font-bold text-white">Computador desligado.</p>
        <div v-if="estado === 'iniciando'" class="absolute inset-0 grid place-items-center bg-[#0b0f17] text-white" role="status">
          <div class="flex flex-col items-center gap-3"><span class="size-12 animate-spin rounded-full border-4 border-white/30 border-t-white" /><span class="font-bold">Iniciando... espere um pouquinho</span></div>
        </div>
        <template v-if="estado === 'pronto' || estado === 'menu' || estado === 'energia'">
          <div class="absolute top-3 left-3 flex flex-col items-center gap-0.5 text-[0.75rem] font-bold text-white"><Icone nome="documento" :tamanho="30" cor="#fff" /> Meus arquivos</div>
          <div v-if="estado === 'menu' || estado === 'energia'" class="absolute bottom-10 left-1 flex w-[46%] min-w-[150px] flex-col gap-1 rounded-lg bg-white p-2 shadow-lg">
            <span class="px-2 text-[0.8rem] font-bold">Menu Iniciar</span>
            <button v-if="estado === 'menu'" type="button" class="btn justify-start text-[0.9rem]" @click="estado = 'energia'"><Icone nome="cadeado" :tamanho="20" /> Energia</button>
            <template v-else>
              <button type="button" class="btn btn-pri justify-start text-[0.9rem]" @click="desligar">Desligar</button>
              <button type="button" class="btn justify-start text-[0.9rem]" @click="estado = 'menu'">Voltar</button>
            </template>
          </div>
          <div class="absolute inset-x-0 bottom-0 flex h-9 items-center gap-2 bg-[#14213D] px-2">
            <button type="button" class="grid size-7 place-items-center rounded bg-white p-0 font-bold" aria-label="Menu Iniciar" @click="estado = estado === 'pronto' ? 'menu' : 'pronto'">⊞</button>
          </div>
        </template>
      </div>
      <div class="h-3 w-24 bg-ink" /><div class="h-2 w-40 rounded bg-ink" />

      <!-- botão de ligar -->
      <button type="button" class="btn mt-2 max-sm:w-full" :class="estado === 'desligado' ? 'btn-pri' : ''" :disabled="estado !== 'desligado'" aria-label="Botão de ligar o computador" @click="ligar">
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 3v8M6.4 6.5a8 8 0 1 0 11.2 0" /></svg>
        Botão de ligar
      </button>
    </div>

    <div role="status" aria-live="polite" class="retorno" :class="estado === 'fim' ? 'retorno-ok' : 'retorno-neutro'">
      <span>{{ estado === 'desligado' ? 'Clique no botão de ligar, embaixo da tela.' : estado === 'iniciando' ? 'Isso é normal. Espere até aparecer a tela inicial.' : estado === 'pronto' ? 'A área de trabalho apareceu. Agora clique no botão do menu Iniciar, no canto de baixo da tela.' : estado === 'menu' ? 'Escolha Energia.' : estado === 'energia' ? 'Agora clique em Desligar.' : 'Muito bem! Você concluiu seu primeiro curso de informática!' }}</span>
    </div>
    <button v-if="estado === 'fim'" type="button" class="btn self-start max-sm:w-full" @click="reiniciar"><Icone nome="repetir" :tamanho="20" :traco="2.4" /> Treinar de novo</button>
  </div>
</template>
