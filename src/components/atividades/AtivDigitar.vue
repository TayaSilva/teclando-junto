<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import Icone from '@/components/Icone.vue';
import { usePreferencias } from '@/composables/usePreferencias';
import { dicaAcento, explica, norm } from '@/lib/texto';
import type { Atividade } from '@/data/cursos/tipos';

const props = defineProps<{ atividade: Extract<Atividade, { k: 'digitar' }> }>();
const emit = defineEmits<{ feito: [] }>();
const { falar } = usePreferencias();

const i = ref(0);
const item = computed(() => props.atividade.itens[i.value]);
const texto = ref(props.atividade.itens[0].ini ?? '');
const dica = ref(false);
const campo = ref<HTMLInputElement | null>(null);
const opc = computed(() => ({ ci: !!props.atividade.ignorarCaixa, sa: false }));

const ok = computed(() => norm(texto.value, opc.value, true) === norm(item.value.r, opc.value, true));
const ultimo = computed(() => i.value === props.atividade.itens.length - 1);
const ajuda = computed(() => {
  if (!texto.value) return 'Clique no campo e comece a digitar.';
  const acento = [...item.value.r].map(dicaAcento).find(Boolean);
  return `${explica(item.value.r, texto.value, opc.value)}${acento ? ` ${acento}` : ''}`;
});

function digitou() {
  if (ok.value) {
    falar('Muito bem!');
    if (ultimo.value) emit('feito');
  }
}
async function proxima() {
  i.value++;
  texto.value = item.value.ini ?? '';
  dica.value = false;
  await nextTick();
  campo.value?.focus();
}
</script>

<template>
  <div class="card flex flex-col gap-4">
    <p class="text-[1.05rem]">{{ atividade.instrucao }}</p>
    <p class="text-[0.9rem] font-bold">{{ i + 1 }} de {{ atividade.itens.length }}</p>
    <p v-if="!item.ini || item.mostra" class="modelo grande !text-[1.5rem] sm:!text-[2.2rem]">{{ item.mostra ?? item.r }}</p>
    <label class="flex flex-col gap-1.5 font-bold">
      {{ item.ini ? 'Corrija a palavra aqui:' : 'Escreva aqui:' }}
      <input
        ref="campo"
        v-model="texto"
        type="text"
        class="entrada text-[1.3rem]"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        :readonly="ok"
        @input="digitou"
      />
    </label>

    <div role="status" aria-live="polite" class="retorno" :class="ok ? 'retorno-ok' : 'retorno-neutro'">
      <Icone :nome="ok ? 'ok' : 'lampada'" :tamanho="28" :traco="2.4" cor="var(--color-pri)" />
      <span v-if="ok"><strong class="block">Muito bem!</strong>Está certo.</span>
      <span v-else-if="dica">{{ ajuda }}</span>
      <span v-else>Sem pressa. Se precisar, peça uma dica.</span>
    </div>

    <div class="flex flex-wrap gap-2.5">
      <button v-if="!ok" type="button" class="btn max-sm:w-full" @click="dica = !dica"><Icone nome="lampada" /> {{ dica ? 'Esconder a dica' : 'Mostrar uma dica' }}</button>
      <button v-if="ok && !ultimo" type="button" class="btn btn-pri max-sm:w-full" @click="proxima">Próximo <Icone nome="seta" :tamanho="20" :traco="2.6" /></button>
    </div>
  </div>
</template>
