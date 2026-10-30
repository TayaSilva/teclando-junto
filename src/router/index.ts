import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: () => import('@/pages/InicioPage.vue'), meta: { titulo: 'Aprenda a usar o computador no seu ritmo' } },
    { path: '/painel', name: 'painel', component: () => import('@/pages/PainelPage.vue'), meta: { titulo: 'Início' } },
    { path: '/trilhas', name: 'trilhas', component: () => import('@/pages/TrilhasPage.vue'), meta: { titulo: 'Minhas trilhas' } },
    { path: '/trilhas/computador/partes', name: 'licao-computador', component: () => import('@/pages/LicaoComputadorPage.vue'), meta: { titulo: 'As partes do computador' } },
    { path: '/aula/:id', name: 'aula', component: () => import('@/pages/LicaoPage.vue'), meta: { titulo: 'Aula' } },
    { path: '/trilhas/teclado', name: 'aulas-teclado', component: () => import('@/pages/AulasTecladoPage.vue'), meta: { titulo: 'Teclado e digitação' } },
    { path: '/simuladores', name: 'simuladores', component: () => import('@/pages/SimuladoresPage.vue'), meta: { titulo: 'Simuladores' } },
    { path: '/ajuda', name: 'ajuda', component: () => import('@/pages/AjudaPage.vue'), meta: { titulo: 'Ajuda' } },
    { path: '/extras', name: 'extras', component: () => import('@/pages/ExtrasPage.vue'), meta: { titulo: 'Módulos extras' } },
    { path: '/entrar', name: 'entrar', component: () => import('@/pages/EntrarPage.vue'), meta: { titulo: 'Entrar' } },
    { path: '/cadastro', name: 'cadastro', component: () => import('@/pages/CadastroPage.vue'), meta: { titulo: 'Criar meu acesso' } },
    { path: '/esqueci-a-senha', name: 'esqueci-a-senha', component: () => import('@/pages/EsqueciSenhaPage.vue'), meta: { titulo: 'Esqueci a senha' } },
    { path: '/acesso', redirect: '/cadastro' },
    { path: '/:caminho(.*)*', name: 'nao-encontrada', component: () => import('@/pages/NaoEncontradaPage.vue'), meta: { titulo: 'Página não encontrada' } },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const t = to.meta.titulo as string | undefined;
  document.title = t ? `${t} · TJ Teclando Juntos` : 'TJ Teclando Juntos';
});

export default router;
