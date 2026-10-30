// Curso 1: Conhecendo o computador. A lição 1.2 (As partes do computador) é uma página própria.
import type { LicaoGeral } from './tipos';

export const CURSO1: LicaoGeral[] = [
  {
    id: '1.1', curso: 1, titulo: 'O que é um computador?',
    telas: [
      { titulo: 'Introdução ao computador', img: 'pessoa-computador', texto: ['Nesta primeira aula, vamos apresentar o computador e seus principais tipos.', 'Não é necessária experiência anterior. O conteúdo é apresentado em etapas, no seu ritmo.'] },
      { titulo: 'Para que serve um computador?', img: 'fotos-familia', texto: ['O computador é uma máquina que executa tarefas a partir de instruções: guarda informações, faz cálculos e as apresenta na tela.', 'No dia a dia, é usado para escrever textos, guardar e ver fotografias, assistir a vídeos e pesquisar informações.'] },
      { titulo: 'Usos no cotidiano', img: 'usos-quatro', texto: ['Também é possível conversar com familiares por mensagens e chamadas de vídeo, ler notícias, ouvir música, acessar serviços de bancos e de saúde e aprender novos assuntos.', 'Hoje, muitas dessas atividades são feitas pelo computador.'] },
      { titulo: 'Um pouco de história', img: 'historia-computador', texto: ['Os primeiros computadores surgiram na década de 1940. Eram enormes, ocupavam salas inteiras e eram usados apenas por universidades, governos e grandes empresas.', 'Com o avanço da tecnologia, as máquinas diminuíram de tamanho. Na década de 1980, os computadores pessoais, como o IBM PC (1981), chegaram às casas e aos escritórios. Eram os computadores de mesa.', 'A partir dos anos 1990, os computadores portáteis, chamados notebooks ou laptops, passaram a ser cada vez mais comuns.'] },
      { titulo: 'Computador de mesa (desktop)', img: 'desktop-pecas', texto: ['O computador de mesa, também chamado de desktop, é formado por peças separadas: o gabinete (a caixa onde ficam os componentes internos), o monitor (a tela), o teclado e o mouse.', 'Ele fica fixo em um local, como uma mesa ou escrivaninha, e precisa estar ligado à tomada o tempo todo.', 'Costuma oferecer mais desempenho pelo preço, tem tela e teclado maiores e é mais fácil de consertar ou de trocar peças.'] },
      { titulo: 'Notebook', img: 'notebook-portatil', texto: ['O notebook reúne tudo em um único aparelho dobrável: a tela, o teclado e o gabinete ficam no mesmo corpo. No lugar do mouse, há uma área sensível ao toque chamada touchpad.', 'Possui bateria, o que permite usá-lo por algumas horas sem tomada e levá-lo de um lugar para outro.', 'Em compensação, tem tela e teclado menores, e a bateria precisa ser recarregada.'] },
      { titulo: 'Qual é a diferença?', img: 'tipos-computador', texto: ['Desktop: peças separadas, fixo, sempre ligado à tomada, tela e teclado maiores.', 'Notebook: tudo em um só aparelho, portátil, com bateria, ocupa menos espaço.', 'Os dois funcionam da mesma forma. O que você aprender neste curso vale para ambos.'] },
    ],
    atividades: [{
      k: 'escolha', itens: [{
        pergunta: 'Qual destes aparelhos é um Desktop (computador de mesa)?',
        opcoes: [{ t: 'Computador de mesa', img: 'desktop-pecas' }, { t: 'Notebook', img: 'notebook-portatil' }, { t: 'Tablet', img: 'tablet' }],
        r: 0,
        certo: 'Correto. O desktop é o computador de mesa, com monitor, gabinete, teclado e mouse separados.',
        errado: 'Não é essa. Procure o aparelho formado por peças separadas, que fica fixo em uma mesa.',
      }, {
        pergunta: 'Qual destes computadores funciona com bateria e pode ser levado de um lugar para outro?',
        opcoes: [{ t: 'Notebook', img: 'notebook-portatil' }, { t: 'Computador de mesa', img: 'desktop-pecas' }],
        r: 0,
        certo: 'Correto. O notebook tem bateria e é portátil.',
        errado: 'Não é essa. O computador de mesa fica fixo e precisa de tomada. Procure o que é portátil.',
      }],
    }],
    conclusao: 'Concluído. Você já sabe o que é um computador e conhece a diferença entre o computador de mesa e o notebook.',
  },
  {
    id: '1.3', curso: 1, titulo: 'Entradas USB e equipamentos conectados',
    telas: [
      { titulo: 'O que é uma entrada USB?', img: 'entradas-usb', texto: ['O computador tem pequenas aberturas onde se encaixam outros aparelhos. Elas se chamam entradas.', 'A entrada mais comum se chama USB. É uma abertura retangular, que fica na lateral do notebook ou na frente e atrás do computador de mesa.', 'A imagem mostra a ponta do aparelho que se encaixa nela.'] },
      { titulo: 'O que se pode ligar?', img: 'dispositivos-usb', texto: ['Na entrada USB é possível ligar muitos aparelhos: mouse, teclado, pendrive, fones de ouvido, impressora, câmera e até o celular.', 'Em geral, basta encaixar. O computador reconhece o aparelho sozinho e ele já pode ser usado.'] },
      { titulo: 'O pendrive', img: 'pendrive', texto: ['O pendrive é um pequeno aparelho que se encaixa na entrada USB e guarda fotografias, documentos e outros arquivos.', 'Serve para levar arquivos de um computador para outro ou para guardar uma cópia de segurança.'] },
      { titulo: 'O carregador do celular', img: 'carregador-celular', texto: ['O carregador do celular também usa USB. Em muitos modelos, uma das pontas do cabo é igual à da imagem.', 'Essa ponta pode ser ligada na tomada, com um adaptador, ou na entrada USB do computador, que também carrega o celular, só que mais devagar.'] },
      { titulo: 'Existem outras entradas', img: 'entradas-varias', texto: ['Além da USB, o computador tem outras entradas. Cada uma serve para ligar um tipo de coisa: a tela, o fone de ouvido, o cabo de energia, o cabo de internet e outras.', 'A imagem mostra algumas delas, no notebook e no computador de mesa. Você não precisa decorar nada agora. Com o tempo, vai conhecendo cada uma e, se tiver curiosidade, pode pesquisar sobre elas depois.'] },
      { titulo: 'Cuidados', img: 'cuidados-usb', texto: ['Os conectores têm formatos diferentes. Antes de encaixar, veja se o formato combina com a entrada.', 'O conector USB comum só entra de um jeito. Nunca force: se não encaixar, vire o conector e tente de novo.', 'Antes de tirar um pendrive, feche os arquivos que estão abertos nele.'] },
    ],
    atividades: [{
      k: 'escolha', itens: [{
        pergunta: 'Qual destes aparelhos pode ser usado para guardar arquivos?',
        opcoes: [{ t: 'Pendrive', img: 'pendrive' }, { t: 'Mouse', img: 'mouse' }, { t: 'Teclado', img: 'teclado-foto' }],
        r: 0,
        certo: 'Correto. Um pendrive pode guardar arquivos e ajudar a transportá-los.',
        errado: 'Não é essa. Pense no pequeno aparelho que se conecta na entrada USB e guarda fotografias e documentos.',
      }],
    }],
    conclusao: 'Concluído. Você já sabe para que servem as entradas USB.',
  },
  {
    id: '1.4', curso: 1, titulo: 'Ligando e desligando o computador',
    telas: [
      { titulo: 'Como ligar?', img: 'botao-energia', texto: ['Para ligar o computador, precisamos encontrar o botão de ligar.', 'Ele costuma ter um pequeno símbolo de um círculo com um traço.', 'Aperte o botão uma vez.'] },
      { titulo: 'Esperando iniciar', img: 'iniciando', texto: ['Depois de ligar, o computador pode levar alguns instantes para ficar pronto.', 'Isso é normal.', 'Espere até aparecer a tela inicial.'] },
      { titulo: 'A área de trabalho', img: 'area-trabalho', texto: ['Esta é a área de trabalho.', 'Ela aparece quando o computador está pronto para ser usado.', 'É nela que encontramos atalhos para abrir programas e arquivos.'] },
      { titulo: 'Como desligar?', img: 'menu-desligar', texto: ['Quando terminar de utilizar o computador, é importante desligá-lo corretamente.', 'No Windows, abra o menu Iniciar, escolha o botão de energia e depois a opção Desligar.', 'Espere o computador terminar de desligar.'] },
    ],
    atividades: [{ k: 'sim', sim: 'computador' }],
    conclusao: 'Parabéns. Você concluiu o primeiro curso de informática.',
  },
];
