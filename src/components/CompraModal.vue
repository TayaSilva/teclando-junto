<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { RouterLink } from 'vue-router';
import BaseModal from './BaseModal.vue';
import Icone from './Icone.vue';
import { EXTRAS, PRECO_MODULO, PRECO_PACOTE, reais } from '@/data/trilhas';
import { useProgresso } from '@/composables/useProgresso';
import { iniciarPagamento, type MetodoPagamento } from '@/lib/pagamento';

const props = defineProps<{ aberto: boolean; tipoInicial: 'um' | 'todos'; moduloInicial: number }>();
const emit = defineEmits<{ fechar: [] }>();
const progresso = useProgresso();

const s = reactive({
  etapa: 'escolha' as 'escolha' | 'pagar' | 'pronto',
  tipo: 'um' as 'um' | 'todos',
  modulo: 0,
  metodo: 'pix' as MetodoPagamento,
  email: '',
  erroEmail: false,
  copiado: false,
  enviando: false,
  resultado: null as null | 'aprovado' | 'pendente',
  pix: null as null | { qrCodeBase64?: string; copiaECola?: string },
  erro: '',
});

watch(
  () => props.aberto,
  (a) => {
    if (!a) return;
    Object.assign(s, { etapa: 'escolha', tipo: props.tipoInicial, modulo: props.moduloInicial, erroEmail: false, copiado: false, enviando: false, resultado: null, pix: null, erro: '', email: progresso.dados.email });
  },
);

const SEM_DESCONTO = PRECO_MODULO * EXTRAS.length;
const total = computed(() => (s.tipo === 'um' ? PRECO_MODULO : PRECO_PACOTE));
const resumo = computed(() => (s.tipo === 'um' ? `Módulo “${EXTRAS[s.modulo].titulo}”` : 'O pacote com os 6 módulos extras'));
const emailOk = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim()));
const titulo = computed(() => (s.etapa === 'escolha' ? 'Escolha sua compra' : s.etapa === 'pagar' ? 'Pagamento' : s.resultado === 'pendente' ? 'Boleto gerado' : 'Tudo certo!'));
const passo = computed(() => (s.etapa === 'escolha' ? 'Passo 1 de 2' : s.etapa === 'pagar' ? 'Passo 2 de 2' : 'Compra concluída'));

const METODOS: { id: MetodoPagamento; nome: string; desc: string; tag?: string }[] = [
  { id: 'pix', nome: 'Pix', desc: 'Pague pelo aplicativo do seu banco. A liberação é na hora.', tag: 'Mais rápido' },
  { id: 'cartao', nome: 'Cartão de crédito', desc: 'Preencha os dados do cartão em um formulário seguro.' },
  { id: 'boleto', nome: 'Boleto', desc: 'Pague no banco ou na lotérica. A liberação pode levar até 3 dias úteis.' },
];

const botaoPagar = computed(() => (s.metodo === 'pix' ? (s.pix ? 'Já paguei' : 'Gerar o Pix') : s.metodo === 'cartao' ? `Pagar ${reais(total.value)}` : 'Gerar boleto'));

async function copiar() {
  try {
    await navigator.clipboard?.writeText(s.pix?.copiaECola ?? '');
  } catch {
    /* sem área de transferência */
  }
  s.copiado = true;
}

async function pagar() {
  if (!emailOk.value) {
    s.erroEmail = true;
    return;
  }
  progresso.salvarEmail(s.email.trim());
  s.erro = '';
  s.enviando = true;
  try {
    const r = await iniciarPagamento({
      tipo: s.tipo === 'um' ? 'modulo' : 'pacote',
      modulo: s.tipo === 'um' ? EXTRAS[s.modulo].n : undefined,
      metodo: s.metodo,
      email: s.email.trim(),
      valor: total.value,
      jaGerado: !!s.pix,
    });
    if (r.status === 'aguardando_pix') {
      s.pix = { qrCodeBase64: r.qrCodeBase64, copiaECola: r.copiaECola };
      return;
    }
    if (r.status === 'aguardando_pix_confirmacao') {
      s.erro = 'Ainda não recebemos a confirmação do Pix. Se você já pagou, espere um minutinho e tente de novo.';
      return;
    }
    s.resultado = r.status === 'pendente' ? 'pendente' : 'aprovado';
    progresso.registrarCompra({ tipo: s.tipo === 'um' ? 'modulo' : 'pacote', modulo: s.tipo === 'um' ? EXTRAS[s.modulo].n : undefined, metodo: s.metodo, status: s.resultado });
    s.etapa = 'pronto';
  } catch {
    s.erro = 'Não conseguimos falar com o sistema de pagamento agora. Nada foi cobrado. Tente de novo em alguns minutos.';
  } finally {
    s.enviando = false;
  }
}
</script>

