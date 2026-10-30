<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { PLANO } from '@/data/cursos';
import Icone from '@/components/Icone.vue';
import TecladoAbnt2 from '@/components/TecladoAbnt2.vue';
import { LICOES, passosDa, type Passo } from '@/data/licoesTeclado';
import { explica, idDe, nomeTecla, norm, teclasDe } from '@/lib/texto';
import { useProgresso } from '@/composables/useProgresso';
import { usePreferencias } from '@/composables/usePreferencias';

const route = useRoute();
const router = useRouter();
const progresso = useProgresso();
const { falar } = usePreferencias();

const ESCREVER = ['completar', 'digitar', 'foto', 'separar', 'corrigir', 'delete', 'enter', 'ano', 'livre'];
const COM_ENTER = ['completar', 'digitar', 'foto', 'separar', 'corrigir', 'delete', 'ano', 'livre', 'copiar'];

const inicial = Math.max(0, LICOES.findIndex((l) => l.id === route.query.licao));
const s = reactive({
  li: inicial,
  passo: 0,
  valor: '',
  res: null as null | 'ok' | 'erro',
  msg: '',
  campos: [] as string[],
  seqPos: 0,
  menuAberto: true,
  cursorPos: 0,
  ult: null as string | null,
});
const area = ref<HTMLElement | null>(null);

const l = computed(() => LICOES[s.li]);
const ps = computed(() => passosDa(l.value));
const it = computed<Passo>(() => ps.value[s.passo] ?? { k: 'intro' });
const k = computed(() => it.value.k);
const escrever = computed(() => ESCREVER.includes(k.value));
const exercicio = computed(() => escrever.value || ['tab', 'esc', 'teclas', 'copiar', 'escolha'].includes(k.value));
const ok = computed(() => s.res === 'ok');
const pct = computed(() => Math.round((s.passo / Math.max(1, ps.value.length - 1)) * 100));

function limpar() {
  const p = ps.value[s.passo] ?? { k: 'intro' };
  const ini = p.ini ?? '';
  s.valor = p.k === 'corrigir' || p.k === 'delete' ? ini : '';
  s.res = null;
  s.msg = '';
  s.campos = (p.campos ?? []).map(() => '');
  s.seqPos = 0;
  s.menuAberto = true;
  s.cursorPos = ini.length;
}

// Lição anterior na ordem do curso (pode ser de outra trilha). Na primeira tela, Voltar leva até ela.
const anterior = computed(() => {
  const i = PLANO.findIndex((p) => p.id === l.value.id);
  return i > 0 ? PLANO[i - 1] : undefined;
});
function voltar() {
  if (s.passo > 0) return ir(s.li, s.passo - 1);
  router.push(anterior.value?.rota ?? '/trilhas');
}

function ir(li: number, passo: number) {
  s.li = li;
  s.passo = passo;
  limpar();
}

watch(
  () => [s.li, s.passo],
  async () => {
    await nextTick();
    const el = area.value?.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>('[data-foco]');
    if (!el) return;
    el.focus();
    if ('setSelectionRange' in el && typeof el.value === 'string' && !(el as HTMLInputElement).readOnly) {
      const pos = it.value.cur ?? el.value.length;
      el.setSelectionRange(pos, pos);
    }
  },
);

// Abrir outra lição pelo endereço (ex.: /trilhas/teclado?licao=4.1) sem recarregar a página.
watch(
  () => route.query.licao,
  (id) => {
    const i = LICOES.findIndex((x) => x.id === id);
    if (i >= 0 && i !== s.li) ir(i, 0);
  },
);

function avancar() {
  if (s.passo + 1 >= ps.value.length) return;
  s.passo += 1;
  limpar();
  if (ps.value[s.passo].k === 'fim') progresso.concluir(`teclado-${l.value.id}`, `${l.value.id} ${l.value.nome}`);
}

