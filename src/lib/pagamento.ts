// Ponte entre a tela de compra e o servidor que fala com o Mercado Pago.
//
// IMPORTANTE: o Access Token do Mercado Pago NUNCA pode ficar no front-end.
// O navegador chama o SEU servidor (VITE_API_URL), e o servidor chama o
// Mercado Pago. Veja server/exemplo-servidor.mjs e o README.
//
// Sem VITE_API_URL o app roda em modo "simulado", útil para testar as telas.

export type MetodoPagamento = 'pix' | 'cartao' | 'boleto';

export interface PedidoPagamento {
  tipo: 'modulo' | 'pacote';
  modulo?: number;
  metodo: MetodoPagamento;
  email: string;
  valor: number;
  /** Pix já gerado: a chamada passa a ser uma consulta de status. */
  jaGerado?: boolean;
}

export type RespostaPagamento =
  | { status: 'aguardando_pix'; qrCodeBase64?: string; copiaECola: string; id: string }
  | { status: 'aguardando_pix_confirmacao' }
  | { status: 'aprovado'; id: string }
  | { status: 'pendente'; id: string; linkBoleto?: string };

const API = import.meta.env.VITE_API_URL as string | undefined;
let ultimoPix: string | null = null;

export async function iniciarPagamento(p: PedidoPagamento): Promise<RespostaPagamento> {
  if (!API) return simular(p);

  if (p.metodo === 'pix' && p.jaGerado && ultimoPix) {
    const r = await fetch(`${API}/pagamentos/${ultimoPix}`);
    if (!r.ok) throw new Error('falha ao consultar');
    const d = await r.json();
    return d.status === 'approved' ? { status: 'aprovado', id: ultimoPix } : { status: 'aguardando_pix_confirmacao' };
  }

  // Para cartão, o servidor recebe o token gerado pelo Card Payment Brick
  // (os dados do cartão nunca passam pelo nosso código).
  const r = await fetch(`${API}/pagamentos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  });
  if (!r.ok) throw new Error('falha no pagamento');
  const d = await r.json();
  if (p.metodo === 'pix') {
    ultimoPix = d.id;
    return { status: 'aguardando_pix', id: d.id, qrCodeBase64: d.qrCodeBase64, copiaECola: d.copiaECola };
  }
  if (p.metodo === 'boleto') return { status: 'pendente', id: d.id, linkBoleto: d.linkBoleto };
  return d.status === 'approved' ? { status: 'aprovado', id: d.id } : { status: 'pendente', id: d.id };
}

async function simular(p: PedidoPagamento): Promise<RespostaPagamento> {
  await new Promise((ok) => setTimeout(ok, 600));
  if (p.metodo === 'pix' && !p.jaGerado) return { status: 'aguardando_pix', id: 'simulado', copiaECola: 'CODIGO-PIX-DE-TESTE-0000' };
  if (p.metodo === 'boleto') return { status: 'pendente', id: 'simulado' };
  return { status: 'aprovado', id: 'simulado' };
}
