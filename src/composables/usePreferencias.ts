import { computed, reactive, ref, watch } from 'vue';
import { ler, gravar } from '@/lib/armazenamento';

export type Tema = 'claro' | 'escuro' | 'auto';

export interface Preferencias {
  tamanho: 1 | 2 | 3;
  tema: Tema;
  altoContraste: boolean;
  narracao: boolean;
  velocidade: 0 | 1 | 2;
}

const PADRAO: Preferencias = { tamanho: 1, tema: 'auto', altoContraste: false, narracao: true, velocidade: 1 };
const TAXAS = [0.8, 1, 1.2];

// Estado único compartilhado por toda a aplicação.
const prefs = reactive<Preferencias>({ ...PADRAO, ...ler<Partial<Preferencias>>('tj:preferencias', {}) });

// "Igual ao computador": segue a preferência de tema do sistema.
const consulta = window.matchMedia?.('(prefers-color-scheme: dark)');
const sistemaEscuro = ref(!!consulta?.matches);
consulta?.addEventListener?.('change', (e) => (sistemaEscuro.value = e.matches));

const temaEscuro = computed(() => prefs.tema === 'escuro' || (prefs.tema === 'auto' && sistemaEscuro.value));

function aplicar() {
  const html = document.documentElement;
  html.dataset.tamanho = String(prefs.tamanho);
  html.dataset.contraste = prefs.altoContraste ? 'alto' : 'normal';
  html.dataset.tema = temaEscuro.value ? 'escuro' : 'claro';
  html.style.colorScheme = prefs.altoContraste || temaEscuro.value ? 'dark' : 'light';
}

watch(
  [prefs, temaEscuro],
  () => {
    gravar('tj:preferencias', { ...prefs });
    aplicar();
  },
  { deep: true, immediate: true },
);

// Narração pela voz do navegador (Web Speech API). Para o conteúdo definitivo,
// o ideal são gravações revisadas; isto é apoio.
function falar(texto: string) {
  if (!prefs.narracao || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'pt-BR';
  u.rate = TAXAS[prefs.velocidade] ?? 1;
  window.speechSynthesis.speak(u);
}

function parar() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

export function usePreferencias() {
  return { prefs, temaEscuro, falar, parar };
}