function conferir() {
  const p = it.value;
  const v = s.valor;
  let certo = false;
  let msg = '';
  if (p.k === 'completar') {
    certo = !!v && norm(v, p, true) === norm(p.r ?? '', p, true);
    msg = certo ? `Isso! Fica ${p.palavra}.` : v ? `Com “${v.toUpperCase()}” ficaria ${(p.mostra ?? '').replace('_', v.toUpperCase())}. Tente outra letra.` : 'Aperte uma letra no teclado.';
  } else if (p.k === 'livre') {
    certo = /^\d{1,4}$/.test(v.trim());
    msg = certo ? 'Que bela lembrança! Obrigado por compartilhar com a gente.' : 'Use só números, por exemplo: 1975.';
  } else if (p.k === 'tab') {
    const c = { ci: true };
    const idx = (p.campos ?? []).findIndex((f, i) => norm((s.campos[i] ?? '').trim(), c, true) !== norm(f.r, c, true));
    certo = idx < 0;
    msg = certo ? 'Convite preenchido! O Tab levou você de um campo para o outro.' : `O campo “${p.campos![idx].l}” ainda não está igual. Era: “${p.campos![idx].r}”.`;
  } else {
    certo = norm(v.trim(), p, true) === norm(p.r ?? '', p, true);
    if (certo) {
      msg = p.k === 'delete' ? 'Pronto! O Delete tirou a letra que estava depois do cursor.' : p.k === 'corrigir' ? `Pronto! Ficou ${p.r}.` : p.k === 'copiar' ? 'Copiado e colado! Agora você sabe levar um texto de um lugar para outro.' : 'Está igualzinho!';
    } else msg = explica(p.r ?? '', v.trim(), p);
  }
  s.res = certo ? 'ok' : 'erro';
  s.msg = msg;
}

function aoTeclar(e: KeyboardEvent) {
  const id = idDe(e);
  const rot = e.ctrlKey && id === 'Z' ? 'Ctrl+Z' : id;
  const p = it.value;
  s.ult = id;
  if (p.k === 'teclas' && p.seq && s.res !== 'ok' && rot === p.seq[s.seqPos]) {
    s.seqPos += 1;
    if (s.seqPos >= p.seq.length) {
      s.res = 'ok';
      s.msg = p.seq[0] === 'Ctrl+Z' ? 'Isso! Em muitos programas, Ctrl + Z desfaz a última alteração.' : p.seq[0] === 'Home' ? 'Viu só? Home levou o cursor para o começo e End levou para o final.' : 'Isso! O cursor andou para a esquerda, uma letra de cada vez.';
    }
  }
  if (p.k === 'esc' && e.key === 'Escape' && s.menuAberto) {
    s.menuAberto = false;
    s.res = 'ok';
    s.msg = 'O menu fechou. Em muitos programas, Esc fecha menus e avisos pequenos.';
  }
  if (e.key === 'Enter' && COM_ENTER.includes(p.k)) {
    e.preventDefault();
    if (s.res === 'ok') avancar();
    else conferir();
  }
}

function posCursor(e: Event) {
  const t = e.target as HTMLInputElement;
  s.cursorPos = typeof t.selectionStart === 'number' ? t.selectionStart : (it.value.ini ?? '').length;
}

function escolher(sinal: string) {
  const certo = sinal === it.value.r;
  s.res = certo ? 'ok' : 'erro';
  s.msg = certo ? `Isso mesmo! É o sinal “${sinal}”.` : 'Ainda não. Olhe o último sinal da frase e tente de novo.';
}

// Teclas em destaque no desenho do teclado
const dica = computed<string[]>(() => {
  const p = it.value;
  if (p.k === 'intro') return l.value.teclas;
  if (p.k === 'info') return p.teclas ?? [];
  if (ok.value) return [];
  if (p.k === 'completar') return s.valor ? [] : teclasDe(p.r ?? '', false);
  if (['digitar', 'foto', 'separar', 'enter', 'ano'].includes(p.k)) {
    const r = p.r ?? '';
    if (norm(r, p, false).startsWith(norm(s.valor, p, false))) {
      const ch = r[s.valor.length];
      return ch === undefined ? [] : teclasDe(ch, /[a-zà-ú]/.test(r) && /[A-ZÀ-Ú]/.test(r));
    }
    return ['Backspace'];
  }
  if (p.k === 'corrigir') return ['Backspace'];
  if (p.k === 'delete') return ['Delete'];
  if (p.k === 'tab') return ['Tab'];
  if (p.k === 'esc') return ['Esc'];
  if (p.k === 'copiar') return ['Ctrl', 'C', 'V'];
  if (p.k === 'teclas') {
    const prox = p.seq?.[s.seqPos];
    return !prox ? [] : prox === 'Ctrl+Z' ? ['Ctrl', 'Z'] : [prox];
  }
  return [];
});

