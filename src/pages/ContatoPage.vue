<script setup lang="ts">
import Icone from '@/components/Icone.vue';

const WHATSAPP = 'https://wa.me/5511939529261?text=Ol%C3%A1%2C%20Taiane!%20Vim%20pelo%20Teclando%20Juntos.';
const TELEFONE = 'tel:+5511939529261';
</script>

<template>
  <div class="container-tj flex max-w-[900px] flex-col gap-7 pt-2 pb-16">
    <div class="flex flex-col gap-2">
      <span class="sobretitulo text-sec-ink">Institucional</span>
      <h1 class="text-[2.2rem] leading-tight font-bold">Contato</h1>
      <p class="text-[1.1rem]">Tem uma dúvida, sugestão ou precisa de ajuda? Fale com a responsável pelo projeto.</p>
    </div>

    <section class="card flex flex-col gap-3" aria-labelledby="responsavel-t">
      <h2 id="responsavel-t" class="text-[1.4rem] font-bold">Responsável pelo projeto</h2>
      <p class="text-[1.2rem] font-bold">Taiane Nascimento</p>
      <p>Escolha uma das opções abaixo para entrar em contato:</p>
      <div class="flex flex-wrap gap-3 pt-1">
        <a :href="WHATSAPP" target="_blank" rel="noreferrer" class="btn btn-pri btn-g"><Icone nome="mensagem" /> Enviar mensagem pelo WhatsApp</a>
        <a :href="TELEFONE" class="btn btn-g"><Icone nome="telefone" /> Ligar para (11) 93952-9261</a>
      </div>
    </section>


  </div>
</template>
