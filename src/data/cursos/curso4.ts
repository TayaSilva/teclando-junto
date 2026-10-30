// Curso 4: Praticando digitação. As lições 4.1 e 4.2 estão em licoesTeclado.ts.
import type { LicaoGeral } from './tipos';

export const CURSO4: LicaoGeral[] = [
  {
    id: '4.3', curso: 4, titulo: 'Escrevendo frases',
    telas: [
      { img: 'frases', texto: ['Agora vamos escrever frases.', 'Uma frase é formada por palavras que, juntas, transmitem uma ideia.'] },
      { img: 'barra-espaco', texto: ['Lembre-se de utilizar a barra de espaço entre as palavras.'] },
    ],
    atividades: [{
      k: 'digitar', instrucao: 'Copie a frase. Você pode repetir quantas vezes quiser e pedir uma dica.',
      itens: [{ r: 'Hoje é um lindo dia.' }, { r: 'Eu gosto de música.' }, { r: 'Minha casa é bonita.' }, { r: 'Estou aprendendo a digitar.' }],
    }],
    conclusao: 'Muito bem! Você já consegue escrever frases.',
  },
  {
    id: '4.4', curso: 4, titulo: 'Pontuação',
    telas: [
      { img: 'pontuacao', texto: ['Os sinais de pontuação ajudam a organizar o que escrevemos.'] },
      { img: 'ponto-final', texto: ['O ponto final aparece quando terminamos uma frase.'] },
      { img: 'interrogacao-exclamacao', texto: ['O ponto de interrogação aparece em perguntas.', 'O ponto de exclamação pode mostrar surpresa ou entusiasmo.'] },
    ],
    atividades: [
      {
        k: 'escolha', instrucao: 'Complete cada frase com o sinal certo.',
        itens: [
          { pergunta: 'Bom dia_  Qual sinal termina esta frase?', opcoes: [{ t: '.' }, { t: '?' }, { t: '!' }], r: 0, certo: 'Isso mesmo! O ponto final termina a frase.', errado: 'Quase. Esta frase não é uma pergunta. Ela só termina. Tente de novo.' },
          { pergunta: 'Como você está_  Qual sinal termina esta frase?', opcoes: [{ t: '.' }, { t: '?' }, { t: '!' }], r: 1, certo: 'Muito bem! Perguntas terminam com ponto de interrogação.', errado: 'Esta frase é uma pergunta. Tente de novo.' },
          { pergunta: 'Que alegria_  Qual sinal termina esta frase?', opcoes: [{ t: '.' }, { t: '?' }, { t: '!' }], r: 2, certo: 'Isso! O ponto de exclamação mostra entusiasmo.', errado: 'Esta frase mostra alegria. Tente de novo.' },
        ],
      },
      {
        k: 'digitar', instrucao: 'Agora escreva as três frases, com a pontuação.',
        itens: [{ r: 'Bom dia.' }, { r: 'Como você está?' }, { r: 'Que alegria!' }],
      },
    ],
    conclusao: 'Você aprendeu a utilizar sinais importantes na escrita.',
  },
  {
    id: '4.5', curso: 4, titulo: 'Corrigindo palavras',
    telas: [
      { img: 'corrigir-palavra', texto: ['Às vezes escrevemos uma palavra com uma letra a mais ou faltando.', 'Podemos corrigir sem precisar escrever tudo novamente.'] },
      { img: 'corrigir-cursor', texto: ['Para corrigir, clique no lugar desejado e utilize as teclas para apagar ou acrescentar letras.'] },
    ],
    atividades: [{
      k: 'digitar', ignorarCaixa: true, instrucao: 'A palavra tem um erro. Clique no campo e corrija. Não precisa escrever tudo de novo.',
      itens: [{ ini: 'CASSA', r: 'CASA' }, { ini: 'BOLAa', r: 'BOLA' }, { ini: 'GTO', r: 'GATO' }, { ini: 'LIVRRO', r: 'LIVRO' }],
    }],
    conclusao: 'Muito bem! Você conseguiu encontrar e corrigir erros.',
  },
  {
    id: '4.6', curso: 4, titulo: 'Escrevendo uma mensagem',
    telas: [
      { img: 'mensagem', texto: ['Você já aprendeu a escrever palavras e frases.', 'Agora vamos juntar tudo para criar uma mensagem.'] },
      { img: 'mensagem-carinho', texto: ['Imagine que você deseja mandar uma mensagem carinhosa para alguém.'] },
    ],
    atividades: [{ k: 'mensagem' }],
    conclusao: 'Muito bem! Você já sabe escrever uma mensagem.',
  },
  {
    id: '4.7', curso: 4, titulo: 'Jogo das letras',
    telas: [
      { img: 'jogo-letras', texto: ['Que tal um joguinho para treinar?', 'Uma letra vai aparecer na tela e você deve apertar a mesma letra no teclado. Um cronômetro mostra quanto tempo você leva.'] },
      { img: 'jogo-erro', texto: ['Se apertar a tecla errada, não tem problema: a letra continua na tela até você acertar.', 'Não precisa ter pressa. Com o tempo, você fica cada vez mais rápido!'] },
    ],
    atividades: [{ k: 'jogoLetras', instrucao: 'Aperte no teclado a letra que aparece na tela.', rodadas: 10 }],
    conclusao: 'Parabéns! Você concluiu o curso de digitação. Agora consegue escrever palavras, frases e mensagens no computador!',
  },
];
