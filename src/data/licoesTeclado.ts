// Conteúdo das Trilhas 3 (Conhecendo o teclado) e 4 (Praticando digitação).
// Fonte: SPEC "Digitação divertida e domínio do teclado".

export type TipoAtividade =
  | 'info' | 'completar' | 'digitar' | 'foto' | 'separar' | 'corrigir' | 'delete'
  | 'enter' | 'ano' | 'livre' | 'tab' | 'esc' | 'teclas' | 'copiar' | 'escolha';

export interface Item {
  r?: string;           // resposta esperada
  mostra?: string;      // texto mostrado (quando difere da resposta)
  palavra?: string;     // palavra completa (completar)
  nota?: string;
  foto?: string;        // nome do objeto da foto (espaço reservado)
  pergunta?: string;
  ini?: string;         // texto inicial do campo
  cur?: number;         // posição inicial do cursor
  seq?: string[];       // sequência de teclas esperada
  campos?: { l: string; r: string }[];
  receita?: string;
}

export interface Atividade {
  t: string;
  k: TipoAtividade;
  i?: string;           // instrução
  ci?: boolean;
  sa?: boolean;
  itens?: Item[];
  // só para "info"
  p?: string[];
  lista?: { k: string; d: string }[];
  ex?: { antes: string; depois: string; leg: string }[];
  teclas?: string[];
}

export interface Licao {
  id: string;
  c: 3 | 4;
  nome: string;
  titulo: string;
  objetivo?: string;
  intro: string[];
  teclas: string[];
  fim: string;
  a: Atividade[];
  pendente?: boolean;
}

const dig = (lista: string[]): Item[] => lista.map((r) => ({ r }));

