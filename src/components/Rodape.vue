<script setup lang="ts">
import Simbolo from './Simbolo.vue';
</script>

<template>
  <footer class="bg-marinho text-white">
    <div class="container-tj flex flex-wrap items-start justify-between gap-x-12 gap-y-6 py-12">
      <div class="flex flex-col gap-2">
        <span class="flex items-center gap-3">
          <Simbolo variante="escura" fundo="#14213D" :largura="66" />
          <span class="text-[1.2rem] font-bold">Teclando <span class="text-[#A8DCE3]">Juntos</span></span>
        </span>
        <span class="text-[0.85rem] text-[#D3DAE3]">© {{ new Date().getFullYear() }} TJ Teclando Juntos</span>
      </div>
      <nav aria-label="Institucional" class="flex flex-wrap gap-x-7 gap-y-2 font-bold">
        <a href="#sobre" class="py-2.5 text-white">Sobre o projeto</a>
        <a href="#privacidade" class="py-2.5 text-white">Privacidade</a>
        <a href="#termos" class="py-2.5 text-white">Termos de uso</a>
        <RouterLink to="/ajuda" class="py-2.5 text-white">Ajuda</RouterLink>
        <a href="#contato" class="py-2.5 text-white">Contato</a>
      </nav>
    </div>
  </footer>
</template>
