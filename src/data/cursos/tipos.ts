// Modelo das lições novas (cursos 1, 2, 4, 5, 6, 7 e 8), no formato "tela a tela" da SPEC.
// Os textos de cada tela são parágrafos; img é o nome de uma ilustração (Ilustracao.vue).

export interface Tela {
  titulo?: string;
  texto: string[];
  img: string;
  largo?: boolean; // imagem com muito texto: ocupa a largura toda, abaixo da explicação
}

export interface CartaoTexto {
  titulo?: string;
  linhas: string[];
  img?: string;
}

export interface ItemEscolha {
  pergunta: string;
  opcoes: { t: string; img?: string }[];
  r: number;               // índice da opção certa
  certo: string;
  errado: string;
  cartoes?: CartaoTexto[]; // mensagem, e-mail ou notícia mostrada junto da pergunta
  aviso?: string;          // observação mostrada depois do acerto
}

export interface ItemDigitar {
  r: string;               // texto esperado
  mostra?: string;         // texto mostrado, quando difere do esperado
  ini?: string;            // texto inicial do campo (para corrigir)
  img?: string;
  rotulo?: string;
}

export type Atividade =
  | { k: 'escolha'; instrucao?: string; itens: ItemEscolha[] }
  | { k: 'digitar'; instrucao: string; itens: ItemDigitar[]; ignorarCaixa?: boolean; livre?: boolean; opcional?: boolean }
  | { k: 'ponteiro' } | { k: 'clique' } | { k: 'cliqueduplo' } | { k: 'arrastar' } | { k: 'rolagem' }
  | { k: 'mensagem' }
  | { k: 'sim'; sim: 'computador' | 'desktop' | 'janelas' | 'pasta' | 'salvar' | 'lixeira'
      | 'url' | 'pesquisa' | 'link' | 'abas' | 'email-escrever' | 'email-anexo' | 'videochamada' | 'email-responder' };

export interface LicaoGeral {
  id: string;              // "2.1"
  curso: number;
  titulo: string;
  telas: Tela[];
  atividades: Atividade[];
  conclusao: string;
}
