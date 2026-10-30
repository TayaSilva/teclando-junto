<script setup lang="ts">
import { ref } from 'vue';
import Icone from '@/components/Icone.vue';
import CompraModal from '@/components/CompraModal.vue';
import { EXTRAS, PRECO_MODULO, PRECO_PACOTE, reais } from '@/data/trilhas';

const aberto = ref(false);
const tipo = ref<'um' | 'todos'>('um');
const modulo = ref(0);

function abrir(t: 'um' | 'todos', i = 0) {
  tipo.value = t;
  modulo.value = i;
  aberto.value = true;
}

const PASSOS = [
  { t: 'Conclua as trilhas básicas', d: 'Os extras usam o que você aprendeu nas 8 primeiras trilhas.' },
  { t: 'Informe seu e-mail', d: 'Ele vira o seu acesso, para a compra ficar guardada em qualquer computador.' },
  { t: 'Escolha o que quer aprender', d: 'Um módulo de cada vez ou o pacote com todos.' },
];
</script>

<template>
  <div class="container-tj flex flex-col gap-8 pt-2 pb-16">
    <div class="flex max-w-[780px] flex-col gap-2">
      <span class="selo">Depois das 8 trilhas básicas</span>
      <h1 class="text-[2.2rem] leading-tight font-bold">Módulos extras</h1>
      <p class="text-[1.05rem]">Você já sabe usar o computador. Agora é hora de usar a internet no dia a dia, com confiança: falar com a família, resolver coisas do banco e do governo e não cair em notícia falsa.</p>
      <p class="text-[0.95rem]">As 8 trilhas básicas continuam sem custo. Cada módulo extra custa {{ reais(PRECO_MODULO) }}, e o pacote com todos sai por {{ reais(PRECO_PACOTE) }}.</p>
    </div>

    <section aria-labelledby="passos-t" class="flex flex-col gap-3">
      <h2 id="passos-t" class="text-[1.4rem] font-bold">Como funciona</h2>
      <ol class="grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
        <li v-for="(p, i) in PASSOS" :key="p.t" class="card flex items-start gap-3">
          <span aria-hidden="true" class="grid size-11 shrink-0 place-items-center rounded-[10px] bg-pri font-bold text-pri-txt">{{ i + 1 }}</span>
          <span><strong class="block">{{ p.t }}</strong>{{ p.d }}</span>
        </li>
      </ol>
    </section>

    <section aria-labelledby="mods-t" class="flex flex-col gap-4">
      <h2 id="mods-t" class="text-[1.6rem] font-bold">Escolha seu módulo</h2>
      <ul class="grid list-none gap-5 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr))]">
        <li v-for="(e, i) in EXTRAS" :key="e.n" class="card flex flex-col gap-2.5">
          <div class="flex items-center justify-between gap-4">
            <span aria-hidden="true" class="grid size-14 place-items-center rounded-xl bg-pri-suave"><Icone :nome="e.icone" :tamanho="30" :traco="2" cor="var(--color-pri)" /></span>
            <span class="selo">Módulo {{ e.n }} · Extra</span>
          </div>
          <strong class="text-[1.25rem]">{{ e.titulo }}</strong>
          <span>{{ e.desc }}</span>
          <ul class="flex list-disc flex-col gap-1 pl-5 text-[0.95rem]">
            <li v-for="x in e.itens" :key="x">{{ x }}</li>
          </ul>
          <div class="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-borda-suave pt-3">
            <strong class="text-[1.2rem]">{{ reais(PRECO_MODULO) }}</strong>
            <button type="button" class="btn" @click="abrir('um', i)">Quero este módulo<span class="sr-only">: {{ e.titulo }}</span></button>
          </div>
        </li>
      </ul>
    </section>

    <section aria-labelledby="pacote-t" class="card-destaque flex flex-wrap items-center gap-x-8 gap-y-5">
      <div class="flex min-w-0 flex-[1_1_420px] flex-col gap-1.5">
        <p class="sobretitulo">Pacote completo</p>
        <h2 id="pacote-t" class="text-[1.6rem] leading-tight font-bold">Os 6 módulos extras de uma vez</h2>
        <p>Redes sociais, notícias falsas, banco e Pix, serviços públicos, saúde e compras.</p>
      </div>
      <div class="flex flex-col items-start gap-2.5">
        <span class="flex flex-col">
          <span class="text-[0.95rem]">De <s>{{ reais(PRECO_MODULO * EXTRAS.length) }}</s> por</span>
          <strong class="text-[1.6rem] leading-tight">{{ reais(PRECO_PACOTE) }}</strong>
        </span>
        <button type="button" class="btn btn-pri btn-g" @click="abrir('todos')">Quero o pacote completo <Icone nome="seta" :traco="2.6" /></button>
      </div>
    </section>

    <CompraModal :aberto="aberto" :tipo-inicial="tipo" :modulo-inicial="modulo" @fechar="aberto = false" />
  </div>
</template>
