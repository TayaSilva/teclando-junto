<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Icone from '@/components/Icone.vue';
import Ilustracao from '@/components/ilustracoes/Ilustracao.vue';
import { usePreferencias } from '@/composables/usePreferencias';
import type { Atividade } from '@/data/cursos/tipos';

const props = defineProps<{ atividade: Extract<Atividade, { k: 'escolha' }> }>();
const emit = defineEmits<{ feito: [] }>();
const { falar } = usePreferencias();

const i = ref(0);
const escolhida = ref<number | null>(null);
const item = computed(() => props.atividade.itens[i.value]);
const acertou = computed(() => escolhida.value === item.value.r);
const ultimo = computed(() => i.value === props.atividade.itens.length - 1);
const comImagem = computed(() => item.value.opcoes.some((o) => o.img));

// Ordem de exibição das opções (índices originais). Muda a cada pergunta, não a cada tentativa.
const ordem = ref<number[]>([]);
function embaralhar(n: number) {
  const a = Array.from({ length: n }, (_, k) => k);
  for (let k = n - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [a[k], a[j]] = [a[j], a[k]];
  }
  return a;
}
watch(item, (it) => { ordem.value = embaralhar(it.opcoes.length); }, { immediate: true });
const opcoesOrdenadas = computed(() => ordem.value.map((indice) => ({ indice, opcao: item.value.opcoes[indice] })));

function escolher(n: number) {
  if (acertou.value) return;
  escolhida.value = n;
  falar(n === item.value.r ? item.value.certo : item.value.errado);
  if (n === item.value.r && ultimo.value) emit('feito');
}
function proxima() {
  i.value++;
  escolhida.value = null;
}
</script>

<template>
  <div class="card flex flex-col gap-4">
    <p v-if="atividade.instrucao" class="text-[1.05rem]">{{ atividade.instrucao }}</p>
    <p v-if="atividade.itens.length > 1" class="text-[0.9rem] font-bold">Pergunta {{ i + 1 }} de {{ atividade.itens.length }}</p>
    <h3 class="text-[1.3rem] leading-snug font-bold sm:text-[1.5rem]">{{ item.pergunta }}</h3>

    <div v-if="item.cartoes" class="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
      <figure v-for="(c, n) in item.cartoes" :key="n" class="m-0 flex flex-col gap-1.5 rounded-xl border-2 border-dashed border-tracejado bg-sec-claro p-4">
        <figcaption v-if="c.titulo" class="text-[0.85rem] font-bold uppercase">{{ c.titulo }}</figcaption>
        <p v-for="(l, k) in c.linhas" :key="k" class="text-[1.05rem]" :class="k === 0 ? 'font-bold' : ''">{{ l }}</p>
      </figure>
    </div>

    <div role="group" :aria-label="item.pergunta" class="grid gap-3" :class="comImagem ? '[grid-template-columns:repeat(auto-fit,minmax(min(180px,100%),1fr))]' : ''">
      <button
        v-for="opcao in opcoesOrdenadas"
        :key="opcao.indice"
        type="button"
        class="opcao w-full items-center text-left text-[1.1rem] font-bold"
        :class="[escolhida === opcao.indice ? 'sel' : '', comImagem ? 'flex-col text-center' : '']"
        :aria-pressed="escolhida === opcao.indice"
        @click="escolher(opcao.indice)"
      >
        <Ilustracao v-if="opcao.opcao.img" :nome="opcao.opcao.img" sem-legenda class="h-auto w-full max-w-[200px]" />
        <span :class="opcao.opcao.img ? 'sr-only' : ''">{{ opcao.opcao.t }}</span>
      </button>
    </div>

    <div v-if="escolhida !== null" role="status" aria-live="polite" class="retorno" :class="acertou ? 'retorno-ok' : 'retorno-erro'">
      <Icone :nome="acertou ? 'ok' : 'alerta'" :tamanho="30" :traco="2.4" :cor="acertou ? 'var(--color-pri)' : 'var(--color-sec-ink)'" />
      <span>
        <strong class="block">{{ acertou ? 'Muito bem!' : 'Vamos tentar de novo' }}</strong>
        {{ acertou ? item.certo : item.errado }}
        <span v-if="acertou && item.aviso" class="mt-1 block text-[0.95rem]">{{ item.aviso }}</span>
      </span>
    </div>

    <button v-if="acertou && !ultimo" type="button" class="btn btn-pri self-start max-sm:w-full" @click="proxima">Próxima pergunta <Icone nome="seta" :tamanho="20" :traco="2.6" /></button>
  </div>
</template>
