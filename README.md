# TJ Teclando Juntos

Plataforma para pessoas com 60 anos ou mais aprenderem a usar o computador no próprio ritmo.

Feito com **Vue 3 + Vite + TypeScript + Tailwind CSS 4** e **Vue Router**.

## Como rodar

Precisa do Node.js 20 ou mais novo.

```bash
npm install
npm run dev        # abre em http://localhost:5173
npm run build      # gera a versão final em dist/
npm run preview    # testa a versão final
npm run typecheck  # confere os tipos com vue-tsc
```

## Telas e rotas

| Rota | Tela |
|---|---|
| `/` | Página inicial |
| `/painel` | Painel do aluno (próxima atividade, progresso, trilhas, extras) |
| `/trilhas` | Lista das 8 trilhas |
| `/trilhas/computador/partes` | Lição "As partes do computador" (áreas clicáveis) |
| `/aula/:id` | Lições dos cursos 1, 2, 4, 5, 6, 7 e 8 (ex.: `/aula/2.1`), em telas, com atividade e conclusão |
| `/trilhas/teclado` | Aulas das Trilhas 3 e 4 (use `?licao=4.1` para abrir uma lição) |
| `/simuladores` | Simuladores |
| `/ajuda` | Ajuda, com busca nas perguntas frequentes |
| `/extras` | Módulos extras e compra (Mercado Pago) |
| `/entrar` | Entrar (e-mail e senha) |
| `/cadastro` | Criar acesso (opcional; o painel convida depois de 3 atividades) |
| `/esqueci-a-senha` | Pedir link para criar uma senha nova |

## Estrutura

```
src/
  components/      Cabeçalho, rodapé, logo, ícones, janelas (modais), teclado ABNT2, lista de trilhas, compra
  composables/     usePreferencias (texto, contraste, narração) e useProgresso (lições, e-mail, compras)
  data/            trilhas.ts (trilhas, módulos extras, preços), licoesTeclado.ts (aulas de teclado) e cursos/ (lições dos demais cursos e o PLANO com a ordem das 46 lições)
  lib/             texto.ts (comparação e explicação de erros), pagamento.ts, armazenamento.ts
  pages/           Uma página por rota
  router/          Rotas
  style.css        Paleta (tokens do Tailwind), alto contraste e componentes base
server/
  exemplo-servidor.mjs   Exemplo de servidor para o Mercado Pago (não faz parte do build)
```

## Paleta e acessibilidade

- Cores em `src/style.css`, no bloco `@theme`: azul-petróleo (`pri`) para ações principais e acertos, roxo/lilás (`sec`) como cor de apoio e destaque.
- O **alto contraste** troca as mesmas variáveis, então todos os utilitários (`bg-pri`, `text-ink`, `border-borda`…) se adaptam sozinhos.
- O **tamanho do texto** muda o `font-size` do `<html>` (20, 23 ou 26 px). Use `rem` nos tamanhos para acompanhar.
- Fonte Atkinson Hyperlegible, botões com no mínimo 52 px de altura, foco visível, janelas com Esc e foco preso, textos alternativos.
- A narração usa a voz do navegador (Web Speech API). Para o conteúdo definitivo, o ideal são gravações revisadas.

## Sem cadastro

O progresso, as preferências e os dados da conta ficam no `localStorage` do navegador (`tj:progresso`, `tj:preferencias` e `tj:conta`). Depois de 3 atividades, o painel convida a criar um acesso (opcional).

## Contas (entrar, cadastro, esqueci a senha)

- Lógica em `src/composables/useConta.ts`. Sem `VITE_API_URL`, tudo é **simulado** no navegador (qualquer e-mail válido e senha entram), só para testar as telas.
- Com servidor, as telas chamam `POST /conta/entrar`, `POST /conta/cadastro` e `POST /conta/esqueci-a-senha` (com `credentials: 'include'`, pensando em sessão por cookie seguro).
- Regras da senha no cadastro: pelo menos 8 caracteres, com letra e número (mostradas ao vivo, com símbolo e texto).
- "Esqueci a senha" responde sempre igual, exista ou não a conta, para não revelar quem tem cadastro.
- No servidor: guarde a senha com hash forte (ex.: Argon2 ou bcrypt), limite tentativas de login, envie e-mail de confirmação e use link de nova senha com validade curta.

## Modo escuro

- Em Configurações > Tema: **Claro**, **Escuro** ou **Igual ao computador** (padrão, segue o sistema).
- As cores do modo escuro ficam em `:root[data-tema='escuro']` no `style.css`. O alto contraste tem prioridade sobre o tema.

## Movimento

- Página inicial: o mouse da ilustração se mexe e a setinha anda junto na tela até clicar no botão; os cartões têm efeito ao passar o mouse e aparecem suavemente ao rolar (`animation-timeline: view()`; em navegadores sem suporte, aparecem sem animação).
- Tudo fica parado para quem ativou "reduzir movimento" no sistema.

## Pagamentos (Mercado Pago)

- Preços em `src/data/trilhas.ts`: R$ 5,00 por módulo e R$ 26,00 pelo pacote com os 6. **O servidor também precisa ter os preços**: nunca confie no valor enviado pelo navegador.
- Sem `VITE_API_URL`, o app roda em **modo simulado** (as telas funcionam, nada é cobrado).
- Para cobrar de verdade:
  1. Crie a aplicação no painel de desenvolvedores do Mercado Pago e pegue o Access Token.
  2. Suba um servidor seguindo `server/exemplo-servidor.mjs` e configure `VITE_API_URL` no `.env`.
  3. **Cartão:** use o Card Payment Brick do Mercado Pago dentro do `<div id="mp-cartao">` em `CompraModal.vue` e envie só o token para o servidor. Os dados do cartão não passam pelo nosso código.
  4. **Pix:** o servidor devolve o QR Code e o código copia e cola, que a tela já mostra.
  5. **Liberação:** libere os módulos só quando o webhook do Mercado Pago confirmar o pagamento. O botão "Já paguei" apenas consulta o status.
- Confira os detalhes da integração na documentação atual do Mercado Pago.

## O que ainda falta

- Ilustrações próprias (hoje as telas usam figuras em emoji com legenda) e narração gravada (hoje é a voz do navegador).
- Lição 4.3 ("Uma viagem ao passado"): o conteúdo enviado terminava no objetivo.
- Fotos reais dos objetos antigos na lição 3.1 e da TV na 3.2 (hoje aparecem como `[FOTO: …]`).
- Simulador de área de trabalho e de mouse.
- Servidor: contas (entrar, cadastro, nova senha, confirmação de e-mail), pagamentos e liberação dos módulos extras.
- Hospedagem: como usa rotas sem `#`, configure o servidor para devolver `index.html` em qualquer caminho (fallback de SPA).
