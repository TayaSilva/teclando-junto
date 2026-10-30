<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import Icone from '@/components/Icone.vue';
import CampoSenha from '@/components/CampoSenha.vue';
import LayoutAcesso from '@/components/LayoutAcesso.vue';
import { emailValido, regrasSenha, useConta } from '@/composables/useConta';
import { useProgresso } from '@/composables/useProgresso';

const { cadastrar, primeiroNome } = useConta();
const progresso = useProgresso();

const nome = ref('');
const email = ref(progresso.dados.email);
const senha = ref('');
const conf = ref('');
const aceite = ref(false);
const tentou = ref(false);
const enviando = ref(false);
const criou = ref(false);
const falhou = ref(false);

const regras = computed(() => regrasSenha(senha.value));
const senhaOk = computed(() => regras.value.tamanho && regras.value.letraENumero);
const confOk = computed(() => conf.value.length > 0 && conf.value === senha.value);
const erroEmail = computed(() => tentou.value && !emailValido(email.value));
const erroSenha = computed(() => tentou.value && !senhaOk.value);
const erroConf = computed(() => tentou.value && !confOk.value);
const erroAceite = computed(() => tentou.value && !aceite.value);
const temErro = computed(() => erroEmail.value || erroSenha.value || erroConf.value || erroAceite.value);
const msgConf = computed(() => (conf.value ? (confOk.value ? 'As duas senhas estão iguais.' : 'As duas senhas ainda estão diferentes.') : erroConf.value ? 'Escreva a mesma senha mais uma vez.' : ''));

async function criar() {
  tentou.value = true;
  falhou.value = false;
  if (temErro.value) return;
  enviando.value = true;
  const ok = await cadastrar(nome.value, email.value, senha.value);
  enviando.value = false;
  if (ok) {
    progresso.salvarEmail(email.value.trim());
    criou.value = true;
  } else falhou.value = true;
}
</script>

