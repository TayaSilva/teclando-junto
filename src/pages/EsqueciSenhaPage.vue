<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Icone from '@/components/Icone.vue';
import LayoutAcesso from '@/components/LayoutAcesso.vue';
import { emailValido, useConta } from '@/composables/useConta';
import { ACESSO_DISPONIVEL } from '@/config/funcionalidades';

const { pedirNovaSenha } = useConta();
const email = ref('');
const erro = ref(false);
const enviou = ref(false);
const reenviado = ref(false);
const enviando = ref(false);

async function enviar() {
  if (!emailValido(email.value)) {
    erro.value = true;
    return;
  }
  enviando.value = true;
  await pedirNovaSenha(email.value.trim());
  enviando.value = false;
  enviou.value = true;
  reenviado.value = false;
}

async function reenviar() {
  await pedirNovaSenha(email.value.trim());
  reenviado.value = true;
}
</script>

<template>
  <LayoutAcesso>
    <template v-if="!enviou">
      <div class="flex flex-col gap-1.5">
        <h1 class="text-[2rem] leading-tight font-bold">Esqueceu a senha?</h1>
        <p>Acontece com todo mundo. Escreva o e-mail do seu acesso e mandamos um link para você criar uma senha nova.</p>
      </div>
      <form class="flex flex-col gap-5" novalidate @submit.prevent="enviar">
        <div class="flex flex-col gap-1.5">
          <label for="esq-email" class="font-bold">E-mail</label>
          <input id="esq-email" v-model="email" type="email" autocomplete="email" placeholder="maria@exemplo.com" class="entrada" :aria-invalid="erro" aria-describedby="esq-erro" @input="erro = false" />
          <span v-if="erro" id="esq-erro" role="alert" class="text-[0.85rem] font-bold text-sec-ink">Escreva seu e-mail completo, por exemplo: maria@exemplo.com</span>
        </div>
        <button type="submit" class="btn btn-pri btn-g" :disabled="enviando"><Icone nome="email" :tamanho="24" /> {{ enviando ? 'Mandando…' : 'Mandar o link' }}</button>
      </form>
      <p class="flex flex-wrap items-center gap-x-3 gap-y-2 border-t-2 border-borda-suave pt-4">
        <span>Lembrou a senha?</span>
        <RouterLink v-if="ACESSO_DISPONIVEL" to="/entrar" class="py-1.5 font-bold">Entrar</RouterLink>
      </p>
    </template>

    <div v-else role="status" class="flex flex-col items-start gap-4">
      <Icone nome="email" :tamanho="88" :traco="1.6" cor="var(--color-sec)" />
      <h1 class="text-[1.8rem] leading-tight font-bold">Confira seu e-mail</h1>
      <!-- A mensagem é a mesma exista ou não a conta, para não revelar quem tem cadastro. -->
      <p>Se existir um acesso com <strong>{{ email }}</strong>, mandamos para lá uma mensagem do TJ Teclando Juntos com o botão “Criar senha nova”.</p>
      <ol class="flex list-decimal flex-col gap-1.5 pl-6">
        <li>Abra o seu e-mail.</li>
        <li>Procure a mensagem do TJ Teclando Juntos.</li>
        <li>Clique no botão “Criar senha nova” e escolha a senha.</li>
      </ol>
      <div class="flex w-full flex-col gap-1.5 rounded-[14px] border-2 border-sec-forte bg-sec-claro px-4.5 py-4 text-[0.9rem]">
        <strong class="text-[1rem]">Não chegou?</strong>
        <span>Espere alguns minutos e olhe também a pasta “Spam” ou “Lixo eletrônico”.</span>
        <span>O link vale por pouco tempo. Se passar, é só pedir outro.</span>
      </div>
      <div class="flex flex-wrap gap-2.5">
        <button type="button" class="btn" @click="reenviar">{{ reenviado ? 'Mandamos de novo' : 'Mandar de novo' }}</button>
        <button type="button" class="btn" @click="enviou = false">Usar outro e-mail</button>
      </div>
      <RouterLink v-if="ACESSO_DISPONIVEL" to="/entrar" class="btn btn-pri btn-g">Voltar para Entrar</RouterLink>
    </div>

    <template #lado>
      <div class="card flex items-start gap-3.5 border-pri">
        <Icone nome="escudo" :tamanho="32" cor="var(--color-pri)" />
        <div class="flex flex-col gap-1 text-[0.9rem]">
          <strong class="text-[1rem]">Cuidado com mensagens falsas</strong>
          <span>Só troque a senha por um link que você mesmo pediu agora. Nunca pedimos sua senha por telefone, WhatsApp ou e-mail.</span>
        </div>
      </div>
      <div class="flex flex-col gap-2 rounded-[18px] border-2 border-dashed border-sec bg-sec-claro p-6 text-[0.9rem]">
        <strong class="text-[1rem]">Dica para não esquecer de novo</strong>
        <span>Junte três palavras que façam sentido só para você e um número. Se quiser, anote num caderno guardado em casa, longe do computador.</span>
      </div>
    </template>
  </LayoutAcesso>
</template>
