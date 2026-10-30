<script setup lang="ts">
import { computed, ref } from 'vue';
import Icone from '@/components/Icone.vue';

defineProps<{ atividade?: unknown }>();
const emit = defineEmits<{ feito: [] }>();

const SUGESTAO = 'Olá! Como você está? Espero que seu dia seja muito bom.';
const texto = ref('');
const enviada = ref<string | null>(null);
const podeEnviar = computed(() => texto.value.trim().length > 0);

// O envio acontece só aqui dentro: nada sai do site.
function enviar() {
  if (!podeEnviar.value) return;
  enviada.value = texto.value.trim();
  emit('feito');
}
</script>

<template>
  <div class="card flex flex-col gap-4">
    <p class="text-[1.2rem] font-bold sm:text-[1.4rem]">Escreva uma mensagem carinhosa para uma pessoa especial.</p>
    <p class="text-[0.95rem]">Você pode copiar a sugestão ou escrever a sua. A mensagem não será enviada de verdade: é só um treino.</p>
    <p class="modelo">{{ SUGESTAO }}</p>
    <button type="button" class="btn self-start max-sm:w-full" @click="texto = SUGESTAO"><Icone nome="copiar" /> Usar a sugestão</button>

    <div class="flex max-w-[560px] flex-col gap-3 rounded-2xl bg-[#EEF3F5] p-4" aria-label="Conversa de treino">
      <p class="m-0 self-start rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-[1.05rem] shadow-sm">Oi! Que bom ver você por aqui. 🙂</p>
      <p v-if="enviada" class="m-0 self-end rounded-2xl rounded-br-sm bg-pri px-4 py-2.5 text-[1.05rem] text-pri-txt">{{ enviada }}</p>
      <div class="flex flex-wrap items-end gap-2">
        <label class="flex min-w-0 flex-[1_1_220px] flex-col gap-1 font-bold">
          Sua mensagem
          <textarea v-model="texto" rows="2" class="entrada text-[1.1rem]" :readonly="!!enviada" />
        </label>
        <button type="button" class="btn btn-pri max-sm:w-full" :disabled="!podeEnviar || !!enviada" @click="enviar">Enviar</button>
      </div>
    </div>

    <div role="status" aria-live="polite" class="retorno" :class="enviada ? 'retorno-ok' : 'retorno-neutro'">
      <span>{{ enviada ? 'Mensagem enviada dentro do treino. Parabéns, você escreveu uma mensagem!' : 'Quando terminar de escrever, clique em Enviar.' }}</span>
    </div>
  </div>
</template>
