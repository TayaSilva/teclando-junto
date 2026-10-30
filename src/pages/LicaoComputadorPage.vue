<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import Icone from '@/components/Icone.vue';
import { useProgresso } from '@/composables/useProgresso';
import { usePreferencias } from '@/composables/usePreferencias';
import { proximoItem } from '@/data/cursos';

type Parte = 'gabinete' | 'monitor' | 'teclado' | 'mouse';
const { falar, parar, prefs } = usePreferencias();
const progresso = useProgresso();
const router = useRouter();

const ALVO: Parte = 'mouse';
const P: Record<Parte, { nome: string; titulo: string; x: number; y: number; w: number; h: number; onde: string; texto: string }> = {
  gabinete: { nome: 'gabinete', titulo: 'Gabinete', x: 30, y: 86, w: 150, h: 340, onde: 'a caixa alta à esquerda', texto: 'É a caixa onde fica o “cérebro” do computador. Nela ficam o botão de ligar e as portas USB, onde você conecta um pen drive ou outros aparelhos. O notebook não tem gabinete: tudo fica dentro dele.' },
  monitor: { nome: 'monitor', titulo: 'Monitor', x: 205, y: 26, w: 390, h: 306, onde: 'a tela grande no meio', texto: 'É a tela. Mostra tudo o que o computador está fazendo: textos, fotos, vídeos e as janelas dos programas.' },
  teclado: { nome: 'teclado', titulo: 'Teclado', x: 195, y: 340, w: 410, h: 92, onde: 'a peça comprida embaixo da tela', texto: 'Serve para escrever. Cada tecla tem uma letra, um número ou um símbolo. Você vai praticar bastante na Trilha 3.' },
  mouse: { nome: 'mouse', titulo: 'Mouse', x: 610, y: 300, w: 80, h: 140, onde: 'o objeto pequeno à direita do teclado', texto: 'Serve para apontar e escolher coisas na tela. Quando você mexe o mouse sobre a mesa, a setinha na tela se mexe junto.' },
};
const ORDEM: Parte[] = ['gabinete', 'monitor', 'teclado', 'mouse'];
const ETAPAS = ['Apresentação', 'Demonstração', 'Prática', 'Retorno', 'Conclusão'];

const escolha = ref<Parte | null>(null);
const dica = ref(false);
const acertou = computed(() => escolha.value === ALVO);
const exp = computed(() => (escolha.value ? P[escolha.value] : null));

function classeParte(k: Parte) {
  if (escolha.value === k) return acertou.value ? 'border-4 border-solid border-pri bg-pri/12' : 'border-4 border-solid border-sec bg-sec/10';
  if (dica.value && k === ALVO && !acertou.value) return 'border-4 border-dashed border-pri bg-pri/10';
  return 'border-[3px] border-dashed border-transparent hover:border-pri hover:bg-pri/5';
}

function escolher(k: Parte) {
  escolha.value = k;
  falar(k === ALVO ? `Isso mesmo! Esse é o ${P[ALVO].nome}.` : `Esse é o ${P[k].nome}. Tente de novo.`);
}

function continuar() {
  parar();
  progresso.concluir('computador-partes', 'As partes do computador');
  router.push(proximoItem('1.2')?.rota ?? '/painel');
}

function voltar() {
  parar();
  router.push('/aula/1.1');
}

const VELOCIDADES = [
  { v: 0, r: 'Mais devagar' },
  { v: 1, r: 'Normal' },
  { v: 2, r: 'Mais rápido' },
] as const;
</script>

