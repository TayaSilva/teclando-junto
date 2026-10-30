// Curso 7: Comunicação digital.
import type { LicaoGeral } from './tipos';

export const CURSO7: LicaoGeral[] = [
  {
    id: '7.1', curso: 7, titulo: 'Conhecendo o e-mail',
    telas: [
      { img: 'email-carta', texto: ['O e-mail é uma mensagem que enviamos pela internet.', 'Ele funciona de maneira parecida com uma carta.'] },
      { img: 'email-endereco', texto: ['Cada pessoa pode ter um endereço de e-mail.', 'Esse endereço é usado para receber mensagens.'] },
      { img: 'email-partes', texto: ['Uma mensagem de e-mail normalmente apresenta quem enviou, o assunto e o texto.'] },
    ],
    atividades: [{
      k: 'escolha', itens: [{
        pergunta: 'Quem enviou esta mensagem?',
        cartoes: [{ titulo: 'E-mail recebido', linhas: ['De: ana@exemplo.com', 'Assunto: Nosso encontro', 'Olá! Vamos conversar amanhã? Um abraço, Ana.'] }],
        opcoes: [{ t: 'Ana' }, { t: 'Você' }, { t: 'O assunto' }],
        r: 0,
        certo: 'Isso mesmo! O campo “De” mostra quem enviou: Ana.',
        errado: 'Olhe o campo “De”, na primeira linha do e-mail.',
      }],
    }],
    conclusao: 'Muito bem! Você sabe reconhecer as partes de um e-mail.',
  },
  {
    id: '7.2', curso: 7, titulo: 'Escrevendo um e-mail',
    telas: [
      { img: 'email-novo', texto: ['Para escrever um e-mail, precisamos informar para quem queremos enviar a mensagem.'] },
      { img: 'email-destinatario', texto: ['No campo Destinatário, escrevemos o endereço de e-mail da pessoa.'] },
      { img: 'email-assunto', texto: ['No campo Assunto, podemos escrever uma frase curta que explique sobre o que é a mensagem.'] },
      { img: 'email-mensagem', texto: ['No espaço maior, escrevemos nossa mensagem.'] },
    ],
    atividades: [{ k: 'sim', sim: 'email-escrever' }],
    conclusao: 'Muito bem! Você escreveu e enviou um e-mail no ambiente de treino.',
  },
  {
    id: '7.3', curso: 7, titulo: 'Enviando fotografias',
    telas: [
      { img: 'email-anexo', texto: ['Além de escrever mensagens, podemos enviar fotografias e documentos pelo e-mail.'] },
      { img: 'email-anexo-nome', texto: ['Esses arquivos enviados junto com uma mensagem são chamados de anexos.'] },
      { img: 'clipe', texto: ['Em muitos programas de e-mail, o botão para anexar um arquivo tem o desenho de um clipe.'] },
    ],
    atividades: [{ k: 'sim', sim: 'email-anexo' }],
    conclusao: 'Você aprendeu a colocar uma fotografia em um e-mail.',
  },
  {
    id: '7.4', curso: 7, titulo: 'Participando de videochamadas',
    telas: [
      { img: 'videochamada', texto: ['Uma videochamada permite conversar com outra pessoa usando imagem e som pela internet.'] },
      { img: 'camera', texto: ['Durante uma videochamada, podemos utilizar a câmera para mostrar nosso rosto.'] },
      { img: 'microfone', texto: ['O microfone permite que outras pessoas escutem nossa voz.'] },
      { img: 'encerrar-chamada', texto: ['Quando terminamos a conversa, utilizamos o botão de encerrar chamada.'] },
    ],
    atividades: [{ k: 'sim', sim: 'videochamada' }],
    conclusao: 'Muito bem! Você participou de uma videochamada de treino.',
  },
  {
    id: '7.5', curso: 7, titulo: 'Lendo e respondendo mensagens',
    telas: [
      { img: 'caixa-entrada', texto: ['Quando alguém envia um e-mail, ele normalmente aparece na caixa de entrada.'] },
      { img: 'email-abrir', texto: ['Podemos abrir a mensagem para ler o que a pessoa escreveu.'] },
      { img: 'email-responder', texto: ['Se quisermos responder, podemos utilizar o botão Responder.'] },
      { img: 'email-cuidado', texto: ['Se receber uma mensagem inesperada pedindo senhas, pagamentos ou dados pessoais, não responda antes de verificar.'] },
    ],
    atividades: [{ k: 'sim', sim: 'email-responder' }],
    conclusao: 'Parabéns! Você aprendeu a se comunicar utilizando o computador.',
  },
];
