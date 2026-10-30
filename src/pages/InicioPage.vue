<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Icone from '@/components/Icone.vue';
import Simbolo from '@/components/Simbolo.vue';
import ConfigModal from '@/components/ConfigModal.vue';
import { TRILHAS, EXTRAS } from '@/data/trilhas';
import { usePreferencias } from '@/composables/usePreferencias';
import { useConta } from '@/composables/useConta';

const { prefs, temaEscuro } = usePreferencias();
const { conta } = useConta();
const config = ref(false);

const PASSOS = [
  { t: 'Apresentação', d: 'Explicação curta, com imagem e narração.' },
  { t: 'Demonstração', d: 'Você vê a ação acontecendo antes de tentar.' },
  { t: 'Prática', d: 'Com o teclado e o mouse de verdade.' },
  { t: 'Retorno', d: 'Você sabe na hora se acertou e como ajustar.' },
  { t: 'Conclusão', d: 'Seu progresso fica salvo e você escolhe seguir.' },
];
const BENEFICIOS = [
  { i: 'som', t: 'Ouça ou leia tudo', d: 'Narração em português, com volume e velocidade ajustáveis.' },
  { i: 'relogio', t: 'No seu tempo', d: 'Tentativas sem limite. Pause e volte quando quiser.' },
  { i: 'escudo', t: 'Treino seguro', d: 'As simulações acontecem aqui dentro e não mexem nos arquivos do seu computador.' },
];
</script>

