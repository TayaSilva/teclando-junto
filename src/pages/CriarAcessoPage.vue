<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import Icone from '@/components/Icone.vue';
import { useProgresso } from '@/composables/useProgresso';

// Criação de acesso simplificada. O envio para o servidor (link de entrada
// por e-mail, sem senha) está marcado como TODO: veja o README.
const progresso = useProgresso();
const email = ref(progresso.dados.email);
const erro = ref(false);
const pronto = ref(false);
const valido = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));

function enviar() {
  if (!valido.value) {
    erro.value = true;
    return;
  }
  // TODO: POST /acesso no servidor, que envia o link de entrada para o e-mail.
  progresso.salvarEmail(email.value.trim());
  pronto.value = true;
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-[720px] flex-col gap-6 px-4 sm:px-6 pt-2 pb-16">
    <h1 class="text-[2.2rem] leading-tight font-bold">Criar meu acesso</h1>

    <template v-if="!pronto">
      <p class="text-[1.05rem]">Com um acesso, seu progresso fica guardado e você pode continuar em outro computador. Não precisa de senha: mandamos um link de entrada para o seu e-mail.</p>
      <form class="card flex flex-col gap-4" novalidate @submit.prevent="enviar">
        <label class="flex flex-col gap-1 font-bold">
          <span>Seu e-mail</span>
          <span class="text-[0.85rem] font-normal">Escreva o e-mail que você usa no dia a dia.</span>
          <input v-model="email" type="email" autocomplete="email" placeholder="maria@exemplo.com" class="entrada" :aria-invalid="erro" aria-describedby="erro-acesso" @input="erro = false" />
          <span v-if="erro" id="erro-acesso" class="text-[0.9rem] font-bold text-sec-ink">Escreva seu e-mail para continuar, por exemplo: maria@exemplo.com</span>
        </label>
        <div class="flex flex-wrap-reverse justify-between gap-3">
          <RouterLink to="/painel" class="btn btn-g">Agora não</RouterLink>
          <button type="submit" class="btn btn-pri btn-g">Criar meu acesso</button>
        </div>
      </form>
    </template>

    <div v-else role="status" class="retorno retorno-ok flex-col gap-2">
      <span class="flex items-center gap-2"><Icone nome="ok" :tamanho="30" cor="var(--color-pri)" /><strong class="text-[1.2rem]">Pronto!</strong></span>
      <p>Mandamos um link de entrada para <strong>{{ email }}</strong>. Use esse link para entrar no site em outro computador.</p>
      <RouterLink to="/painel" class="btn btn-pri self-start">Voltar ao início</RouterLink>
    </div>
  </div>
</template>
