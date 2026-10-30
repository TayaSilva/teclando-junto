<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="mx-auto flex w-full max-w-[720px] flex-col items-start gap-4 px-4 sm:px-6 py-16">
    <h1 class="text-[2.2rem] leading-tight font-bold">Não encontramos esta página</h1>
    <p class="text-[1.05rem]">Pode ser que o endereço tenha mudado. Não se preocupe, nada foi perdido.</p>
    <RouterLink to="/painel" class="btn btn-pri btn-g">Voltar ao início</RouterLink>
  </div>
</template>