<template>
  <LayoutAcesso>
    <template v-if="!criou">
      <div class="flex flex-col gap-1.5">
        <h1 class="text-[2rem] leading-tight font-bold">Criar meu acesso</h1>
        <p>São só quatro campos. Vá com calma: nada se perde se você parar no meio.</p>
      </div>

      <div v-if="temErro || falhou" role="alert" class="retorno retorno-erro">
        <Icone nome="alerta" :tamanho="26" :traco="2.4" cor="var(--color-sec-ink)" class="mt-0.5" />
        <span><strong class="block">Falta pouco</strong>{{ falhou ? 'Não conseguimos criar o acesso agora. Pode ser que este e-mail já tenha cadastro: tente Entrar.' : 'Confira os campos marcados em roxo.' }}</span>
      </div>

      <form class="flex flex-col gap-5" novalidate @submit.prevent="criar">
        <div class="flex flex-col gap-1.5">
          <label for="cad-nome" class="font-bold">Como podemos te chamar? <span class="font-normal">(opcional)</span></label>
          <input id="cad-nome" v-model="nome" type="text" autocomplete="given-name" placeholder="Por exemplo: Dona Maria" class="entrada" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="cad-email" class="font-bold">E-mail</label>
          <span id="cad-email-ajuda" class="text-[0.85rem]">Use o e-mail que você abre no dia a dia. É com ele que você vai entrar.</span>
          <input id="cad-email" v-model="email" type="email" autocomplete="email" placeholder="maria@exemplo.com" class="entrada" :aria-invalid="erroEmail" aria-describedby="cad-email-ajuda cad-email-erro" />
          <span v-if="erroEmail" id="cad-email-erro" class="text-[0.85rem] font-bold text-sec-ink">Escreva seu e-mail completo, por exemplo: maria@exemplo.com</span>
        </div>

        <CampoSenha id="cad-senha" v-model="senha" rotulo="Crie uma senha" autocomplete="new-password" :invalido="erroSenha" descricao="cad-regras">
          <ul id="cad-regras" aria-live="polite" class="mt-1 flex list-none flex-col gap-1.5 p-0 text-[0.9rem]">
            <li v-for="r in [{ ok: regras.tamanho, t: 'Pelo menos 8 letras ou números' }, { ok: regras.letraENumero, t: 'Pelo menos uma letra e um número' }]" :key="r.t" class="flex items-center gap-2">
              <span aria-hidden="true" class="grid size-7 shrink-0 place-items-center rounded-full border-2 border-ink font-bold" :class="r.ok ? 'bg-pri text-pri-txt' : 'bg-superficie'">{{ r.ok ? '✓' : '•' }}</span>
              <span>{{ r.t }} <strong v-if="r.ok">(feito)</strong></span>
            </li>
          </ul>
        </CampoSenha>

        <CampoSenha id="cad-conf" v-model="conf" rotulo="Escreva a senha de novo" autocomplete="new-password" :invalido="erroConf" descricao="cad-conf-msg">
          <span v-if="msgConf" id="cad-conf-msg" class="text-[0.85rem] font-bold" :class="confOk ? 'text-pri-ink' : 'text-sec-ink'">{{ msgConf }}</span>
        </CampoSenha>

        <label class="flex cursor-pointer items-start gap-3 rounded-[14px] bg-fundo px-4 py-3.5" :class="erroAceite ? 'border-[3px] border-sec' : 'border-2 border-borda'">
          <input v-model="aceite" type="checkbox" class="mt-0.5 size-7 shrink-0 accent-pri" />
          <span class="text-[0.9rem]">Li e concordo com os <a href="#termos">Termos de uso</a> e a <a href="#privacidade">Política de privacidade</a>.</span>
        </label>

        <button type="submit" class="btn btn-pri btn-g" :disabled="enviando">{{ enviando ? 'Criando…' : 'Criar meu acesso' }}</button>
      </form>

      <p class="flex flex-wrap items-center gap-x-3 gap-y-2 border-t-2 border-borda-suave pt-4">
        <span>Já tem acesso?</span>
        <RouterLink to="/entrar" class="py-1.5 font-bold">Entrar</RouterLink>
      </p>
    </template>

    <div v-else role="status" class="flex flex-col items-start gap-4">
      <svg aria-hidden="true" width="88" height="88" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="#A58BDD" stroke="#14213D" stroke-width="4" /><path d="m36 62 16 16 32-34" fill="none" stroke="#14213D" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" /></svg>
      <h1 class="text-[1.8rem] leading-tight font-bold">{{ primeiroNome ? `Pronto, ${primeiroNome}!` : 'Pronto!' }}</h1>
      <p>Seu acesso foi criado. O progresso que você já fez continua guardado.</p>
      <p class="text-[0.9rem]">Mandamos uma mensagem para <strong>{{ email }}</strong> para confirmar o seu e-mail. Abra a mensagem e clique no botão que está nela.</p>
      <RouterLink to="/painel" class="btn btn-pri btn-g">Ir para o meu painel <Icone nome="seta" :tamanho="24" :traco="2.6" /></RouterLink>
    </div>

    <template #lado>
      <div class="card-destaque flex flex-col gap-3">
        <h2 class="text-[1.3rem] font-bold">Com um acesso você pode</h2>
        <ul class="flex list-disc flex-col gap-1.5 pl-5">
          <li>Continuar de onde parou, em qualquer computador.</li>
          <li>Comprar e usar os módulos extras.</li>
          <li>Não perder o progresso se o navegador for limpo.</li>
        </ul>
      </div>
      <div class="flex flex-col gap-2 rounded-[18px] border-2 border-dashed border-sec bg-sec-claro p-6 text-[0.9rem]">
        <strong class="text-[1rem]">Dica para uma senha fácil de lembrar</strong>
        <span>Junte três palavras que façam sentido só para você e um número. Por exemplo: uma comida, um lugar e um bicho.</span>
        <span>Evite datas de aniversário e números de documento.</span>
      </div>
      <div class="card flex flex-col gap-1.5 text-[0.9rem]">
        <strong class="text-[1rem]">Seus dados</strong>
        <span>Pedimos só o necessário para criar o acesso: o e-mail e a senha. O nome é opcional.</span>
      </div>
    </template>
  </LayoutAcesso>
</template>
