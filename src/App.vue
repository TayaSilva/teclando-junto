<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Cabecalho from '@/components/Cabecalho.vue';
import Rodape from '@/components/Rodape.vue';
import '@/composables/usePreferencias';

// A página inicial tem cabeçalho próprio; as demais usam o cabeçalho do aluno.
const route = useRoute();
const naInicial = computed(() => route.name === 'inicio');
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Cabecalho v-if="!naInicial" />
    <main id="conteudo" class="flex-1" tabindex="-1">
      <RouterView />
    </main>
    <Rodape />
  </div>
</template>