<template>
  <BaseModal :aberto="aberto" :titulo="titulo" :sobretitulo="passo" @fechar="emit('fechar')">
    <!-- Passo 1: escolha -->
    <template v-if="s.etapa === 'escolha'">
      <fieldset class="m-0 flex flex-col gap-3 border-0 p-0">
        <legend class="mb-2 p-0 font-bold">O que você quer comprar?</legend>

        <div class="opcao flex-col" :class="{ sel: s.tipo === 'um' }">
          <label class="flex cursor-pointer items-start gap-3">
            <input v-model="s.tipo" type="radio" name="compra" value="um" class="size-7 shrink-0 accent-pri" />
            <span class="flex flex-col"><strong class="text-[1.1rem]">Só um módulo</strong><span>{{ reais(PRECO_MODULO) }}</span></span>
          </label>
          <label v-if="s.tipo === 'um'" class="flex w-full flex-col gap-1 pl-10 font-bold">
            <span class="text-[0.9rem]">Qual módulo?</span>
            <select v-model.number="s.modulo" class="entrada">
              <option v-for="(m, i) in EXTRAS" :key="m.n" :value="i">{{ m.titulo }}</option>
            </select>
          </label>
        </div>

        <label class="opcao" :class="{ sel: s.tipo === 'todos' }">
          <input v-model="s.tipo" type="radio" name="compra" value="todos" />
          <span class="flex flex-col gap-1">
            <strong class="text-[1.1rem]">Todos os 6 módulos extras</strong>
            <span>De <s>{{ reais(SEM_DESCONTO) }}</s> por <strong>{{ reais(PRECO_PACOTE) }}</strong></span>
          </span>
        </label>
      </fieldset>

      <div class="flex items-baseline justify-between gap-4 border-y-2 border-borda-suave py-3">
        <span class="font-bold">Total: {{ s.tipo === 'um' ? EXTRAS[s.modulo].titulo : '6 módulos extras' }}</span>
        <strong class="text-[1.5rem] whitespace-nowrap">{{ reais(total) }}</strong>
      </div>

      <p class="flex items-start gap-2 text-[0.9rem]">
        <Icone nome="cadeado" cor="var(--color-pri)" class="mt-0.5" />
        <span>No próximo passo você informa seu e-mail. Ele vira o seu acesso, para a compra ficar guardada e você usar os módulos em qualquer computador.</span>
      </p>

      <div class="flex flex-wrap-reverse justify-between gap-3">
        <button type="button" class="btn btn-g" @click="emit('fechar')">Cancelar</button>
        <button type="button" class="btn btn-pri btn-g" @click="s.etapa = 'pagar'">Continuar para o pagamento <Icone nome="seta" :traco="2.6" /></button>
      </div>
    </template>

    <!-- Passo 2: pagamento -->
    <template v-else-if="s.etapa === 'pagar'">
      <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-[14px] border-2 border-sec-forte bg-sec-suave px-4 py-3">
        <span><span class="block text-[0.85rem] font-bold text-sec-ink">Você está comprando</span><strong>{{ resumo }}</strong></span>
        <strong class="text-[1.5rem] whitespace-nowrap">{{ reais(total) }}</strong>
      </div>

      <label class="flex flex-col gap-1 font-bold">
        <span>Seu e-mail</span>
        <span class="text-[0.85rem] font-normal">Ele será o seu acesso ao site e é para onde mandamos o comprovante.</span>
        <input
          v-model="s.email"
          type="email"
          autocomplete="email"
          placeholder="maria@exemplo.com"
          class="entrada"
          :aria-invalid="s.erroEmail"
          aria-describedby="erro-email"
          data-foco-inicial
          @input="s.erroEmail = false"
        />
        <span v-if="s.erroEmail" id="erro-email" class="text-[0.9rem] font-bold text-sec-ink">Escreva seu e-mail para continuar, por exemplo: maria@exemplo.com</span>
      </label>

      <fieldset class="m-0 flex flex-col gap-2.5 border-0 p-0">
        <legend class="mb-2 p-0 font-bold">Como você quer pagar?</legend>
        <label v-for="m in METODOS" :key="m.id" class="opcao" :class="{ sel: s.metodo === m.id }">
          <input v-model="s.metodo" type="radio" name="metodo" :value="m.id" @change="s.pix = null; s.erro = ''" />
          <span class="flex min-w-0 flex-col">
            <span class="flex flex-wrap items-center gap-2"><strong class="text-[1.1rem]">{{ m.nome }}</strong><span v-if="m.tag" class="selo text-[0.75rem]">{{ m.tag }}</span></span>
            <span class="text-[0.9rem]">{{ m.desc }}</span>
          </span>
        </label>
      </fieldset>

      <div v-if="s.metodo === 'pix'" class="flex flex-wrap gap-5 rounded-[14px] border-2 border-borda bg-fundo p-4">
        <div class="grid size-40 shrink-0 place-items-center rounded-[10px] border-2 border-dashed border-tracejado bg-white p-2 text-center text-[0.8rem] text-[#14213D]">
          <img v-if="s.pix?.qrCodeBase64" :src="`data:image/png;base64,${s.pix.qrCodeBase64}`" alt="QR Code do Pix" class="size-full" />
          <span v-else>O QR Code aparece aqui quando você clicar em “Gerar o Pix”.</span>
        </div>
        <div class="flex min-w-0 flex-[1_1_260px] flex-col gap-2.5">
          <ol class="m-0 flex list-decimal flex-col gap-1 pl-5">
            <li>Abra o aplicativo do seu banco.</li>
            <li>Escolha Pix e depois “Ler QR Code” ou “Pix copia e cola”.</li>
            <li>Confira se o valor é <strong>{{ reais(total) }}</strong> antes de confirmar.</li>
          </ol>
          <template v-if="s.pix">
            <label class="flex flex-col gap-1 text-[0.9rem] font-bold">
              <span>Código Pix copia e cola</span>
              <input type="text" readonly :value="s.pix.copiaECola" class="entrada min-h-12 border-borda" />
            </label>
            <button type="button" class="btn self-start" @click="copiar"><Icone nome="copiar" /> {{ s.copiado ? 'Código copiado!' : 'Copiar código' }}</button>
            <span class="text-[0.85rem]">Depois de pagar no banco, volte aqui e clique em “Já paguei”.</span>
          </template>
        </div>
      </div>

      <div v-else-if="s.metodo === 'cartao'" class="flex flex-col gap-2 rounded-[14px] border-2 border-dashed border-tracejado bg-fundo p-4">
        <!-- Aqui entra o Card Payment Brick do Mercado Pago (ver README e src/lib/pagamento.ts). -->
        <div id="mp-cartao" class="flex flex-col gap-2">
          <strong>Formulário seguro do cartão</strong>
          <span class="text-[0.9rem]">O formulário do Mercado Pago aparece aqui, com número do cartão, validade, código de segurança e parcelas.</span>
          <span class="text-[0.9rem]">Os dados do cartão vão direto para o Mercado Pago. O TJ Teclando Juntos não vê nem guarda o número do seu cartão.</span>
        </div>
      </div>

      <div v-else class="flex flex-col gap-2 rounded-[14px] border-2 border-borda bg-fundo p-4">
        <label class="flex flex-col gap-1 font-bold">
          <span>CPF</span>
          <span class="text-[0.85rem] font-normal">O boleto precisa do CPF de quem vai pagar.</span>
          <input type="text" inputmode="numeric" autocomplete="off" placeholder="000.000.000-00" class="entrada" />
        </label>
        <span class="text-[0.9rem]">Você pode pagar no banco, na lotérica ou pelo aplicativo. A confirmação pode levar até 3 dias úteis, e os módulos são liberados logo depois.</span>
      </div>

      <div class="flex items-start gap-3 rounded-[14px] border-2 border-pri bg-superficie px-4 py-3">
        <Icone nome="escudo" :tamanho="28" cor="var(--color-pri)" class="mt-0.5" />
        <div class="flex flex-col gap-0.5 text-[0.9rem]">
          <strong>Para pagar com segurança</strong>
          <span>Confira sempre o valor antes de confirmar.</span>
          <span>Nunca pedimos a senha do seu banco.</span>
          <span>Não mandamos cobranças por WhatsApp nem por ligação.</span>
        </div>
      </div>

      <p v-if="s.erro" role="alert" class="retorno retorno-erro text-[0.95rem]">{{ s.erro }}</p>

      <div class="flex flex-wrap-reverse items-center justify-between gap-3">
        <button type="button" class="btn btn-g" @click="s.etapa = 'escolha'; s.erroEmail = false">Voltar</button>
        <button type="button" class="btn btn-pri btn-g" :disabled="s.enviando" @click="pagar">
          <Icone nome="cadeado" :traco="2.4" /> {{ s.enviando ? 'Aguarde…' : botaoPagar }}
        </button>
      </div>
      <p class="text-center text-[0.85rem] text-ink-2">Pagamento processado pelo Mercado Pago, em ambiente seguro.</p>
    </template>

    <!-- Concluído -->
    <template v-else>
      <div class="flex flex-col items-start gap-4" role="status">
        <svg aria-hidden="true" width="88" height="88" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="#A58BDD" stroke="#14213D" stroke-width="4" /><path d="m36 62 16 16 32-34" fill="none" stroke="#14213D" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <template v-if="s.resultado === 'aprovado'">
          <strong class="text-[1.4rem]">Pagamento aprovado!</strong>
          <p><strong>{{ resumo }}</strong> já está liberado para você.</p>
          <p class="text-[0.9rem]">Mandamos o comprovante para {{ s.email }}. Use esse e-mail para entrar no site em outro computador.</p>
          <RouterLink to="/painel" class="btn btn-pri btn-g" @click="emit('fechar')">Começar agora <Icone nome="seta" :traco="2.6" /></RouterLink>
        </template>
        <template v-else>
          <strong class="text-[1.4rem]">Seu boleto está pronto</strong>
          <p>Mandamos o boleto de <strong>{{ reais(total) }}</strong> para {{ s.email }}. Assim que o pagamento for confirmado, <strong>{{ resumo }}</strong> será liberado.</p>
          <p class="text-[0.9rem]">A confirmação pode levar até 3 dias úteis.</p>
          <button type="button" class="btn btn-g" @click="emit('fechar')">Fechar</button>
        </template>
      </div>
    </template>
  </BaseModal>
</template>
