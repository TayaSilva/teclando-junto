<script setup lang="ts">
import Icone from '@/components/Icone.vue';
import { EXTRAS } from '@/data/trilhas';

const PASSOS = [
  { t: 'Conclua as trilhas básicas', d: 'Os extras usam o que você aprendeu nas 8 primeiras trilhas.' },
  { t: 'Informe seu e-mail', d: 'Ele vira o seu acesso, para a compra ficar guardada em qualquer computador.' },
  { t: 'Escolha o que quer aprender', d: 'Um módulo de cada vez ou o pacote com todos.' },
];
</script>

<template>
  <div class="container-tj flex flex-col gap-8 pt-2 pb-16">
    <div class="flex max-w-[780px] flex-col gap-2">
      <span class="selo">Em breve</span>
      <h1 class="text-[2.2rem] leading-tight font-bold">Módulos extras</h1>
      <p class="text-[1.05rem]">Você já sabe usar o computador. Estamos preparando novos conteúdos para ajudar no uso da internet no dia a dia, com confiança.</p>
      <p class="text-[0.95rem]">Os módulos extras ainda não estão disponíveis. As 8 trilhas básicas continuam sem custo.</p>
    </div>

    <section aria-labelledby="passos-t" class="flex flex-col gap-3">
      <h2 id="passos-t" class="text-[1.4rem] font-bold">O que vem por aí</h2>
      <ol class="grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
        <li class="card flex items-start gap-3">
          <span aria-hidden="true" class="grid size-11 shrink-0 place-items-center rounded-[10px] bg-pri font-bold text-pri-txt">1</span>
          <span><strong class="block">Novos conteúdos</strong>Estamos preparando as próximas atividades.</span>
        </li>
        <li class="card flex items-start gap-3">
          <span aria-hidden="true" class="grid size-11 shrink-0 place-items-center rounded-[10px] bg-pri font-bold text-pri-txt">2</span>
          <span><strong class="block">Mais segurança</strong>Os módulos vão ajudar você a resolver tarefas do dia a dia.</span>
        </li>
      </ol>
    </section>

    <section aria-labelledby="mods-t" class="flex flex-col gap-4">
      <h2 id="mods-t" class="text-[1.6rem] font-bold">Escolha seu módulo</h2>
      <ul class="grid list-none gap-5 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr))]">
        <li v-for="e in EXTRAS" :key="e.n" class="card flex flex-col gap-2.5">
          <div class="flex items-center justify-between gap-4">
            <span aria-hidden="true" class="grid size-14 place-items-center rounded-xl bg-pri-suave"><Icone :nome="e.icone" :tamanho="30" :traco="2" cor="var(--color-pri)" /></span>
            <span class="selo">Módulo {{ e.n }} · Em breve</span>
          </div>
          <strong class="text-[1.25rem]">{{ e.titulo }}</strong>
          <span>{{ e.desc }}</span>
          <ul class="flex list-disc flex-col gap-1 pl-5 text-[0.95rem]">
            <li v-for="x in e.itens" :key="x">{{ x }}</li>
          </ul>
          <div class="mt-auto border-t border-borda-suave pt-3"><span class="selo">Disponível em breve</span></div>
        </li>
      </ul>
    </section>

    <section aria-labelledby="pacote-t" class="card-destaque flex flex-wrap items-center gap-x-8 gap-y-5">
      <div class="flex min-w-0 flex-[1_1_420px] flex-col gap-1.5">
        <p class="sobretitulo">Pacote completo</p>
        <h2 id="pacote-t" class="text-[1.6rem] leading-tight font-bold">Os 6 módulos extras de uma vez</h2>
      <p>Redes sociais, notícias falsas, banco e Pix, serviços públicos, saúde e compras, em breve.</p>
      </div>
      <div class="flex flex-col items-start gap-2.5">
        <span class="flex flex-col">
          <span class="text-[0.95rem]">Pacote completo</span>
          <strong class="text-[1.6rem] leading-tight">Em breve</strong>
        </span>
        <span class="selo">Disponível em breve</span>
      </div>
    </section>

  </div>
</template>