const legenda = computed(() => {
  const d = dica.value;
  if (!d.length) return 'Teclado brasileiro (ABNT2)';
  if (k.value === 'intro' || k.value === 'info') return `Teclas em destaque: ${d.map(nomeTecla).join(', ')}`;
  if (d[0] === 'Ctrl') return `Próximas teclas: Ctrl + ${d.slice(1).join(' / ')}`;
  if (d[0] === 'Shift' && d.length > 1) return `Próxima tecla: Shift + ${d.slice(1).join(' e depois ')}`;
  return `Próxima tecla: ${d.map(nomeTecla).join(' e depois ')}`;
});

const ROTULOS: Record<string, string> = { completar: 'Complete a palavra', digitar: 'Copie', foto: 'Digite o nome', separar: 'Separe as palavras', corrigir: 'Corrija a palavra', delete: 'Corrija com Delete', enter: 'Copie em duas linhas' };
const mostraTexto = computed(() => {
  const p = it.value;
  if (['completar', 'separar', 'corrigir', 'delete'].includes(p.k)) return p.mostra ?? '';
  if (['digitar', 'foto', 'enter'].includes(p.k)) return p.r ?? '';
  return '';
});
const grande = computed(() => k.value === 'completar' || k.value === 'foto' || (k.value === 'digitar' && (it.value.r ?? '').length < 12));
const campoRotulo = computed(() => (k.value === 'completar' ? 'Letra que falta' : k.value === 'ano' || k.value === 'livre' ? 'Ano' : 'Escreva aqui'));
const bordaCampo = computed(() => (ok.value ? 'border-[3px] border-pri' : s.res === 'erro' ? 'border-[3px] border-sec' : ''));

const OPCOES = [
  { s: '?', n: 'Interrogação' },
  { s: '.', n: 'Ponto final' },
  { s: '!', n: 'Exclamação' },
];

const lado = (c: 3 | 4) => LICOES.map((x, i) => ({ x, i })).filter((o) => o.x.c === c);
const status = (i: number) => (progresso.foiConcluida(`teclado-${LICOES[i].id}`) ? 'Concluída' : i === s.li ? 'Você está aqui' : LICOES[i].pendente ? 'Em preparação' : '');
const listasAbertas = reactive<Record<3 | 4, boolean>>({ 3: false, 4: false });
</script>

