<script setup lang="ts">
import { computed, ref } from 'vue';
import Icone from '@/components/Icone.vue';
import PassosLista from './PassosLista.vue';

// Videochamada de treino com a personagem Ana. Não pede acesso à câmera nem ao microfone reais.
defineProps<{ atividade?: unknown }>();
const emit = defineEmits<{ feito: [] }>();

const PASSOS = ['Aceitar a chamada.', 'Ativar o microfone.', 'Desativar o microfone.', 'Ativar a câmera.', 'Encerrar a chamada.'];
const passo = ref(0);
const msg = ref('');
const erro = ref(false);
const fim = computed(() => passo.value >= PASSOS.length);
const noAr = computed(() => passo.value >= 1 && !fim.value);
const mic = ref(false);
const cam = ref(false);

function ok(m: string) { erro.value = false; msg.value = m; passo.value++; if (fim.value) { msg.value = 'Muito bem! Você participou de uma videochamada de treino.'; emit('feito'); } }
function ops(m: string) { erro.value = true; msg.value = m; }

function aceitar() { if (passo.value === 0) ok('Chamada aceita! A Ana apareceu. Agora ative o microfone.'); }
function microfone() {
  if (passo.value === 1) { mic.value = true; ok('Microfone ligado: a Ana consegue ouvir você. Agora desative-o.'); }
  else if (passo.value === 2) { mic.value = false; ok('Microfone desligado. Agora ative a câmera.'); }
  else ops('Siga o passo em destaque.');
}
function camera() { if (passo.value === 3) { cam.value = true; ok('Câmera ligada (de mentirinha). Para terminar, encerre a chamada.'); } else ops('Siga o passo em destaque.'); }
function encerrar() { if (passo.value === 4) ok('Chamada encerrada.'); else ops('Siga o passo em destaque.'); }
</script>

<template>
  <div class="card flex flex-col gap-4">
    <PassosLista :passos="PASSOS" :atual="passo" />

    <div class="mx-auto flex w-full max-w-[640px] flex-col gap-3 rounded-xl border-4 border-ink bg-[#0b0f17] p-3">
      <div v-if="passo === 0" class="grid min-h-[240px] place-items-center rounded-lg bg-[#17223a] p-4 text-center text-white">
        <div class="flex flex-col items-center gap-3"><span class="text-[3rem]" aria-hidden="true">📞</span><strong class="text-[1.2rem]">Ana está chamando você</strong>
          <button type="button" class="btn btn-pri btn-g" @click="aceitar">Aceitar a chamada</button></div>
      </div>
      <div v-else-if="noAr" class="relative grid min-h-[240px] place-items-center rounded-lg bg-[#2b2449] p-4 text-white">
        <div class="flex flex-col items-center gap-1"><span class="text-[4rem]" aria-hidden="true">👩</span><strong>Ana</strong></div>
        <div class="absolute right-2 bottom-2 grid h-20 w-28 place-items-center rounded-lg border-2 border-white text-center text-[0.8rem]" :class="cam ? 'bg-[#3b78b8]' : 'bg-black'">{{ cam ? '🙂 Você' : 'Câmera desligada' }}</div>
      </div>
      <div v-else class="grid min-h-[240px] place-items-center rounded-lg bg-[#17223a] p-4 text-center text-white"><strong class="text-[1.2rem]">A chamada terminou.</strong></div>

      <div v-if="noAr" class="flex flex-wrap justify-center gap-2.5" role="group" aria-label="Controles da chamada">
        <button type="button" class="btn max-sm:flex-1" :aria-pressed="mic" @click="microfone"><Icone nome="som" /> Microfone: {{ mic ? 'ligado' : 'desligado' }}</button>
        <button type="button" class="btn max-sm:flex-1" :aria-pressed="cam" @click="camera"><Icone nome="imagem" /> Câmera: {{ cam ? 'ligada' : 'desligada' }}</button>
        <button type="button" class="btn max-sm:flex-1 !border-[#C0392B] !bg-[#C0392B] !text-white" @click="encerrar">Encerrar chamada</button>
      </div>
    </div>

    <div role="status" aria-live="polite" class="retorno" :class="fim ? 'retorno-ok' : erro ? 'retorno-erro' : 'retorno-neutro'">
      <Icone :nome="fim ? 'ok' : erro ? 'alerta' : 'lampada'" :tamanho="28" :traco="2.4" :cor="fim ? 'var(--color-pri)' : 'var(--color-sec-ink)'" />
      <span>{{ msg || 'Clique em “Aceitar a chamada”. É só um treino: nada é gravado e a câmera real não é usada.' }}</span>
    </div>
  </div>
</template>
