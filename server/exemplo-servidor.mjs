// EXEMPLO de servidor para os pagamentos com Mercado Pago.
// Não faz parte do front-end e não é usado pelo Vite.
// Confira os nomes de campos e métodos na documentação atual do Mercado Pago
// antes de colocar em produção.
//
// Instalação (em uma pasta separada ou aqui mesmo):
//   npm install express cors mercadopago
// Execução:
//   MP_ACCESS_TOKEN=APP_USR-... node server/exemplo-servidor.mjs
//
// No front-end, crie um arquivo .env com:
//   VITE_API_URL=http://localhost:3001

import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const PRECOS = { modulo: 5, pacote: 26 }; // o preço vem do servidor, nunca do navegador
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const pagamentos = new Payment(client);

const app = express();
app.use(cors());
app.use(express.json());

// Cria um pagamento (Pix, boleto ou cartão).
app.post('/pagamentos', async (req, res) => {
  try {
    const { tipo, modulo, metodo, email, cpf, tokenCartao, parcelas, bandeira } = req.body;
    const valor = PRECOS[tipo];
    if (!valor) return res.status(400).json({ erro: 'tipo inválido' });

    const base = {
      transaction_amount: valor,
      description: tipo === 'pacote' ? 'TJ Teclando Juntos · Pacote de módulos extras' : `TJ Teclando Juntos · Módulo ${modulo}`,
      payer: { email },
      external_reference: `${tipo}-${modulo ?? 'todos'}-${Date.now()}`,
      // notification_url: 'https://SEU-DOMINIO/webhooks/mercadopago',
    };

    let body;
    if (metodo === 'pix') body = { ...base, payment_method_id: 'pix' };
    else if (metodo === 'boleto') body = { ...base, payment_method_id: 'bolbradesco', payer: { ...base.payer, identification: { type: 'CPF', number: cpf } } };
    // Cartão: o token vem do Card Payment Brick no navegador.
    else body = { ...base, token: tokenCartao, installments: parcelas ?? 1, payment_method_id: bandeira };

    const r = await pagamentos.create({ body, requestOptions: { idempotencyKey: crypto.randomUUID() } });
    const dadosPix = r.point_of_interaction?.transaction_data;
    res.json({
      id: String(r.id),
      status: r.status,
      qrCodeBase64: dadosPix?.qr_code_base64,
      copiaECola: dadosPix?.qr_code,
      linkBoleto: r.transaction_details?.external_resource_url,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ erro: 'falha ao criar pagamento' });
  }
});

// Consulta o status (usado pelo botão "Já paguei" do Pix).
app.get('/pagamentos/:id', async (req, res) => {
  try {
    const r = await pagamentos.get({ id: req.params.id });
    res.json({ id: String(r.id), status: r.status });
  } catch {
    res.status(404).json({ erro: 'não encontrado' });
  }
});

// Notificações do Mercado Pago: é AQUI que a compra deve ser liberada.
app.post('/webhooks/mercadopago', async (req, res) => {
  res.sendStatus(200);
  const id = req.body?.data?.id;
  if (!id) return;
  const r = await pagamentos.get({ id });
  if (r.status === 'approved') {
    // TODO: marcar a compra como liberada no banco de dados (r.external_reference, r.payer.email).
    console.log('Pagamento aprovado', r.id, r.external_reference);
  }
});

app.listen(3001, () => console.log('Servidor de pagamentos em http://localhost:3001'));