<template>
  <div class="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-4 pt-2 pb-14 sm:px-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-col">
        <span class="text-[0.85rem]">Trilha 1 · Conhecendo o computador · lição 2 de 4</span>
        <h1 class="text-[1.5rem] leading-tight font-bold">As partes do computador</h1>
      </div>
      <RouterLink to="/trilhas" class="btn"><Icone nome="voltar" :traco="2.6" /> Minhas trilhas</RouterLink>
    </div>

    <nav aria-label="Etapas da lição">
      <p class="mb-2.5 font-bold">Etapa 3 de 5: Prática</p>
      <ol class="grid list-none gap-2 p-0 text-[0.85rem] [grid-template-columns:repeat(auto-fit,minmax(min(150px,100%),1fr))]">
        <li
          v-for="(e, i) in ETAPAS"
          :key="e"
          :aria-current="i === 2 ? 'step' : undefined"
          class="flex items-center gap-2 rounded-[10px] px-3 py-2.5"
          :class="i < 2 ? 'border-2 border-borda bg-superficie' : i === 2 ? 'border-2 border-pri bg-pri font-bold text-pri-txt' : 'border-2 border-dashed border-tracejado'"
        >
          <Icone v-if="i < 2" nome="ok" :tamanho="20" :traco="2.6" cor="var(--color-pri)" />{{ i + 1 }}. {{ e }}{{ i === 2 ? ' (agora)' : '' }}
        </li>
      </ol>
    </nav>

    <div class="flex flex-wrap items-start gap-6">
      <section aria-labelledby="img-t" class="card flex min-w-0 flex-[3_1_640px] flex-col gap-4">
        <h2 id="img-t" class="text-[1.35rem] font-bold">Encontre o {{ P[ALVO].nome }} na imagem e clique nele.</h2>
        <p class="text-[0.95rem]">Cada parte tem um número. Se clicar na parte errada, sem problema: você pode tentar quantas vezes quiser.</p>
        <div class="rounded-xl bg-[#EEF3F5]">
          <div class="relative mx-auto aspect-[720/460] w-full max-w-[720px]">
            <svg role="img" aria-label="Ilustração de um computador de mesa com gabinete, monitor, teclado e mouse" viewBox="0 0 720 460" class="absolute inset-0 h-full w-full">
              <rect x="0" y="430" width="720" height="30" fill="#D5DEE2" />
              <rect x="40" y="96" width="130" height="320" rx="10" fill="#FFFFFF" stroke="#14213D" stroke-width="5" />
              <circle cx="105" cy="140" r="16" fill="none" stroke="#14213D" stroke-width="4" />
              <path d="M105 130v10" stroke="#14213D" stroke-width="4" stroke-linecap="round" />
              <rect x="78" y="190" width="22" height="10" rx="2" fill="#14213D" />
              <rect x="110" y="190" width="22" height="10" rx="2" fill="#14213D" />
              <path d="M60 250h90M60 270h90M60 290h90" stroke="#B9C4CC" stroke-width="4" />
              <rect x="215" y="36" width="370" height="240" rx="12" fill="#FFFFFF" stroke="#14213D" stroke-width="5" />
              <rect x="233" y="54" width="334" height="200" rx="4" fill="#B7D6DC" />
              <rect x="255" y="76" width="120" height="14" rx="7" fill="#0B5D6B" />
              <rect x="255" y="104" width="250" height="10" rx="5" fill="#FFFFFF" />
              <rect x="255" y="124" width="210" height="10" rx="5" fill="#FFFFFF" />
              <rect x="255" y="190" width="90" height="34" rx="8" fill="#6D4AAE" />
              <path d="M375 276h50l10 40h-70z" fill="#14213D" />
              <rect x="335" y="314" width="130" height="12" rx="6" fill="#14213D" />
              <rect x="205" y="350" width="390" height="72" rx="10" fill="#FFFFFF" stroke="#14213D" stroke-width="5" />
              <path d="M225 368h350M225 386h350M225 404h350" stroke="#B9C4CC" stroke-width="10" stroke-dasharray="20 6" />
              <rect x="620" y="346" width="56" height="86" rx="28" fill="#FFFFFF" stroke="#14213D" stroke-width="5" />
              <path d="M648 346v28M620 374h56" stroke="#14213D" stroke-width="4" />
              <path d="M648 346c0-24 -20-30 -40-14" fill="none" stroke="#14213D" stroke-width="4" stroke-linecap="round" />
            </svg>
            <button
              v-for="(k, i) in ORDEM"
              :key="k"
              type="button"
              class="absolute rounded-[14px] bg-transparent p-0"
              :class="classeParte(k)"
              :style="{ left: `${(P[k].x / 720) * 100}%`, top: `${(P[k].y / 460) * 100}%`, width: `${(P[k].w / 720) * 100}%`, height: `${(P[k].h / 460) * 100}%` }"
              :aria-label="`Parte ${i + 1}: ${P[k].onde}`"
              @click="escolher(k)"
            >
              <span
                aria-hidden="true"
                class="absolute -top-3.5 -left-3.5 grid size-10 place-items-center rounded-full border-[3px] border-white text-[20px] font-bold text-white"
                :class="escolha === k ? (acertou ? 'bg-[#0B5D6B]' : 'bg-[#6D4AAE]') : 'bg-[#14213D]'"
              >{{ i + 1 }}</span>
            </button>
          </div>
        </div>
        <button type="button" class="btn self-start" @click="dica = !dica"><Icone nome="lampada" /> {{ dica ? 'Esconder a dica' : 'Mostrar uma dica' }}</button>
      </section>

      <aside aria-labelledby="exp-t" class="flex min-w-0 flex-[2_1_380px] flex-col gap-4">
        <div role="status" aria-live="polite" class="retorno flex-col gap-1" :class="!escolha ? 'retorno-neutro' : acertou ? 'retorno-ok' : 'retorno-erro'">
          <strong class="text-[1.1rem]">{{ !escolha ? 'Sua vez' : acertou ? 'Isso mesmo!' : `Esse é o ${P[escolha].nome}.` }}</strong>
          <span>{{ !escolha ? 'Clique em uma das partes numeradas da imagem.' : acertou ? `Esse é o ${P[ALVO].nome}. Quando quiser, clique em Continuar.` : `Ainda não é o ${P[ALVO].nome}. Dica: é ${P[ALVO].onde}. Tente de novo.` }}</span>
        </div>

        <section class="card flex flex-col gap-3.5">
          <h2 id="exp-t" class="text-[1.35rem] font-bold">{{ exp ? exp.titulo : 'O que é cada parte?' }}</h2>
          <p>{{ exp ? exp.texto : 'Clique em uma parte da imagem e a explicação aparece aqui. Você também pode ouvir.' }}</p>
          <div class="flex flex-wrap gap-2.5">
            <button type="button" class="btn btn-pri" @click="falar(exp ? `${exp.titulo}. ${exp.texto}` : 'Clique em uma parte da imagem para ouvir a explicação.')"><Icone nome="play" /> Ouvir explicação</button>
            <button type="button" class="btn" @click="parar()"><Icone nome="pausa" /> Pausar</button>
          </div>
          <div role="group" aria-label="Velocidade da narração" class="flex flex-wrap items-center gap-2 border-t border-borda-suave pt-1">
            <span class="w-full pt-2.5 text-[0.9rem] font-bold">Velocidade da voz</span>
            <button v-for="v in VELOCIDADES" :key="v.v" type="button" class="btn text-[0.85rem]" :aria-pressed="prefs.velocidade === v.v" @click="prefs.velocidade = v.v">{{ v.r }}</button>
          </div>
        </section>

        <div class="flex flex-wrap justify-between gap-2.5">
          <button type="button" class="btn" @click="voltar"><Icone nome="voltar" :traco="2.6" /> Lição anterior</button>
          <button type="button" class="btn" @click="escolha = null; dica = false"><Icone nome="repetir" :traco="2.4" /> Refazer exercício</button>
          <button v-if="acertou" type="button" class="btn btn-pri" @click="continuar">Continuar <Icone nome="seta" :traco="2.6" /></button>
        </div>
      </aside>
    </div>
  </div>
</template>