export const LICOES: Licao[] = [
  {
    id: '3.1', c: 3, nome: 'As letras do teclado', titulo: 'Vamos encontrar as letras?',
    intro: ['Você se lembra de quando aprendeu o alfabeto? Hoje vamos encontrar aquelas mesmas letras no computador.', 'Elas estão em lugares diferentes, mas não precisam ser decoradas de uma só vez.'],
    teclas: ['A', 'E', 'O'],
    fim: 'Muito bem! As letras continuam sendo nossas conhecidas. Agora você está aprendendo a encontrá-las no teclado.',
    a: [
      { t: 'Complete o nome', k: 'completar', i: 'Que letra está faltando? Aperte a tecla dela e depois Conferir.', ci: true, sa: true, itens: [
        { mostra: 'B_LA', r: 'O', palavra: 'BOLA' }, { mostra: 'C_SA', r: 'A', palavra: 'CASA' },
        { mostra: 'R_DIO', r: 'A', palavra: 'RÁDIO', nota: 'Pode usar o A sem acento. Os acentos vêm mais adiante.' },
        { mostra: 'F_STA', r: 'E', palavra: 'FESTA' }, { mostra: 'D_NÇA', r: 'A', palavra: 'DANÇA' }] },
      { t: 'Objetos de outros tempos', k: 'foto', i: 'Olhe a foto e digite o nome do objeto. A palavra aparece para ajudar.', ci: true, sa: true, itens: [
        { foto: 'vitrola', r: 'VITROLA' }, { foto: 'rádio antigo', r: 'RÁDIO' }, { foto: 'máquina de escrever', r: 'MÁQUINA' }, { foto: 'telefone de disco', r: 'TELEFONE' }] },
    ],
  },
  {
    id: '3.2', c: 3, nome: 'Números e lembranças', titulo: 'Qual era o número?',
    intro: ['Os números fazem parte da nossa vida. Estão nas datas, nos endereços e até nas lembranças de momentos especiais.', 'Eles ficam na fileira de cima do teclado, logo acima das letras.'],
    teclas: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    fim: 'Muito bem! Agora você já encontra os números no teclado.',
    a: [
      { t: 'Números na tela', k: 'digitar', i: 'Digite o número que aparece.', itens: dig(['7', '15', '25', '100', '1975', '1988', '2000']) },
      { t: 'Uma viagem no tempo', k: 'ano', i: 'Digite o ano no espaço abaixo.', itens: [
        { foto: 'televisão antiga', pergunta: 'Vamos imaginar que estamos em 1978. Digite esse ano no espaço abaixo.', r: '1978' },
        { foto: 'televisão antiga', pergunta: 'Agora a viagem nos leva para 1985. Digite esse ano.', r: '1985' },
        { foto: 'televisão antiga', pergunta: 'Mais uma parada: 1994. Digite esse ano.', r: '1994' }] },
      { t: 'Lembrança especial', k: 'livre', i: 'Escreva qualquer ano. Não vamos conferir se está certo nem guardar essa informação.', itens: [
        { pergunta: 'Em que ano aconteceu uma lembrança especial da sua vida?' }] },
    ],
  },
  {
    id: '3.3', c: 3, nome: 'Barra de espaço e Enter', titulo: 'Uma palavra precisa de espaço!',
    intro: ['Imagine encontrar um bilhete todo escrito sem espaços! Seria difícil de entender, não é?', 'A barra de espaço ajuda a separar as palavras.'],
    teclas: ['Espaço', 'Enter'],
    fim: 'Agora suas palavras têm espaço para respirar!',
    a: [
      { t: 'Separe a piada', k: 'separar', i: 'Escreva a frase separando as palavras com a barra de espaço, a tecla comprida embaixo das letras.', ci: true, sa: true, itens: [{ mostra: 'OCAFÉESFRIOU', r: 'O CAFÉ ESFRIOU' }] },
      { t: 'Bilhete divertido', k: 'digitar', i: 'Copie o bilhete com os espaços entre as palavras.', ci: true, sa: true, itens: [{ r: 'FUI COMPRAR PÃO E VOLTEI COM BOLO' }] },
      { t: 'Aprendendo Enter', k: 'info', p: ['A tecla Enter pode começar uma nova linha enquanto escrevemos um texto.', 'Ela é a tecla grande do lado direito das letras.'], teclas: ['Enter'] },
      { t: 'Lista de compras', k: 'enter', i: 'Escreva “Lista de compras:”, aperte Enter e escreva “Pão, leite e café.”', sa: true, itens: [{ r: 'Lista de compras:\nPão, leite e café.' }] },
    ],
  },
  {
    id: '3.4', c: 3, nome: 'Backspace e Delete', titulo: 'Opa! Uma letra entrou sem convite.',
    intro: ['Quando escrevemos alguma coisa errada, não precisamos começar tudo novamente.'],
    teclas: ['Backspace', 'Delete'],
    fim: 'Pronto! Agora, quando uma letra sair do lugar, você já sabe como corrigir.',
    a: [
      { t: 'Duas teclas para apagar', k: 'info', p: ['O cursor é a barrinha que mostra onde a próxima letra vai aparecer. Veja o que cada tecla apaga.'],
        lista: [{ k: 'Backspace', d: 'Apaga a letra que fica antes do cursor, à esquerda.' }, { k: 'Delete', d: 'Apaga a letra que fica depois do cursor, à direita, quando existe alguma.' }],
        ex: [{ antes: 'CASS', depois: 'A', leg: 'Com o cursor aqui, Backspace apaga o S da esquerda e fica CASA.' }, { antes: 'CAS', depois: 'SA', leg: 'Com o cursor aqui, Delete apaga o S da direita e fica CASA.' }],
        teclas: ['Backspace', 'Delete'] },
      { t: 'Letra sobrando', k: 'corrigir', i: 'Clique logo depois da letra que sobra e aperte Backspace. Depois, Conferir.', itens: [
        { mostra: 'CASSA', ini: 'CASSA', r: 'CASA' }, { mostra: 'BOLLO', ini: 'BOLLO', r: 'BOLO' }, { mostra: 'CAFÉÉ', ini: 'CAFÉÉ', r: 'CAFÉ' }, { mostra: 'VOVÓÓ', ini: 'VOVÓÓ', r: 'VOVÓ' }] },
      { t: 'Usando Delete', k: 'delete', i: 'O cursor já está antes da letra que sobra. Aperte Delete para retirar a letra que está sobrando.', itens: [
        { mostra: 'BOLOO DE FUBÁ', ini: 'BOLOO DE FUBÁ', cur: 4, r: 'BOLO DE FUBÁ' }] },
    ],
  },
  {
    id: '3.5', c: 3, nome: 'Shift e Caps Lock', titulo: 'Letras grandes e pequenas',
    intro: ['Algumas vezes precisamos escrever uma letra maiúscula. Podemos fazer isso segurando Shift enquanto apertamos a letra.', 'A tecla Caps Lock permite continuar escrevendo letras maiúsculas até ser desativada.'],
    teclas: ['Shift', 'CapsLock'],
    fim: 'Você já sabe quando usar letras grandes e pequenas!',
    a: [
      { t: 'Nomes conhecidos', k: 'digitar', i: 'Segure Shift e aperte a primeira letra. Solte o Shift e escreva o resto.', sa: true, itens: dig(['Maria', 'Antônio', 'Helena', 'José', 'Teresa']) },
      { t: 'Manchete de jornal', k: 'digitar', i: 'Imagine que você vai escrever uma manchete bem chamativa! Ligue o Caps Lock, escreva e desligue no final. Para o “!”, segure Shift e aperte 1.', sa: true, itens: dig(['ÚLTIMAS NOTÍCIAS!']) },
      { t: 'Plaquinhas engraçadas', k: 'digitar', i: 'Agora, duas plaquinhas. Tudo em letras grandes!', sa: true, itens: dig(['NÃO MEXA NO MEU CAFÉ!', 'PROIBIDO ROUBAR MEU BOLO!']) },
    ],
  },
  {
    id: '3.6', c: 3, nome: 'Acentos, Ç e símbolos', titulo: 'As palavrinhas ganharam acento!',
    intro: ['Algumas palavras precisam de acentos para serem escritas corretamente.', 'Vamos conhecer os mais comuns.'],
    teclas: ['´', '~', 'Ç'],
    fim: 'Agora suas palavras podem ter acentos e sinais no lugar certo!',
    a: [
      { t: 'Os acentos mais comuns', k: 'info', p: ['Para pôr acento, primeiro aperte a tecla do acento e depois a letra. Nada aparece até você apertar a letra, e isso é normal.', 'A posição dessas teclas pode mudar de um teclado para outro. Aqui aparece o teclado brasileiro mais comum.'],
        lista: [{ k: '´', d: 'Acento agudo: á, é, í, ó, ú. Aperte ´ e depois a letra.' }, { k: 'Shift + ~', d: 'Acento circunflexo: â, ê, ô. Segure Shift, aperte ~, solte e aperte a letra.' }, { k: '~', d: 'Til: ã, õ. Aperte ~ e depois a letra.' }, { k: 'Shift + ´', d: 'Acento grave: à. Segure Shift, aperte ´, solte e aperte a.' }, { k: 'Ç', d: 'Cedilha: a tecla Ç fica ao lado do L.' }],
        teclas: ['´', '~', 'Ç', 'Shift'] },
      { t: 'Palavras conhecidas', k: 'digitar', i: 'Digite com os acentos. Se precisar, veja embaixo quais teclas apertar.', itens: dig(['Café', 'Avó', 'Avô', 'Coração', 'Pão', 'Maçã', 'Criança', 'Você', 'À tarde']) },
      { t: 'Frases divertidas', k: 'digitar', i: 'Copie a frase com acentos e pontuação.', itens: dig(['O café está tão forte que acordou até o vizinho!', 'O pão sumiu, mas as migalhas entregaram o culpado.']) },
      { t: 'Onde ficam os símbolos', k: 'info', p: ['Alguns sinais aparecem apertando a tecla sozinha. Outros precisam do Shift junto.'],
        lista: [{ k: 'Shift + 2', d: '@ (arroba), usada nos endereços de e-mail.' }, { k: 'Shift + /', d: '? (interrogação), no fim das perguntas. A tecla / fica perto do Shift da direita.' }, { k: 'Shift + 1', d: '! (exclamação), para alegria ou espanto.' }, { k: '.', d: 'Ponto final, no fim da frase.' }, { k: ',', d: 'Vírgula, para uma pequena pausa.' }, { k: 'Shift + ;', d: ': (dois-pontos), antes de uma lista ou explicação.' }, { k: ';', d: 'Ponto e vírgula, para uma pausa um pouco maior.' }, { k: 'Shift + 9 e 0', d: '( ) parênteses, para um comentário à parte.' }],
        teclas: ['Shift', '2', '/', '1', '.', ',', ';', '9', '0'] },
      { t: 'Símbolos em pequenos textos', k: 'digitar', i: 'Copie o texto com o sinal no lugar certo.', itens: dig(['Você vem ao baile?', 'Que saudade!', 'Lista: pão, leite e café.', 'Cheguei cedo; o baile ainda não começou.', 'maria@exemplo.com', 'Bolo de fubá (receita da vovó).']) },
    ],
  },
  {
    id: '3.7', c: 3, nome: 'Tab e Esc', titulo: 'Duas teclas que ajudam muito',
    intro: ['Hoje vamos conhecer duas teclas pequenas que facilitam muito o dia a dia no computador: Tab e Esc.'],
    teclas: ['Tab', 'Esc'],
    fim: 'Você descobriu duas teclas que podem facilitar bastante o uso do computador!',
    a: [
      { t: 'Tecla Tab', k: 'info', p: ['A tecla Tab ajuda a passar de um campo para outro.', 'Ela é muito útil quando precisamos preencher informações em uma página.'], teclas: ['Tab'] },
      { t: 'Preenchendo um convite', k: 'tab', i: 'Clique no primeiro campo e escreva. Aperte Tab para passar ao próximo. No final, Conferir.', itens: [
        { campos: [{ l: 'Nome', r: 'Dona Maria' }, { l: 'Evento', r: 'Baile de sábado' }, { l: 'Horário', r: '19:00' }] }] },
      { t: 'Tecla Esc', k: 'info', p: ['A tecla Esc pode ajudar a fechar algumas janelas pequenas, menus e avisos.', 'Ela não fecha tudo e seu efeito depende do programa.'], teclas: ['Esc'] },
      { t: 'Fechando uma janela', k: 'esc', i: 'Um menu está aberto. Pressione Esc para fechar este menu.', itens: [{}] },
      { t: 'Desafio combinado · parte 1', k: 'esc', i: 'Um menu se abriu de novo. Feche usando Esc.', itens: [{}] },
      { t: 'Desafio combinado · parte 2', k: 'tab', i: 'Agora preencha os dois campos usando Tab para passar de um para o outro.', itens: [
        { campos: [{ l: 'Nome', r: 'Seu João' }, { l: 'Evento', r: 'Festa junina' }] }] },
    ],
  },
  {
    id: '3.8', c: 3, nome: 'Setas, Home, End e atalhos', titulo: 'Movimentando o lugar da escrita',
    intro: ['As quatro teclas com setinhas ajudam a movimentar o cursor ou escolher opções em vários programas.'],
    teclas: ['←', '→', '↑', '↓', 'Home', 'End', 'Ctrl'],
    fim: 'Parabéns! Você já conhece várias teclas importantes e pode começar a utilizá-las nas suas atividades.',
    a: [
      { t: 'Setas', k: 'teclas', i: 'Clique no fim da frase do campo. Depois aperte a seta para a esquerda 3 vezes e veja o cursor andar.', itens: [{ ini: 'Hoje tem bolo de fubá.', seq: ['←', '←', '←'] }] },
      { t: 'Home e End', k: 'info', p: ['Em muitos campos de texto, Home leva o cursor para o começo da linha e End leva para o final.'], teclas: ['Home', 'End'] },
      { t: 'Home e End', k: 'teclas', i: 'Clique na frase. Aperte Home e observe o cursor. Depois aperte End.', itens: [{ ini: 'O baile começou cedo.', seq: ['Home', 'End'] }] },
      { t: 'Ctrl e atalhos', k: 'info', p: ['Algumas teclas funcionam juntas para facilitar tarefas. Segure Ctrl e, sem soltar, aperte a outra tecla.'],
        lista: [{ k: 'Ctrl + A', d: 'Seleciona todo o texto.' }, { k: 'Ctrl + C', d: 'Copia.' }, { k: 'Ctrl + V', d: 'Cola.' }, { k: 'Ctrl + Z', d: 'Desfaz a última alteração, quando o programa permite.' }, { k: 'Ctrl + S', d: 'Salva, em muitos programas.' }],
        teclas: ['Ctrl', 'A', 'C', 'V', 'Z', 'S'] },
      { t: 'Copiar e colar uma receita', k: 'copiar', i: 'Selecione a última frase da receita arrastando o mouse por cima dela. Copie com Ctrl + C, clique no campo de baixo e cole com Ctrl + V.', itens: [
        { receita: 'Bolo de fubá da vovó\n2 xícaras de fubá, 3 ovos e 1 copo de leite.\nMisture tudo e leve ao forno por 40 minutos.', r: 'Misture tudo e leve ao forno por 40 minutos.' }] },
      { t: 'Desfazer', k: 'teclas', i: 'Clique na frase e aperte Ctrl + Z. Em muitos programas, isso desfaz a última alteração.', itens: [{ ini: 'Misture tudo e leve ao forno por 40 minutos.', seq: ['Ctrl+Z'] }] },
    ],
  },
  {
    id: '4.1', c: 4, nome: 'Ditados que atravessam gerações', titulo: 'Ditados que atravessam gerações',
    objetivo: 'Praticar letras, espaços e palavras.',
    intro: ['Algumas frases são tão conhecidas que atravessam gerações.', 'Vamos aproveitar esses ditados para treinar a digitação?'],
    teclas: [],
    fim: 'Cinco ditados digitados! Você está pegando o jeito.',
    a: [
      { t: 'Desafio', k: 'digitar', i: 'Copie a frase com os espaços, os acentos e a pontuação. Se travar em um acento, veja a dica embaixo.', itens: dig(['Quem espera sempre alcança.', 'Água mole em pedra dura, tanto bate até que fura.', 'Mais vale um pássaro na mão do que dois voando.', 'De grão em grão, a galinha enche o papo.', 'Casa de ferreiro, espeto de pau.']) },
    ],
  },
  {
    id: '4.2', c: 4, nome: 'Piadas de família', titulo: 'Piadas de família',
    objetivo: 'Praticar frases, maiúsculas e pontos finais.',
    intro: ['Agora vamos digitar algumas piadas leves. Talvez você até conheça alguma delas!'],
    teclas: [],
    fim: 'Além de treinar o teclado, você ainda ganhou algumas piadas para contar!',
    a: [
      { t: 'Desafio', k: 'digitar', i: 'Copie a piada com a pontuação.', itens: dig(['Por que o livro foi ao médico? Porque estava cheio de páginas em branco!', 'O relógio foi ao médico porque estava perdendo tempo.', 'Por que o computador foi ao médico? Porque pegou um vírus!', 'O café falou para o leite: você me completa!', 'O pão disse para a manteiga: você derrete meu coração!']) },
      { t: 'Caça aos sinais', k: 'escolha', i: 'Lembra da primeira piada? Escolha o sinal certo.', itens: [
        { pergunta: '“Por que o livro foi ao médico” termina com qual sinal?', r: '?' },
        { pergunta: '“Porque estava cheio de páginas em branco” termina com qual sinal?', r: '!' },
        { pergunta: '“O relógio foi ao médico porque estava perdendo tempo” termina com qual sinal?', r: '.' }] },
    ],
  },
];

/** Um passo da lição: apresentação, uma explicação, um exercício ou a conclusão. */
export interface Passo extends Item {
  k: TipoAtividade | 'intro' | 'fim';
  ativ?: string;
  i?: string;
  n?: number;
  tot?: number;
  ci?: boolean;
  sa?: boolean;
  p?: string[];
  lista?: { k: string; d: string }[];
  ex?: { antes: string; depois: string; leg: string }[];
  teclas?: string[];
}

export function passosDa(l: Licao): Passo[] {
  const out: Passo[] = [{ k: 'intro' }];
  if (l.pendente) return out;
  for (const a of l.a) {
    if (a.k === 'info') {
      out.push({ k: 'info', ativ: a.t, p: a.p, lista: a.lista, ex: a.ex, teclas: a.teclas });
      continue;
    }
    (a.itens ?? []).forEach((it, j) => out.push({ ...it, k: a.k, ativ: a.t, i: a.i, n: j + 1, tot: a.itens!.length, ci: !!a.ci, sa: !!a.sa }));
  }
  out.push({ k: 'fim' });
  return out;
}
