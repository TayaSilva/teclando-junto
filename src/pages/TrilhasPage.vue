<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ListaTrilhas from '@/components/ListaTrilhas.vue';
</script>

<template>
  <div class="container-tj flex flex-col gap-6 pt-2 pb-16">
    <div class="flex max-w-[760px] flex-col gap-1">
      <h1 class="text-[2.2rem] leading-tight font-bold">Minhas trilhas</h1>
      <p class="text-[1.05rem]">As 8 trilhas básicas são sem custo. Faça na ordem que preferir e repita quantas vezes quiser.</p>
    </div>
    <ListaTrilhas />
    <p>Quer ir além? Conheça os <RouterLink to="/extras">módulos extras</RouterLink>.</p>
  </div>
</template>
