import { computed, reactive, watch } from 'vue';
import { ler, gravar } from '@/lib/armazenamento';

// Estado da conta do aluno. As chamadas ao servidor estão marcadas com TODO:
// sem VITE_API_URL tudo é simulado no navegador, só para testar as telas.
interface Conta {
  email: string;
  nome: string;
  logado: boolean;
}

const API = import.meta.env.VITE_API_URL as string | undefined;
const conta = reactive<Conta>({ email: '', nome: '', logado: false, ...ler<Partial<Conta>>('tj:conta', {}) });
watch(conta, () => gravar('tj:conta', { ...conta }), { deep: true });

export const emailValido = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

export const regrasSenha = (s: string) => ({
  tamanho: s.length >= 8,
  letraENumero: /[A-Za-zÀ-ú]/.test(s) && /[0-9]/.test(s),
});

async function chamar(caminho: string, corpo: unknown): Promise<Response | null> {
  if (!API) {
    await new Promise((ok) => setTimeout(ok, 400));
    return null; // modo simulado
  }
  return fetch(`${API}${caminho}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(corpo) });
}

export function useConta() {
  return {
    conta,
    primeiroNome: computed(() => conta.nome.trim().split(' ')[0] ?? ''),

    /** Retorna true se entrou. */
    async entrar(email: string, senha: string): Promise<boolean> {
      const r = await chamar('/conta/entrar', { email, senha });
      if (r && !r.ok) return false;
      conta.email = email.trim();
      conta.logado = true;
      return true;
    },

    async cadastrar(nome: string, email: string, senha: string): Promise<boolean> {
      const r = await chamar('/conta/cadastro', { nome, email, senha });
      if (r && !r.ok) return false;
      conta.nome = nome.trim();
      conta.email = email.trim();
      conta.logado = true;
      return true;
    },

    /** Sempre responde igual, exista ou não a conta (não revela quem tem cadastro). */
    async pedirNovaSenha(email: string): Promise<void> {
      await chamar('/conta/esqueci-a-senha', { email });
    },

    sair() {
      conta.logado = false;
    },
  };
}
