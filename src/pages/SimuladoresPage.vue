<script setup lang="ts">
import Icone from '@/components/Icone.vue';

const OUTROS = [
  { icone: 'mouse', titulo: 'Treino de mouse', desc: 'Clicar, clicar duas vezes, arrastar e rolar a página.', trilha: 'Combina com a Trilha 2', pronto: true, rota: '/aula/2.2' },
  { icone: 'teclado', titulo: 'Treino de teclado', desc: 'Encontre as teclas, escreva palavras e corrija erros num editor simples.', trilha: 'Combina com as Trilhas 3 e 4', pronto: true, rota: '/trilhas/teclado' },
  { icone: 'globo', titulo: 'Navegador de internet', desc: 'Pesquise, abra links, use abas e os botões voltar e avançar.', trilha: 'Combina com a Trilha 6', pronto: true, rota: '/aula/6.2' },
  { icone: 'email', titulo: 'Caixa de e-mail', desc: 'Leia, responda e anexe arquivos com mensagens de exemplo.', trilha: 'Combina com a Trilha 7', pronto: true, rota: '/aula/7.2' },
  { icone: 'aviso', titulo: 'Golpe ou não é golpe?', desc: 'Mensagens de exemplo para aprender a reconhecer fraudes e pedidos de código.', trilha: 'Combina com a Trilha 8', pronto: true, rota: '/aula/8.3' },
];
</script>

<template>
  <div class="container-tj flex flex-col gap-8 pt-2 pb-16">
    <div class="flex max-w-[760px] flex-col gap-1.5">
      <h1 class="text-[2.2rem] leading-tight font-bold">Simuladores</h1>
      <p class="text-[1.05rem]">Treine à vontade, sem medo de errar. Tudo acontece aqui dentro da página: nada muda no seu computador de verdade.</p>
    </div>

    <section aria-labelledby="desk-t" class="card-destaque flex flex-wrap items-center gap-7">
      <svg role="img" aria-label="Desenho de uma área de trabalho de treino, com pastas, uma janela aberta e a lixeira" viewBox="0 0 460 290" class="w-full max-w-[460px] min-w-0 flex-[1_1_380px]">
        <rect x="2" y="2" width="456" height="286" rx="12" fill="#3E7C88" stroke="#14213D" stroke-width="4" />
        <g fill="#DCCFF5" stroke="#14213D" stroke-width="3"><path d="M24 26h18l6 6h22v30H24z" /><path d="M24 92h18l6 6h22v30H24z" /></g>
        <rect x="20" y="66" width="56" height="14" rx="3" fill="#FFFFFF" />
        <rect x="20" y="132" width="56" height="14" rx="3" fill="#FFFFFF" />
        <path d="M30 168h36l-4 42H34z" fill="#FFFFFF" stroke="#14213D" stroke-width="3" />
        <path d="M26 168h44" stroke="#14213D" stroke-width="4" stroke-linecap="round" />
        <rect x="20" y="216" width="56" height="14" rx="3" fill="#FFFFFF" />
        <rect x="130" y="30" width="300" height="190" rx="8" fill="#FFFFFF" stroke="#14213D" stroke-width="4" />
        <rect x="130" y="30" width="300" height="34" rx="8" fill="#14213D" />
        <rect x="142" y="42" width="110" height="10" rx="5" fill="#FFFFFF" />
        <rect x="356" y="40" width="16" height="16" rx="3" fill="#FFFFFF" />
        <rect x="378" y="40" width="16" height="16" rx="3" fill="#FFFFFF" />
        <rect x="400" y="40" width="16" height="16" rx="3" fill="#A58BDD" />
        <g fill="#DCCFF5" stroke="#14213D" stroke-width="2.5"><path d="M152 84h14l5 5h18v24h-37z" /><path d="M222 84h14l5 5h18v24h-37z" /></g>
        <rect x="292" y="80" width="30" height="38" rx="3" fill="#FFFFFF" stroke="#14213D" stroke-width="2.5" />
        <rect x="2" y="250" width="456" height="38" fill="#14213D" />
        <rect x="14" y="258" width="70" height="22" rx="6" fill="#FFFFFF" />
        <path d="M296 150 L296 186 L305 177 L312 192 L319 189 L312 174 L325 173 Z" fill="#FFFFFF" stroke="#14213D" stroke-width="3" stroke-linejoin="round" />
      </svg>
      <div class="flex min-w-0 flex-[1_1_400px] flex-col gap-2.5">
        <p class="sobretitulo">Em preparação</p>
        <h2 id="desk-t" class="text-[1.8rem] leading-tight font-bold">Área de trabalho de treino</h2>
        <p>Abra e feche janelas, crie e renomeie arquivos, guarde coisas em pastas e use a lixeira.</p>
        <p class="text-[0.9rem]">Combina com a Trilha 5 · Conhecendo o sistema</p>
        <p class="flex items-center gap-2 font-bold"><Icone nome="relogio" :tamanho="20" /> Em breve</p>
      </div>
    </section>

    <section aria-labelledby="outros-t" class="flex flex-col gap-4">
      <h2 id="outros-t" class="text-[1.6rem] font-bold">Outros simuladores</h2>
      <ul class="grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]">
        <li v-for="o in OUTROS" :key="o.titulo" class="flex flex-col gap-2" :class="o.pronto ? 'card' : 'card-tracejado'">
          <Icone :nome="o.icone" :tamanho="44" :traco="1.8" :cor="o.pronto ? 'var(--color-pri)' : 'var(--color-ink-2)'" />
          <strong class="text-[1.2rem]">{{ o.titulo }}</strong>
          <span class="grow">{{ o.desc }}</span>
          <span class="text-[0.9rem]">{{ o.trilha }}</span>
          <RouterLink v-if="o.pronto && o.rota" :to="o.rota" class="btn self-start">Abrir o simulador</RouterLink>
          <span v-else class="flex items-center gap-1.5 font-bold"><Icone nome="relogio" :tamanho="20" /> Em breve</span>
        </li>
      </ul>
    </section>

    <p class="flex items-start gap-2.5 rounded-[14px] border-2 border-borda bg-superficie px-5 py-4">
      <Icone nome="monitor" :tamanho="26" cor="var(--color-pri)" class="mt-0.5" />
      <span>Os simuladores funcionam melhor em um computador com teclado e mouse. No celular ou tablet, algumas atividades não podem ser feitas por completo.</span>
    </p>
  </div>
</template>