<template>
  <header class="border-b-2 border-borda bg-superficie">
    <a class="pular" href="#conteudo">Pular para o conteúdo</a>
    <div class="container-tj flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-4">
      <RouterLink to="/" class="flex items-center gap-3 text-ink no-underline" aria-label="TJ Teclando Juntos, página inicial">
        <Simbolo :largura="74" :fundo="prefs.altoContraste ? '#000000' : temaEscuro ? '#17223A' : '#FFFFFF'" :variante="prefs.altoContraste || temaEscuro ? 'escura' : 'clara'" />
        <span class="flex flex-col text-[1.25rem] leading-[0.95] font-bold"><span>Teclando</span><span class="text-pri">Juntos</span></span>
      </RouterLink>
      <div class="flex flex-wrap items-center gap-2.5">
        <RouterLink v-if="!conta.logado" to="/entrar" class="btn">Entrar</RouterLink>
        <RouterLink v-else to="/painel" class="btn">Meu painel</RouterLink>
        <button type="button" class="btn btn-pri btn-icone" aria-label="Configurações" title="Configurações" @click="config = true">
          <Icone nome="engrenagem" :tamanho="26" />
        </button>
      </div>
    </div>
    <ConfigModal :aberto="config" @fechar="config = false" />
  </header>

  <section class="container-tj flex flex-wrap items-center gap-12 pt-16 pb-18">
    <div class="flex min-w-0 flex-[1_1_500px] flex-col gap-6">
      <p class="sobretitulo text-pri-ink">Informática para quem tem 60 anos ou mais</p>
      <h1 class="text-[clamp(2rem,5.4vw,3.1rem)] leading-[1.08] font-bold text-balance">Aprenda a usar o computador no seu ritmo.</h1>
      <p class="max-w-[34ch] text-[1.15rem] text-pretty">Teclado, mouse, internet e segurança, com explicações simples, imagens e narração em português. Sem pressa e sem complicação.</p>
      <div class="flex flex-nowrap items-stretch gap-3">
        <RouterLink to="/painel" class="btn btn-pri btn-g min-w-0 text-center">Começar minha jornada <Icone nome="seta" :tamanho="24" :traco="2.6" /></RouterLink>
        <a href="#como" class="btn btn-g min-w-0 text-center">Ver como funciona</a>
      </div>
      <p class="text-[0.9rem]">Não precisa de cadastro para começar.</p>
    </div>
    <div class="flex min-w-0 flex-[1_1_420px] justify-center">
      <!-- Animação: o mouse desliza na mesa, a setinha anda junto e clica no botão. -->
      <svg role="img" aria-label="Ilustração animada: o mouse se mexe na mesa, a setinha anda junto na tela e clica no botão" viewBox="0 0 480 360" class="w-full max-w-[480px] rounded-[20px] border-2 border-ink bg-pri-suave">
        <rect x="0" y="318" width="480" height="42" fill="#C3D9DE" />
        <rect x="70" y="40" width="300" height="190" rx="12" fill="#FFFFFF" stroke="#14213D" stroke-width="5" />
        <rect x="88" y="58" width="264" height="154" rx="4" fill="#F4F9FA" />
        <rect x="108" y="78" width="110" height="14" rx="7" fill="#0B5D6B" />
        <rect x="108" y="106" width="200" height="10" rx="5" fill="#9FB7BD" />
        <rect x="108" y="126" width="170" height="10" rx="5" fill="#9FB7BD" />
        <rect x="108" y="160" width="86" height="32" rx="8" fill="#0B5D6B" />
        <rect class="tj-clique" x="108" y="160" width="86" height="32" rx="8" fill="#6D4AAE" />
        <circle class="tj-onda" cx="188" cy="165" r="16" fill="none" stroke="#6D4AAE" stroke-width="3" />
        <g class="tj-cursor"><path d="M188 165 L188 200 L197 191 L204 206 L211 203 L204 188 L217 187 Z" fill="#FFFFFF" stroke="#14213D" stroke-width="3.5" stroke-linejoin="round" /></g>
        <path d="M200 230h40l8 34h-56z" fill="#14213D" />
        <rect x="168" y="262" width="104" height="10" rx="5" fill="#14213D" />
        <rect x="60" y="290" width="300" height="46" rx="8" fill="#FFFFFF" stroke="#14213D" stroke-width="5" />
        <path d="M78 304h264M78 320h264" stroke="#B9C4CC" stroke-width="8" stroke-dasharray="16 5" />
        <g class="tj-mouse">
          <rect x="386" y="286" width="44" height="66" rx="22" fill="#FFFFFF" stroke="#14213D" stroke-width="5" />
          <path class="tj-clique" d="M406 289 V306 H389 A19 19 0 0 1 406 289 Z" fill="#A58BDD" />
          <path d="M408 286v22M386 308h44" stroke="#14213D" stroke-width="4" />
        </g>
      </svg>
    </div>
  </section>

  <section id="como" aria-labelledby="como-t" class="border-y-2 border-borda bg-superficie">
    <div class="container-tj flex flex-col gap-9 py-18">
      <div class="flex max-w-[680px] flex-col gap-3">
        <h2 id="como-t" class="text-[2rem] font-bold">Como funciona cada lição</h2>
        <p class="text-[1.05rem]">Sempre os mesmos cinco passos. Você pode repetir quantas vezes quiser, e nada avança sozinho enquanto você lê.</p>
      </div>
      <ol class="grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
        <li v-for="(p, i) in PASSOS" :key="p.t" class="tj-surge flex flex-col gap-2 rounded-[14px] border-2 border-borda bg-fundo p-5">
          <span class="grid size-12 place-items-center rounded-[10px] bg-pri text-[1.1rem] font-bold text-pri-txt">{{ i + 1 }}</span>
          <strong class="text-[1.05rem]">{{ p.t }}</strong>
          <span>{{ p.d }}</span>
        </li>
      </ol>
      <div class="grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
        <div v-for="b in BENEFICIOS" :key="b.t" class="flex items-start gap-4">
          <Icone :nome="b.i" :tamanho="32" :traco="2" cor="var(--color-pri)" />
          <div><strong class="block text-[1.05rem]">{{ b.t }}</strong><span>{{ b.d }}</span></div>
        </div>
      </div>
    </div>
  </section>

  <section id="trilhas" aria-labelledby="trilhas-t" class="container-tj flex flex-col gap-8 py-18">
    <div class="flex max-w-[680px] flex-col gap-3">
      <h2 id="trilhas-t" class="text-[2rem] font-bold">O que você vai aprender</h2>
      <p class="text-[1.05rem]">Oito trilhas, do primeiro contato com o computador até se proteger de golpes na internet.</p>
    </div>
    <ol class="grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
      <li v-for="t in TRILHAS" :key="t.n" class="tj-card tj-surge flex flex-col gap-1.5 rounded-[14px] border-2 border-borda bg-superficie p-5">
        <span class="font-bold text-pri-ink">Trilha {{ t.n }}</span>
        <strong class="text-[1.05rem]">{{ t.titulo }}</strong>
        <span>{{ t.desc }}</span>
      </li>
    </ol>

    <div class="flex flex-col gap-4 pt-6">
      <span class="selo">Depois das 8 trilhas</span>
      <h3 class="text-[1.6rem] font-bold">Módulos extras para o dia a dia</h3>
      <p class="max-w-[46ch] text-[1.05rem]">Para quem quer ir além. As 8 trilhas básicas continuam sem custo; os módulos extras são pagos.</p>
      <ul class="grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
        <li v-for="e in EXTRAS" :key="e.n" class="tj-card tj-card-extra tj-surge flex flex-col gap-1.5 rounded-[14px] border-2 border-dashed border-sec bg-sec-claro p-5">
          <span class="font-bold text-sec-ink">Módulo {{ e.n }} · Extra</span>
          <strong class="text-[1.05rem]">{{ e.titulo }}</strong>
          <span>{{ e.resumo }}</span>
        </li>
      </ul>
      <RouterLink to="/extras" class="btn self-start">Conhecer os módulos extras</RouterLink>
    </div>

    <div class="card-destaque flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
      <strong class="text-[1.3rem]">Pronto para dar o primeiro passo?</strong>
      <RouterLink to="/painel" class="btn btn-pri btn-g">Começar minha jornada <Icone nome="seta" :tamanho="24" :traco="2.6" /></RouterLink>
    </div>
  </section>
</template>
