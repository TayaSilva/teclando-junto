// Curso 8: Segurança digital.
import type { LicaoGeral } from './tipos';

export const CURSO8: LicaoGeral[] = [
  {
    id: '8.1', curso: 8, titulo: 'Protegendo suas informações',
    telas: [
      { img: 'escudo-dados', texto: ['Quando utilizamos a internet, precisamos cuidar das nossas informações pessoais.'] },
      { img: 'dados-sensiveis', texto: ['Documentos, dados bancários, códigos de segurança e senhas exigem atenção especial.'] },
      { img: 'pedido-inesperado', texto: ['Se alguém pedir suas informações de maneira inesperada, não tenha pressa em responder.'] },
    ],
    atividades: [{
      k: 'escolha', itens: [{
        pergunta: 'Você deve informar sua senha do banco para uma pessoa que ligou dizendo trabalhar no banco?',
        opcoes: [{ t: 'Sim, se ela disser que é funcionária.' }, { t: 'Não. Devo verificar pelos canais oficiais.' }],
        r: 1,
        certo: 'Muito bem! O banco nunca precisa que você diga sua senha por telefone. Confirme sempre pelos canais oficiais.',
        errado: 'Cuidado! Qualquer pessoa pode dizer que é funcionária. Tente de novo.',
      }],
    }],
    conclusao: 'Muito bem! Suas informações pessoais merecem cuidado.',
  },
  {
    id: '8.2', curso: 8, titulo: 'Criando senhas seguras',
    telas: [
      { img: 'senha-chave', texto: ['Uma senha ajuda a proteger sua conta.', 'Ela funciona como uma chave que permite entrar em um serviço.'] },
      { img: 'senha-forte', texto: ['Uma boa senha deve ser difícil de adivinhar.', 'Prefira senhas longas, que não usem informações fáceis de descobrir, como sua data de nascimento.'] },
      { img: 'senha-segredo', texto: ['Evite utilizar a mesma senha em vários serviços.', 'Nunca compartilhe suas senhas ou códigos recebidos por mensagem.'] },
    ],
    atividades: [{
      k: 'escolha', itens: [{
        pergunta: 'Qual destas senhas seria mais difícil de adivinhar?',
        opcoes: [{ t: '123456' }, { t: 'Jardim!Montanha7Lua' }],
        r: 1,
        certo: 'Isso mesmo! É longa e mistura palavras, símbolo e número.',
        errado: 'Quase. Pense: qual delas é mais fácil de alguém tentar por sorte?',
        aviso: 'Atenção: estas são senhas de treino. Não use estes exemplos como senhas reais.',
      }],
    }],
    conclusao: 'Muito bem! Agora você sabe o que torna uma senha mais segura.',
  },
  {
    id: '8.3', curso: 8, titulo: 'Reconhecendo mensagens falsas',
    telas: [
      { img: 'golpe-mensagem', texto: ['Algumas pessoas usam mensagens para tentar enganar outras pessoas.', 'Essas tentativas são chamadas de golpes.'] },
      { img: 'golpista-disfarce', texto: ['Um golpista pode fingir ser um familiar, um banco ou uma empresa conhecida.'] },
      { img: 'urgencia', texto: ['Mensagens que exigem dinheiro ou dados com muita urgência merecem atenção.'] },
    ],
    atividades: [{
      k: 'escolha', itens: [{
        pergunta: 'O que você deve fazer?',
        cartoes: [{ titulo: 'Mensagem recebida', linhas: ['URGENTE! Sua conta será bloqueada em 10 minutos. Clique aqui e informe sua senha.'] }],
        opcoes: [{ t: 'Clicar rapidamente.' }, { t: 'Informar a senha.' }, { t: 'Não clicar e verificar a informação pelo canal oficial.' }],
        r: 2,
        certo: 'Muito bem! Desconfiar de pedidos urgentes ajuda a evitar golpes.',
        errado: 'Cuidado: a pressa é o truque do golpista. Tente de novo.',
      }],
    }],
    conclusao: 'Muito bem! Você sabe reconhecer uma mensagem suspeita.',
  },
  {
    id: '8.4', curso: 8, titulo: 'Cuidado com links e arquivos',
    telas: [
      { img: 'link-falso', texto: ['Links podem levar para sites.', 'Mas alguns links podem levar para páginas falsas.'] },
      { img: 'link-quem', texto: ['Antes de abrir um link inesperado, verifique quem enviou e para onde ele leva.'] },
      { img: 'arquivo-desconhecido', texto: ['Também devemos ter cuidado com arquivos recebidos de pessoas desconhecidas.'] },
    ],
    atividades: [{
      k: 'escolha', itens: [{
        pergunta: 'Qual é a atitude mais segura?',
        cartoes: [{ titulo: 'Mensagem recebida', linhas: ['Parabéns! Você ganhou um prêmio inesperado.', '[ Receber prêmio ]'] }],
        opcoes: [{ t: 'Clicar em “Receber prêmio”.' }, { t: 'Não clicar e verificar a informação por um canal oficial, quando necessário.' }],
        r: 1,
        certo: 'Isso mesmo! Prêmios inesperados são um truque comum. Não clique no botão.',
        errado: 'Cuidado: ninguém ganha prêmio sem ter participado de nada. Tente de novo.',
      }],
    }],
    conclusao: 'Muito bem! Você sabe ter cuidado com links e arquivos.',
  },
  {
    id: '8.5', curso: 8, titulo: 'Golpes envolvendo dinheiro',
    telas: [
      { img: 'golpe-banco', texto: ['Alguns golpistas fingem ser funcionários de bancos ou empresas para pedir dinheiro.'] },
      { img: 'golpe-parente', texto: ['Eles também podem fingir ser alguém da sua família e dizer que precisam de uma transferência urgente.'] },
      { img: 'confirmar-contato', texto: ['Se receber um pedido inesperado de dinheiro, confirme a situação por outro meio de contato que você já conhece.'] },
      { img: 'pix-nome', texto: ['Antes de fazer um Pix, confira com atenção o nome de quem vai receber.'] },
    ],
    atividades: [{
      k: 'escolha', itens: [{
        pergunta: 'O que você faria?',
        cartoes: [{ titulo: 'Mensagem de um número novo', linhas: ['Oi! Troquei de número. Preciso que você faça um Pix agora. Depois explico.'] }],
        opcoes: [{ t: 'Faria o Pix para ajudar.' }, { t: 'Falaria com o familiar pelo número antigo ou por outro contato conhecido antes de enviar qualquer dinheiro.' }],
        r: 1,
        certo: 'Muito bem! Confirmar por um contato conhecido é a melhor proteção.',
        errado: 'Cuidado: você ainda não tem certeza de quem escreveu. Tente de novo.',
      }],
    }],
    conclusao: 'Muito bem! Antes de enviar dinheiro, sempre confirme.',
  },
  {
    id: '8.6', curso: 8, titulo: 'O que fazer quando algo parece errado?',
    telas: [
      { img: 'mensagem-estranha', texto: ['Se você encontrar uma mensagem estranha, não precisa responder imediatamente.'] },
      { img: 'parar-ler', texto: ['Pare, leia com calma e evite clicar em links ou informar dados.'] },
      { img: 'pessoa-confianca', texto: ['Se tiver dúvidas, procure uma pessoa de confiança ou entre em contato com a empresa por seus canais oficiais.'] },
      { img: 'ligar-banco', texto: ['Se já informou uma senha ou fez um pagamento suspeito, entre em contato rapidamente com o banco ou serviço envolvido por um canal oficial.'] },
    ],
    atividades: [{
      k: 'escolha', instrucao: 'Escolha o que fazer em cada situação.', itens: [
        { pergunta: 'Situação 1: uma pessoa desconhecida pede sua senha.', opcoes: [{ t: 'Informar a senha.' }, { t: 'Não informar.' }], r: 1, certo: 'Muito bem! Senha não se informa a ninguém.', errado: 'Cuidado: senha é segredo. Tente de novo.' },
        { pergunta: 'Situação 2: alguém diz ter trocado de número e pede um Pix.', opcoes: [{ t: 'Fazer o Pix logo.' }, { t: 'Confirmar por outro contato conhecido.' }], r: 1, certo: 'Isso mesmo! Confirme antes de enviar dinheiro.', errado: 'Cuidado: você ainda não sabe quem é. Tente de novo.' },
        { pergunta: 'Situação 3: você recebe um link de promoção com uma oferta boa demais para ser verdade.', opcoes: [{ t: 'Abrir imediatamente.' }, { t: 'Não abrir imediatamente e verificar a oferta por um canal oficial.' }], r: 1, certo: 'Muito bem! Ofertas boas demais merecem desconfiança.', errado: 'Cuidado: ofertas boas demais costumam ser golpe. Tente de novo.' },
      ],
    }],
    conclusao: 'Parabéns! Você concluiu o curso de segurança digital. Agora conhece cuidados importantes para utilizar a internet com mais tranquilidade.',
  },
];
