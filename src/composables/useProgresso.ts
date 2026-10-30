import { computed, reactive, watch } from 'vue';
import { ler, gravar } from '@/lib/armazenamento';

// Progresso salvo só neste navegador (modo sem cadastro).
// Quando houver contas, sincronizar este estado com o servidor.
export interface Compra {
  tipo: 'modulo' | 'pacote';
  modulo?: number;
  metodo: 'pix' | 'cartao' | 'boleto';
  status: 'aprovado' | 'pendente';
  data: string;
}

interface Dados {
  concluidas: Record<string, true>;
  ultima: { id: string; titulo: string; data: string } | null;
  conviteDispensado: boolean;
  email: string;
  compras: Compra[];
}

const PADRAO: Dados = { concluidas: {}, ultima: null, conviteDispensado: false, email: '', compras: [] };
const dados = reactive<Dados>({ ...PADRAO, ...ler<Partial<Dados>>('tj:progresso', {}) });

watch(dados, () => gravar('tj:progresso', dados), { deep: true });

const totalConcluidas = computed(() => Object.keys(dados.concluidas).length);

export function useProgresso() {
  return {
    dados,
    totalConcluidas,
    foiConcluida: (id: string) => !!dados.concluidas[id],
    concluir(id: string, titulo: string) {
      dados.concluidas[id] = true;
      dados.ultima = { id, titulo, data: new Date().toISOString() };
    },
    dispensarConvite() {
      dados.conviteDispensado = true;
    },
    salvarEmail(email: string) {
      dados.email = email;
    },
    registrarCompra(c: Omit<Compra, 'data'>) {
      dados.compras.push({ ...c, data: new Date().toISOString() });
    },
  };
}
