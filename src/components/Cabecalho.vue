<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import Icone from './Icone.vue';
import Simbolo from './Simbolo.vue';
import ConfigModal from './ConfigModal.vue';
import { usePreferencias } from '@/composables/usePreferencias';
import { useConta } from '@/composables/useConta';
import { ACESSO_DISPONIVEL } from '@/config/funcionalidades';

const { conta, sair } = useConta();

const config = ref(false);
const menu = ref(false);
const caixaMenu = ref<HTMLElement | null>(null);

// Fecha o menu ao clicar fora ou apertar Esc (devolvendo o foco ao botão).
function fora(e: Event) {
  if (menu.value && !caixaMenu.value?.contains(e.target as Node)) menu.value = false;
}
function esc(e: KeyboardEvent) {
  if (e.key === 'Escape' && menu.value) { menu.value = false; document.getElementById('botao-menu')?.focus(); }
}
onMounted(() => { document.addEventListener('pointerdown', fora); document.addEventListener('keydown', esc); });
onBeforeUnmount(() => { document.removeEventListener('pointerdown', fora); document.removeEventListener('keydown', esc); });
const { prefs, temaEscuro } = usePreferencias();

const LINKS = [
  { para: '/painel', rotulo: 'Início', icone: 'inicio' },
  { para: '/trilhas', rotulo: 'Minhas trilhas', icone: 'lista' },
  { para: '/simuladores', rotulo: 'Simuladores', icone: 'monitor' },
  { para: '/ajuda', rotulo: 'Ajuda', icone: 'ajuda' },
];
</script>

<template>
  <header>
    <a class="pular" href="#conteudo">Pular para o conteúdo</a>
    <div class="container-tj flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-4">
      <RouterLink to="/" class="flex items-center gap-3 text-ink no-underline" aria-label="TJ Teclando Juntos, página inicial">
        <Simbolo :fundo="prefs.altoContraste ? '#000000' : temaEscuro ? '#0F1726' : '#F5F7F8'" :variante="prefs.altoContraste || temaEscuro ? 'escura' : 'clara'" />
        <span class="flex flex-col text-[1.2rem] leading-[0.95] font-bold">
          <span>Teclando</span>
          <span class="text-pri">Juntos</span>
        </span>
      </RouterLink>
      <nav aria-label="Principal" class="flex items-center gap-2">
        <button v-if="ACESSO_DISPONIVEL && conta.logado" type="button" class="btn" @click="sair">Sair</button>

        <div ref="caixaMenu" class="relative">
          <button id="botao-menu" type="button" class="btn btn-pri" aria-haspopup="true" aria-controls="menu-principal" :aria-expanded="menu" @click="menu = !menu">
            <Icone :nome="menu ? 'fechar' : 'lista'" :tamanho="22" :traco="2.4" /> Menu
          </button>
          <div v-if="menu" id="menu-principal" class="absolute right-0 z-50 mt-2 flex w-[min(260px,calc(100vw-28px))] flex-col gap-1 rounded-[14px] border-2 border-ink bg-superficie p-2 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
            <RouterLink v-for="l in LINKS" :key="l.para" :to="l.para" class="nav-link" active-class="ativo" @click="menu = false">
              <Icone :nome="l.icone" /> {{ l.rotulo }}
            </RouterLink>
            <button type="button" class="nav-link bg-transparent text-left" @click="menu = false; config = true">
              <Icone nome="engrenagem" /> Configurações
            </button>
          </div>
        </div>
      </nav>
    </div>
    <ConfigModal :aberto="config" @fechar="config = false" />
  </header>
</template>
