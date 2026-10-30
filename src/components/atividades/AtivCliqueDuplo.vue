<script setup lang="ts">
import { ref } from 'vue';
import Icone from '@/components/Icone.vue';

defineProps<{ atividade?: unknown }>();
const emit = defineEmits<{ feito: [] }>();

// O intervalo é ajustável: quem tem a mão mais lenta pode aumentar o tempo entre os cliques.
const INTERVALOS = [{ ms: 500, r: 'Rápido' }, { ms: 900, r: 'Normal' }, { ms: 1500, r: 'Bem devagar' }];
const intervalo = ref(900);
const aberta = ref(false);
const msg = ref('Clique duas vezes seguidas na pasta.');
let ultimo = 0;

function abrir(porAlternativa = false) {
  aberta.value = true;
  msg.value = porAlternativa ? 'Pasta aberta pelo botão alternativo. Também vale!' : 'Você abriu a pasta com dois cliques.';
  emit('feito');
}
function clicou() {
  if (aberta.value) return;
  const agora = Date.now();
  if (agora - ultimo <= intervalo.value) { ultimo = 0; abrir(); return; }
  ultimo = agora;
  msg.value = 'Um clique! Agora clique mais uma vez, logo em seguida.';
}
</script>

<template>
  <div class="card flex flex-col gap-4">
    <p class="text-[1.2rem] font-bold sm:text-[1.4rem]">{{ aberta ? 'Você aprendeu a abrir uma pasta com dois cliques.' : 'Abra a pasta “Minhas fotos” com dois cliques.' }}</p>

    <div v-if="!aberta" class="grid place-items-center rounded-xl bg-[#EEF3F5] py-8">
      <button type="button" class="flex flex-col items-center gap-2 rounded-2xl border-4 border-transparent bg-transparent p-4 hover:border-ink" aria-label="Pasta Minhas fotos. Clique duas vezes para abrir." @click="clicou" @dblclick="abrir()">
        <svg viewBox="0 0 160 120" class="h-auto w-[150px] sm:w-[200px]" aria-hidden="true"><path d="M10 28a8 8 0 0 1 8-8h44l14 16h66a8 8 0 0 1 8 8v62a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8z" fill="#F2C230" stroke="#14213D" stroke-width="5" stroke-linejoin="round" /><path d="M10 46h140" stroke="#14213D" stroke-width="5" /></svg>
        <span class="text-[1.3rem] font-bold">Minhas fotos</span>
      </button>
    </div>
    <div v-else class="grid grid-cols-2 gap-3 rounded-xl bg-[#EEF3F5] p-4 sm:grid-cols-4">
      <figure v-for="n in 4" :key="n" class="m-0 grid aspect-[4/3] place-items-center rounded-lg border-2 border-ink bg-white"><Icone nome="imagem" :tamanho="48" :traco="1.8" /></figure>
    </div>

    <div role="status" aria-live="polite" class="retorno" :class="aberta ? 'retorno-ok' : 'retorno-neutro'"><span>{{ msg }}</span></div>

    <div v-if="!aberta" class="flex flex-col gap-3 border-t border-borda-suave pt-3">
      <div role="group" aria-label="Tempo entre os dois cliques" class="flex flex-wrap items-center gap-2">
        <span class="w-full text-[0.95rem] font-bold">Tempo entre os dois cliques</span>
        <button v-for="o in INTERVALOS" :key="o.ms" type="button" class="btn text-[0.9rem] max-sm:flex-1" :aria-pressed="intervalo === o.ms" @click="intervalo = o.ms">{{ o.r }}</button>
      </div>
      <button type="button" class="btn self-start max-sm:w-full" @click="abrir(true)">Prefiro abrir com um botão</button>
    </div>
  </div>
</template>
