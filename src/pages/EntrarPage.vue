<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import Icone from '@/components/Icone.vue';
import CampoSenha from '@/components/CampoSenha.vue';
import LayoutAcesso from '@/components/LayoutAcesso.vue';
import { emailValido, useConta } from '@/composables/useConta';

const { entrar } = useConta();
const email = ref('');
const senha = ref('');
const tentou = ref(false);
const recusado = ref(false);
const enviando = ref(false);
const entrou = ref(false);

const erroEmail = computed(() => tentou.value && !emailValido(email.value));
const erroSenha = computed(() => tentou.value && !senha.value);
const resumo = computed(() => {
  if (recusado.value) return 'O e-mail ou a senha não conferem. Confira e tente de novo, ou use “Esqueci minha senha”.';
  if (erroEmail.value && erroSenha.value) return 'Escreva seu e-mail e sua senha para entrar.';
  if (erroEmail.value) return 'Confira o e-mail: parece que falta alguma parte.';
  if (erroSenha.value) return 'Escreva sua senha para entrar.';
  return '';
});

async function enviar() {
  tentou.value = true;
  recusado.value = false;
  if (!emailValido(email.value) || !senha.value) return;
  enviando.value = true;
  const ok = await entrar(email.value, senha.value);
  enviando.value = false;
  if (ok) entrou.value = true;
  else recusado.value = true;
}
</script>

<template>
  <LayoutAcesso>
    <template v-if="!entrou">
      <div class="flex flex-col gap-1.5">
        <h1 class="text-[2rem] leading-tight font-bold">Entrar</h1>
        <p>Use o e-mail e a senha que você cadastrou.</p>
      </div>

      <div v-if="resumo" role="alert" class="retorno retorno-erro">
        <Icone nome="alerta" :tamanho="26" :traco="2.4" cor="var(--color-sec-ink)" class="mt-0.5" />
        <span><strong class="block">Falta um detalhe</strong>{{ resumo }}</span>
      </div>

      <form class="flex flex-col gap-5" novalidate @submit.prevent="enviar">
        <div class="flex flex-col gap-1.5">
          <label for="ent-email" class="font-bold">E-mail</label>
          <input id="ent-email" v-model="email" type="email" autocomplete="email" placeholder="maria@exemplo.com" class="entrada" :aria-invalid="erroEmail" aria-describedby="ent-email-erro" />
          <span v-if="erroEmail" id="ent-email-erro" class="text-[0.85rem] font-bold text-sec-ink">Escreva seu e-mail completo, por exemplo: maria@exemplo.com</span>
        </div>

        <CampoSenha id="ent-senha" v-model="senha" rotulo="Senha" autocomplete="current-password" :invalido="erroSenha" descricao="ent-senha-erro">
          <template #topo>
            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <label for="ent-senha" class="font-bold">Senha</label>
              <RouterLink to="/esqueci-a-senha" class="py-1.5 text-[0.9rem] font-bold">Esqueci minha senha</RouterLink>
            </div>
          </template>
          <span v-if="erroSenha" id="ent-senha-erro" class="text-[0.85rem] font-bold text-sec-ink">Escreva sua senha.</span>
        </CampoSenha>

        <button type="submit" class="btn btn-pri btn-g" :disabled="enviando">{{ enviando ? 'Entrando…' : 'Entrar' }} <Icone nome="seta" :tamanho="24" :traco="2.6" /></button>
      </form>

      <p class="flex flex-wrap items-center gap-x-3 gap-y-2 border-t-2 border-borda-suave pt-4">
        <span>Ainda não tem acesso?</span>
        <RouterLink to="/cadastro" class="py-1.5 font-bold">Criar meu acesso</RouterLink>
      </p>
    </template>

    <div v-else role="status" class="flex flex-col items-start gap-4">
      <svg aria-hidden="true" width="88" height="88" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="#A58BDD" stroke="#14213D" stroke-width="4" /><path d="m36 62 16 16 32-34" fill="none" stroke="#14213D" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" /></svg>
      <h1 class="text-[1.8rem] leading-tight font-bold">Que bom te ver de novo!</h1>
      <p>Você entrou na sua conta. Seu progresso e seus módulos estão todos aqui.</p>
      <RouterLink to="/painel" class="btn btn-pri btn-g">Ir para o meu painel <Icone nome="seta" :tamanho="24" :traco="2.6" /></RouterLink>
    </div>

    <template #lado>
      <div class="card-destaque flex flex-col gap-3">
        <h2 class="text-[1.3rem] font-bold">Para que serve entrar?</h2>
        <ul class="flex list-disc flex-col gap-1.5 pl-5">
          <li>Continuar de onde parou, em qualquer computador.</li>
          <li>Usar os módulos extras que você comprou.</li>
          <li>Guardar suas conquistas.</li>
        </ul>
        <p class="text-[0.9rem]">Não quer entrar agora? Tudo bem. As trilhas básicas funcionam sem conta.</p>
      </div>
      <div class="card flex items-start gap-3.5 border-pri">
        <Icone nome="escudo" :tamanho="32" cor="var(--color-pri)" />
        <div class="flex flex-col gap-1 text-[0.9rem]">
          <strong class="text-[1rem]">Sua senha é só sua</strong>
          <span>Nunca pedimos sua senha por telefone, WhatsApp ou e-mail. Se alguém pedir, é golpe.</span>
        </div>
      </div>
    </template>
  </LayoutAcesso>
</template>
