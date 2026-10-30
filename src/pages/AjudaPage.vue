<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import Icone from '@/components/Icone.vue';
import { tira } from '@/lib/texto';

const PERGUNTAS = [
  { q: 'Preciso criar uma conta para usar?', r: 'Não. É só começar, sem cadastro e sem senha. Depois de concluir 3 atividades, você pode criar um acesso se quiser continuar em outro computador. É opcional.' },
  { q: 'Onde fica salvo o meu progresso?', r: 'Neste computador, no navegador que você está usando. Se os dados do navegador forem apagados, o progresso se perde. Com um acesso criado, ele fica guardado com segurança.' },
  { q: 'Errei uma atividade. E agora?', r: 'Sem problema. Você pode tentar quantas vezes quiser, e nada é perdido por errar. Use “Mostrar uma dica” quando precisar.' },
  { q: 'Os simuladores mexem no meu computador?', r: 'Não. Tudo acontece dentro da página. Arquivos, pastas e mensagens dos simuladores são de mentira, criados só para você treinar.' },
  { q: 'Como deixo as letras maiores ou com mais contraste?', r: 'Clique na engrenagem no alto da tela. Lá você escolhe o tamanho do texto, liga o alto contraste e ajusta a narração.' },
  { q: 'A narração está rápida demais. Dá para mudar?', r: 'Sim. Na engrenagem, em “Velocidade da voz”, escolha “Mais devagar”. Você também pode pausar e ouvir de novo.' },
  { q: 'Posso usar no celular?', r: 'Algumas lições sim. Mas os exercícios de teclado e mouse precisam de um computador para serem feitos por completo.' },
  { q: 'Como funcionam os módulos extras?', r: 'Depois das 8 trilhas básicas, você pode comprar módulos extras por R$ 5,00 cada, ou o pacote com os 6 por R$ 26,00. O pagamento é feito pelo Mercado Pago, com Pix, cartão ou boleto.' },
];

const busca = ref('');
const aberta = ref(0);
const filtradas = computed(() => {
  const termo = tira(busca.value.trim().toLowerCase());
  if (!termo) return PERGUNTAS;
  return PERGUNTAS.filter((p) => tira(`${p.q} ${p.r}`.toLowerCase()).includes(termo));
});
</script>

<template>
  <div class="mx-auto flex w-full max-w-[1000px] flex-col gap-8 px-4 sm:px-6 pt-2 pb-16">
    <div class="flex flex-col gap-3">
      <h1 class="text-[2.2rem] leading-tight font-bold">Como podemos ajudar?</h1>
      <label class="flex flex-col gap-1.5 font-bold">
        <span>Escreva sua dúvida</span>
        <span class="flex flex-wrap gap-2.5">
          <input v-model="busca" type="search" placeholder="Por exemplo: aumentar a letra" class="entrada min-h-[60px] min-w-0 flex-[1_1_320px]" @input="aberta = 0" />
          <span class="btn btn-pri min-h-[60px]" aria-hidden="true"><Icone nome="lupa" :traco="2.6" /> Procurar</span>
        </span>
      </label>
      <p class="text-[0.9rem]" aria-live="polite">{{ busca ? `${filtradas.length} ${filtradas.length === 1 ? 'resposta encontrada' : 'respostas encontradas'}` : '' }}</p>
    </div>

    <section aria-labelledby="atalhos-t" class="flex flex-col gap-3">
      <h2 id="atalhos-t" class="text-[1.4rem] font-bold">Ajuda rápida</h2>
      <ul class="grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
        <li class="card flex items-start gap-3"><Icone nome="texto" :tamanho="34" :traco="2" cor="var(--color-pri)" /><span><strong class="block">Letra maior</strong>Clique na engrenagem no alto da tela e escolha A+ ou A++.</span></li>
        <li class="card flex items-start gap-3"><Icone nome="som" :tamanho="34" :traco="2" cor="var(--color-pri)" /><span><strong class="block">Ouvir as explicações</strong>Em cada lição há um botão “Ouvir”. Ele pode ser pausado a qualquer momento.</span></li>
        <li class="card flex items-start gap-3"><Icone nome="repetir" :tamanho="34" :traco="2" cor="var(--color-pri)" /><span><strong class="block">Voltar ou repetir</strong>Use “Voltar” ou “Recomeçar exercício” em qualquer lição.</span></li>
      </ul>
    </section>

    <section aria-labelledby="perg-t" class="flex flex-col gap-3">
      <h2 id="perg-t" class="text-[1.4rem] font-bold">Perguntas frequentes</h2>
      <p v-if="!filtradas.length">Não encontramos nada com essas palavras. Tente escrever de outro jeito ou fale com a gente.</p>
      <div class="flex flex-col gap-2.5">
        <div v-for="(p, i) in filtradas" :key="p.q" class="rounded-[14px] bg-superficie" :class="aberta === i ? 'border-[3px] border-pri' : 'border-2 border-borda'">
          <h3 class="m-0 text-[1rem]">
            <button
              type="button"
              class="flex min-h-16 w-full items-center justify-between gap-4 bg-transparent px-5 py-2.5 text-left text-[1.05rem] font-bold"
              :aria-expanded="aberta === i"
              :aria-controls="`resp-${i}`"
              @click="aberta = aberta === i ? -1 : i"
            >
              <span>{{ p.q }}</span>
              <span aria-hidden="true" class="grid size-10 shrink-0 place-items-center rounded-[10px] border-2 border-ink" :class="aberta === i ? 'rotate-180' : ''"><Icone nome="baixo" :traco="2.8" /></span>
            </button>
          </h3>
          <p v-if="aberta === i" :id="`resp-${i}`" class="max-w-[60ch] px-5 pb-5">{{ p.r }}</p>
        </div>
      </div>
    </section>

    <section aria-labelledby="mais-t" class="card-destaque flex flex-wrap items-center gap-x-8 gap-y-5">
      <div class="flex min-w-0 flex-[1_1_400px] flex-col gap-1.5">
        <h2 id="mais-t" class="text-[1.4rem] font-bold">Ainda com dúvida?</h2>
        <p>Tudo bem pedir ajuda a um familiar ou amigo para os primeiros passos. Se preferir, escreva para nós.</p>
      </div>
      <RouterLink to="/contato" class="btn btn-pri btn-g"><Icone nome="mensagem" /> Falar com a responsável</RouterLink>
    </section>
  </div>
</template>
