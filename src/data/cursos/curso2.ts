// Curso 2: Aprendendo a usar o mouse.
import type { LicaoGeral } from './tipos';

export const CURSO2: LicaoGeral[] = [
  {
    id: '2.1', curso: 2, titulo: 'O que é o mouse?',
    telas: [
      { titulo: 'O mouse', img: 'mouse-foto', texto: ['O mouse é o aparelho que usamos para apontar e escolher coisas na tela do computador.', 'Quando movemos o mouse com a mão, uma pequena setinha se move na tela, no mesmo sentido.', 'No notebook, o touchpad faz esse mesmo papel, mas o mouse é mais confortável para muitas pessoas.'] },
      { titulo: 'O touchpad', img: 'touchpad-foto', texto: ['O touchpad é a área lisa que fica logo abaixo do teclado do notebook. Ele faz o papel do mouse.', 'Para mover a setinha, deslize um dedo sobre ele. Para clicar, toque nele com o dedo.'] },
      { titulo: 'Qual é a diferença?', img: 'mouse-touchpad', texto: ['Mouse: é um aparelho separado. Você segura e move com a mão sobre a mesa. Pode ser usado em notebook e em computador de mesa.', 'Touchpad: já vem no notebook. Você move o dedo sobre ele, sem precisar de mais nada.', 'Os dois fazem a mesma coisa: movem a setinha e permitem clicar.'] },
      { titulo: 'Os lados do mouse', img: 'mouse-lados', texto: ['O mouse costuma ter dois botões e uma roda no meio.', 'Botão esquerdo: é o principal. Serve para escolher, selecionar e abrir.', 'Botão direito: abre uma pequena lista com outras opções, de acordo com o que está sob a setinha.', 'Roda do meio: ao girá-la, a página sobe ou desce.'] },
      { titulo: 'Clique com o botão esquerdo', img: 'clique-esquerdo', texto: ['Coloque a setinha sobre o que deseja e aperte o botão esquerdo uma vez, soltando em seguida.', 'É o clique mais usado. Com ele você escolhe um botão, seleciona um item ou abre uma opção.'] },
      { titulo: 'Clique com o botão direito', img: 'clique-direito', texto: ['Coloque a setinha sobre um item e aperte o botão direito uma vez.', 'Abre-se uma lista com outras opções, como copiar, renomear ou excluir.', 'Para fechar a lista sem escolher nada, clique em um espaço vazio com o botão esquerdo.'] },
      { titulo: 'Para quem usa a mão esquerda', img: 'mao-esquerda', texto: ['Se preferir usar o mouse com a mão esquerda, é possível trocar a função dos botões nas configurações do computador.', 'Isso pode ser feito depois, com ajuda, se desejar.'] },
    ],
    atividades: [{
      k: 'escolha', itens: [{
        pergunta: 'O que é o touchpad?',
        opcoes: [{ t: 'A área do notebook onde deslizamos o dedo para mover a setinha' }, { t: 'O aparelho separado que seguramos com a mão' }, { t: 'O botão de ligar o computador' }],
        r: 0,
        certo: 'Correto. O touchpad fica no notebook e faz o papel do mouse.',
        errado: 'Não é essa. O aparelho separado que seguramos é o mouse. O touchpad é a área lisa do notebook, abaixo do teclado.',
      }, {
        pergunta: 'Qual botão é o principal, usado para escolher e abrir as coisas?',
        opcoes: [{ t: 'O botão esquerdo' }, { t: 'O botão direito' }, { t: 'A roda do meio' }],
        r: 0,
        certo: 'Correto. O botão esquerdo é o principal.',
        errado: 'Não é esse. O botão que mais usamos para escolher e abrir é o esquerdo.',
      }, {
        pergunta: 'O que acontece ao clicar com o botão direito sobre um item?',
        opcoes: [{ t: 'Abre uma lista com outras opções' }, { t: 'O computador desliga' }, { t: 'A página sobe e desce' }],
        r: 0,
        certo: 'Correto. O botão direito abre uma lista de opções.',
        errado: 'Não é essa. O botão direito abre uma lista com outras opções para aquele item.',
      }],
    }],
    conclusao: 'Concluído. Você já sabe o que é o mouse, o que é o touchpad e quando usar cada botão.',
  },
  {
    id: '2.2', curso: 2, titulo: 'Movimentando a setinha',
    telas: [
      { img: 'mao-mouse', texto: ['Vamos aprender a usar o mouse!', 'Coloque sua mão sobre ele de uma maneira confortável.', 'Não é necessário apertar nenhum botão agora.'] },
      { img: 'ponteiro-move', texto: ['Mova o mouse devagar para a direita.', 'Observe a pequena setinha que aparece na tela.', 'Agora mova o mouse para a esquerda.'] },
      { img: 'ponteiro', texto: ['A pequena setinha se chama ponteiro.', 'Ela mostra onde você está apontando no computador.', 'Você pode movimentá-la para cima, para baixo e para os lados.'] },
    ],
    atividades: [{ k: 'ponteiro' }],
    conclusao: 'Você conseguiu movimentar a setinha! Agora vamos aprender a clicar.',
  },
  {
    id: '2.3', curso: 2, titulo: 'Aprendendo a clicar',
    telas: [
      { img: 'botao-esquerdo', texto: ['O mouse normalmente tem dois botões principais.', 'O botão da esquerda é muito utilizado para escolher coisas na tela.'] },
      { img: 'clicar', texto: ['Para clicar, coloque a setinha sobre o que deseja escolher.', 'Depois, aperte o botão esquerdo uma vez e solte.'] },
      { img: 'clicar-usos', texto: ['Um clique pode servir para escolher um botão, selecionar um objeto ou abrir uma opção.'] },
    ],
    atividades: [{ k: 'clique' }],
    conclusao: 'Muito bem! Você já sabe clicar com o mouse.',
  },
  {
    id: '2.4', curso: 2, titulo: 'Aprendendo o clique duplo',
    telas: [
      { img: 'pasta', texto: ['Às vezes precisamos clicar duas vezes para abrir alguma coisa.', 'Isso é chamado de clique duplo.'] },
      { img: 'clique-duplo', texto: ['Coloque a setinha sobre a pasta.', 'Aperte o botão esquerdo duas vezes seguidas, sem demorar muito entre os cliques.'] },
      { img: 'sem-pressa', texto: ['Não se preocupe se não conseguir de primeira.', 'Você pode tentar quantas vezes quiser.'] },
    ],
    atividades: [{ k: 'cliqueduplo' }],
    conclusao: 'Você aprendeu a abrir uma pasta com dois cliques.',
  },
  {
    id: '2.5', curso: 2, titulo: 'Arrastando objetos',
    telas: [
      { img: 'arrastar-objetos', texto: ['Também podemos usar o mouse para movimentar objetos na tela.'] },
      { img: 'arrastar-segurar', texto: ['Primeiro, coloque a setinha sobre o objeto.', 'Aperte o botão esquerdo e continue segurando.'] },
      { img: 'arrastar-soltar', texto: ['Sem soltar o botão, movimente o mouse.', 'Quando o objeto chegar ao lugar desejado, solte o botão.'] },
    ],
    atividades: [{ k: 'arrastar' }],
    conclusao: 'Muito bem! Você já consegue movimentar objetos na tela.',
  },
  {
    id: '2.6', curso: 2, titulo: 'Subindo e descendo páginas',
    telas: [
      { img: 'pagina-longa', texto: ['Algumas páginas têm mais informações do que conseguimos ver de uma só vez.'] },
      { img: 'roda-mouse', texto: ['A rodinha que fica no meio de muitos mouses ajuda a subir e descer a página.', 'Ela é chamada de roda de rolagem.'] },
      { img: 'roda-giro', texto: ['Gire a rodinha para baixo para ver o que está mais abaixo.', 'Gire para cima para voltar.'] },
    ],
    atividades: [{ k: 'rolagem' }],
    conclusao: 'Parabéns! Você concluiu o curso de mouse.',
  },
];