<template>
  <div class="mx-auto flex w-full max-w-[1280px] flex-wrap items-start gap-6 px-4 sm:px-6 pt-2 pb-14">
    <!-- Lista de lições -->
    <aside aria-label="Lições" class="flex max-w-full flex-[1_1_280px] flex-col gap-5">
      <nav v-for="c in ([3, 4] as const)" :key="c" :aria-labelledby="`c${c}-t`" class="flex flex-col gap-2">
        <h2 :id="`c${c}-t`" class="m-0">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-3 bg-transparent p-0 text-left"
            :aria-controls="`c${c}-lista`"
            :aria-expanded="listasAbertas[c]"
            @click="listasAbertas[c] = !listasAbertas[c]"
          >
            <span class="sobretitulo text-[0.85rem] text-sec-ink">{{ c === 3 ? 'Trilha 3 · Conhecendo o teclado' : 'Trilha 4 · Praticando digitação' }}</span>
            <span class="btn btn-icone" aria-hidden="true"><Icone nome="baixo" :tamanho="20" :traco="2.6" :class="listasAbertas[c] ? 'rotate-180' : ''" /></span>
          </button>
        </h2>
        <div v-if="listasAbertas[c]" :id="`c${c}-lista`" class="flex flex-col gap-2">
          <button
            v-for="o in lado(c)"
            :key="o.x.id"
            type="button"
            :aria-current="o.i === s.li ? 'true' : undefined"
            class="flex min-h-14 w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-left text-[0.85rem] font-bold"
            :class="o.i === s.li ? 'border-[3px] border-sec-forte bg-sec-suave' : 'border-2 border-borda-suave bg-superficie'"
            @click="ir(o.i, 0)"
          >
            <span
              aria-hidden="true"
              class="grid size-11 shrink-0 place-items-center rounded-[10px] border-2 border-ink"
              :class="progresso.foiConcluida(`teclado-${o.x.id}`) ? 'bg-pri text-pri-txt' : o.i === s.li ? 'bg-sec-forte text-[#14213D]' : 'bg-fundo'"
            >{{ o.x.id }}</span>
            <span class="flex min-w-0 flex-col"><span>{{ o.x.nome }}</span><span class="text-[0.75rem] font-normal">{{ status(o.i) }}</span></span>
          </button>
        </div>
      </nav>
    </aside>

    <div ref="area" class="flex min-w-0 flex-[999_1_640px] flex-col gap-5">
      <div class="flex flex-col gap-2">
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span class="font-bold">Lição {{ l.id }} · {{ l.nome }}</span>
          <span class="text-[0.9rem]">{{ k === 'intro' ? 'Apresentação' : k === 'fim' ? 'Conclusão' : it.ativ }} · passo {{ s.passo + 1 }} de {{ ps.length }}</span>
        </div>
        <div class="barra" role="progressbar" aria-label="Andamento da lição" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="pct">
          <span :style="{ width: `${pct}%`, background: 'var(--color-sec-forte)' }" />
        </div>
      </div>

      <!-- Apresentação -->
      <section v-if="k === 'intro'" aria-labelledby="intro-t" class="overflow-hidden rounded-[18px] border-2 border-borda bg-superficie">
        <div class="flex flex-wrap items-center gap-4 border-b-2 border-sec-forte bg-sec-suave px-7 py-5">
          <span aria-hidden="true" class="grid h-[72px] min-w-[72px] place-items-center rounded-2xl border-[3px] border-b-[7px] border-ink bg-sec-forte px-2.5 text-[1.4rem] font-bold text-[#14213D]">{{ l.id }}</span>
          <div class="flex min-w-0 flex-col">
            <span class="text-[0.9rem] font-bold text-sec-ink">{{ l.nome }}</span>
            <h1 id="intro-t" class="text-[1.9rem] leading-tight font-bold">{{ l.titulo }}</h1>
          </div>
        </div>
        <div class="flex flex-col gap-3.5 px-7 py-6">
          <p v-for="(t, i) in l.intro" :key="i" class="max-w-[60ch] text-[1.1rem]">{{ t }}</p>
          <p v-if="l.objetivo"><strong>Objetivo:</strong> {{ l.objetivo }}</p>
          <div v-if="l.teclas.length" class="flex flex-wrap items-center gap-2">
            <span class="font-bold">Teclas desta lição:</span>
            <span v-for="t in l.teclas" :key="t" class="tecla-chip bg-sec-tecla text-[#14213D]">{{ nomeTecla(t) }}</span>
          </div>
          <div class="flex flex-wrap gap-2.5 pt-1.5">
            <button v-if="!l.pendente" type="button" class="btn btn-pri btn-g" @click="avancar">Começar a lição <Icone nome="seta" :traco="2.6" /></button>
            <p v-else class="card-tracejado px-4 py-3">As atividades desta lição ainda estão sendo preparadas.</p>
            <button type="button" class="btn btn-g" @click="falar(`${l.titulo}. ${l.intro.join(' ')}`)"><Icone nome="som" /> Ouvir</button>
          </div>
        </div>
      </section>

      <!-- Explicação -->
      <section v-else-if="k === 'info'" aria-labelledby="info-t" class="card flex flex-col gap-3.5 px-7 py-6">
        <span class="selo">Explicação</span>
        <h1 id="info-t" class="text-[1.7rem] leading-tight font-bold">{{ it.ativ }}</h1>
        <p v-for="(t, i) in it.p" :key="i" class="max-w-[62ch] text-[1.05rem]">{{ t }}</p>
        <ul v-if="it.lista?.length" class="flex list-none flex-col gap-2.5 p-0">
          <li v-for="li in it.lista" :key="li.k" class="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border-2 border-borda-suave bg-fundo px-3.5 py-2.5">
            <span class="tecla-chip min-w-14 px-3 text-[1rem]">{{ li.k }}</span>
            <span class="min-w-0 flex-[1_1_260px]">{{ li.d }}</span>
          </li>
        </ul>
        <div v-if="it.ex?.length" class="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
          <figure v-for="(ex, i) in it.ex" :key="i" class="m-0 flex flex-col gap-2 rounded-xl border-2 border-pri bg-pri-claro p-4">
            <span aria-hidden="true" class="flex items-center text-[2rem] font-bold tracking-wider">{{ ex.antes }}<span class="cursor-visual" />{{ ex.depois }}</span>
            <figcaption>{{ ex.leg }}</figcaption>
          </figure>
        </div>
        <div class="flex flex-wrap gap-2.5">
          <button type="button" class="btn btn-pri btn-g" data-foco @click="avancar">Entendi, continuar <Icone nome="seta" :traco="2.6" /></button>
          <button type="button" class="btn btn-g" @click="falar([it.ativ, ...(it.p ?? []), ...(it.lista ?? []).map((x) => x.d)].join('. '))"><Icone nome="som" /> Ouvir</button>
        </div>
      </section>

      <!-- Exercício -->
      <section v-else-if="exercicio" aria-labelledby="ex-t" class="card flex flex-col gap-4 px-7 py-6">
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
          <h1 id="ex-t" class="text-[1.5rem] leading-tight font-bold">{{ it.ativ }}</h1>
          <span v-if="(it.tot ?? 0) > 1" class="rounded-full bg-sec-suave px-3 py-0.5 text-[0.9rem] font-bold text-sec-ink">Exercício {{ it.n }} de {{ it.tot }}</span>
        </div>
        <p class="max-w-[62ch]">{{ it.i }}</p>

        <!-- Escrever -->
        <div v-if="escrever" class="flex flex-wrap items-stretch gap-5">
          <div v-if="it.foto" role="img" :aria-label="`Espaço para a foto: ${it.foto}`" class="flex min-h-40 flex-[0_0_200px] flex-col items-center justify-center gap-2 rounded-[14px] border-2 border-dashed border-tracejado bg-fundo p-3 text-center text-[0.8rem]">
            <Icone nome="imagem" :tamanho="40" :traco="1.8" />
            <span>[FOTO: {{ it.foto }}]</span>
          </div>
          <div class="flex min-w-0 flex-[1_1_320px] flex-col gap-3.5">
            <p v-if="it.pergunta" class="text-[1.2rem] font-bold">{{ it.pergunta }}</p>
            <div v-if="mostraTexto" class="flex flex-col gap-1">
              <span class="text-[0.85rem] font-bold text-ink-2">{{ ROTULOS[k] }}</span>
              <span class="modelo" :class="{ grande }">{{ mostraTexto }}</span>
            </div>
            <p v-if="it.nota" class="text-[0.9rem]">{{ it.nota }}</p>
            <label class="flex flex-col gap-1.5 font-bold">
              <span>{{ campoRotulo }}</span>
              <textarea v-if="k === 'enter'" v-model="s.valor" data-foco rows="3" spellcheck="false" class="entrada text-[1.2rem]" :class="bordaCampo" @input="s.res = null" @keydown="aoTeclar" />
              <input v-else v-model="s.valor" data-foco type="text" autocomplete="off" spellcheck="false" :maxlength="k === 'completar' ? 1 : 300" class="entrada min-h-[60px] text-[1.2rem]" :class="bordaCampo" @input="s.res = null" @keydown="aoTeclar" />
            </label>
          </div>
        </div>

        <!-- Tab -->
        <form v-else-if="k === 'tab'" class="flex max-w-[560px] flex-col gap-3.5 rounded-[14px] border-2 border-sec-forte bg-sec-claro p-5" @submit.prevent="conferir">
          <strong class="text-[1.1rem]">Convite</strong>
          <label v-for="(f, i) in it.campos" :key="f.l" class="flex flex-col gap-1 font-bold">
            <span>{{ f.l }}</span>
            <input v-model="s.campos[i]" :data-foco="i === 0 ? '' : undefined" type="text" autocomplete="off" spellcheck="false" class="entrada" @input="s.res = null" @keydown="aoTeclar" />
            <span class="text-[0.85rem] font-normal">Escreva: {{ f.r }}</span>
          </label>
        </form>

        <!-- Esc -->
        <template v-else-if="k === 'esc'">
          <div class="max-w-[560px] overflow-hidden rounded-xl border-[3px] border-ink bg-superficie" @keydown="aoTeclar">
            <div class="bg-marinho px-3.5 py-2 font-bold text-white">Meu caderno</div>
            <div class="relative min-h-[220px] p-3.5">
              <div class="flex gap-2 border-b-2 border-borda-suave pb-2 font-bold">
                <span class="rounded-md bg-sec-suave px-2.5 py-1">Arquivo</span><span class="px-2.5 py-1">Editar</span><span class="px-2.5 py-1">Ajuda</span>
              </div>
              <div v-if="s.menuAberto" role="menu" aria-label="Menu Arquivo" class="absolute top-14 left-3.5 flex w-[220px] flex-col gap-0.5 rounded-[10px] border-2 border-ink bg-superficie p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                <button v-for="(op, i) in ['Novo', 'Abrir', 'Salvar', 'Imprimir']" :key="op" type="button" role="menuitem" :data-foco="i === 0 ? '' : undefined" class="min-h-12 rounded-lg px-3 text-left" :class="i === 0 ? 'bg-pri-claro' : ''">{{ op }}</button>
              </div>
              <p class="mt-3.5 text-[0.9rem] text-ink-2">Este é um caderno de treino. Nada aqui mexe no seu computador.</p>
            </div>
          </div>
          <p class="text-[0.85rem]">Se nada acontecer, clique em “Novo” no menu e aperte Esc de novo.</p>
        </template>

        <!-- Setas, Home/End, Ctrl+Z -->
        <div v-else-if="k === 'teclas'" class="flex flex-col gap-3">
          <div aria-hidden="true" class="flex flex-wrap items-center rounded-xl border-2 border-pri bg-pri-claro px-4.5 py-3.5 text-[1.8rem] font-bold whitespace-pre">{{ (it.ini ?? '').slice(0, s.cursorPos) }}<span class="cursor-visual" />{{ (it.ini ?? '').slice(s.cursorPos) }}</div>
          <label class="flex flex-col gap-1.5 font-bold">
            <span>Clique aqui e use as teclas</span>
            <input :value="it.ini" data-foco type="text" autocomplete="off" spellcheck="false" class="entrada min-h-[60px] text-[1.1rem]" @input="($event.target as HTMLInputElement).value = it.ini ?? ''" @keydown="aoTeclar" @keyup="posCursor" @click="posCursor" />
          </label>
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold">Sequência:</span>
            <span
              v-for="(q, i) in it.seq"
              :key="i"
              class="inline-flex min-h-10 items-center rounded-lg border-2 border-ink px-3 font-bold"
              :class="i < s.seqPos ? 'bg-pri text-pri-txt' : 'bg-superficie'"
            >{{ q === 'Ctrl+Z' ? 'Ctrl + Z' : q }}{{ i < s.seqPos ? ' · feito' : '' }}</span>
          </div>
        </div>

        <!-- Copiar e colar -->
        <div v-else-if="k === 'copiar'" class="flex flex-col gap-3.5">
          <label class="flex flex-col gap-1.5 font-bold">
            <span>Receita (selecione a última frase)</span>
            <textarea :value="it.receita" data-foco readonly rows="3" class="entrada resize-none border-sec-forte bg-sec-claro" @keydown="aoTeclar" />
          </label>
          <label class="flex flex-col gap-1.5 font-bold">
            <span>Cole aqui</span>
            <input v-model="s.valor" type="text" autocomplete="off" class="entrada min-h-[60px] text-[1.2rem]" :class="bordaCampo" @input="s.res = null" @keydown="aoTeclar" />
          </label>
        </div>

        <!-- Escolha -->
        <div v-else-if="k === 'escolha'" class="flex flex-col gap-3">
          <p class="text-[1.15rem] font-bold">{{ it.pergunta }}</p>
          <div role="group" aria-label="Opções" class="flex flex-wrap gap-2.5">
            <button v-for="(o, i) in OPCOES" :key="o.s" type="button" :data-foco="i === 0 ? '' : undefined" class="btn min-h-24 min-w-36 flex-col gap-1 text-[0.9rem]" @click="escolher(o.s)">
              <span aria-hidden="true" class="text-[1.8rem] leading-none">{{ o.s }}</span><span>{{ o.n }}</span>
            </button>
          </div>
        </div>

        <div v-if="s.res" role="status" class="retorno" :class="ok ? 'retorno-ok' : 'retorno-erro'">
          <Icone :nome="ok ? 'ok' : 'alerta'" :tamanho="30" :traco="2.4" :cor="ok ? 'var(--color-pri)' : 'var(--color-sec-ink)'" />
          <span><strong class="block">{{ ok ? 'Muito bem!' : 'Quase lá!' }}</strong>{{ s.msg }}</span>
        </div>

        <div class="flex flex-wrap justify-between gap-2.5 pt-1">
          <div class="flex flex-wrap gap-2.5">
            <button type="button" class="btn text-[0.95rem]" @click="voltar"><Icone nome="voltar" :tamanho="20" :traco="2.6" /> {{ s.passo === 0 ? (anterior ? 'Lição anterior' : 'Minhas trilhas') : 'Voltar' }}</button>
            <button type="button" class="btn text-[0.95rem]" @click="ir(s.li, s.passo)"><Icone nome="repetir" :tamanho="20" :traco="2.4" /> Recomeçar exercício</button>
          </div>
          <button v-if="!ok && !['esc', 'teclas', 'escolha'].includes(k)" type="button" class="btn btn-lilas" @click="conferir">Conferir</button>
          <button v-if="ok" type="button" class="btn btn-pri" @click="avancar">Próximo <Icone nome="seta" :traco="2.6" /></button>
        </div>
      </section>

      <!-- Conclusão -->
      <section v-else-if="k === 'fim'" aria-labelledby="fim-t" class="flex flex-wrap items-center gap-6 rounded-[18px] border-[3px] border-ink bg-sec-suave p-8">
        <svg aria-hidden="true" width="120" height="120" viewBox="0 0 120 120" class="shrink-0"><circle cx="60" cy="60" r="54" fill="#A58BDD" stroke="#14213D" stroke-width="4" /><path d="m36 62 16 16 32-34" fill="none" stroke="#14213D" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <div class="flex min-w-0 flex-[1_1_360px] flex-col gap-3">
          <span class="font-bold text-sec-ink">Lição {{ l.id }} concluída</span>
          <h1 id="fim-t" class="text-[1.7rem] leading-tight font-bold">{{ l.fim }}</h1>
          <div class="flex flex-wrap gap-2.5 pt-1.5">
            <button v-if="s.li + 1 < LICOES.length" type="button" class="btn btn-pri btn-g" data-foco @click="ir(s.li + 1, 0)">Próxima lição: {{ LICOES[s.li + 1].id }} {{ LICOES[s.li + 1].nome }}</button>
            <RouterLink v-else-if="l.id === '4.2'" to="/aula/4.3" class="btn btn-pri btn-g" data-foco>Próxima lição: 4.3 Escrevendo frases</RouterLink>
            <button type="button" class="btn btn-g" @click="ir(s.li, 0)">Fazer de novo</button>
            <button type="button" class="btn btn-g" @click="router.push(anterior?.rota ?? '/trilhas')"><Icone nome="voltar" :tamanho="20" :traco="2.6" /> {{ anterior ? 'Lição anterior' : 'Minhas trilhas' }}</button>
          </div>
        </div>
      </section>

      <TecladoAbnt2 v-if="k !== 'fim'" :destaques="dica" :ultima="s.ult" :legenda="legenda" />
    </div>
  </div>
</template>
