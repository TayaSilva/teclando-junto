<script setup lang="ts">
// Moldura das telas de acesso: formulário à esquerda, informações à direita.
</script>

<template>
  <div class="mx-auto flex w-full max-w-[1100px] flex-wrap items-start gap-8 px-4 sm:px-6 pt-8 pb-18">
    <section class="card flex min-w-0 flex-[1_1_480px] flex-col gap-5 p-8">
      <slot />
    </section>
    <aside aria-label="Informações" class="flex min-w-0 flex-[1_1_340px] flex-col gap-5">
      <slot name="lado" />
    </aside>
  </div>
</template>
