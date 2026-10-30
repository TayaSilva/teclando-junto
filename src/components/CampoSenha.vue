<script setup lang="ts">
import { ref } from 'vue';

// Campo de senha com botão "Mostrar/Esconder".
defineProps<{ id: string; rotulo: string; autocomplete: 'current-password' | 'new-password'; invalido?: boolean; descricao?: string }>();
const valor = defineModel<string>({ required: true });
const ver = ref(false);
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <slot name="topo"><label :for="id" class="font-bold">{{ rotulo }}</label></slot>
    <div class="flex flex-wrap gap-2.5">
      <input
        :id="id"
        v-model="valor"
        :type="ver ? 'text' : 'password'"
        :autocomplete="autocomplete"
        :aria-invalid="invalido"
        :aria-describedby="descricao"
        class="entrada min-w-0 flex-[1_1_260px]"
      />
      <button type="button" class="btn text-[0.85rem]" :aria-pressed="ver" :aria-controls="id" @click="ver = !ver">
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
        {{ ver ? 'Esconder' : 'Mostrar' }}
      </button>
    </div>
    <slot />
  </div>
</template>
