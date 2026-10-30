// Trilhas básicas (sem custo), montadas a partir de PLANO (data/cursos).
// licoes: ids usados no progresso. total: número de lições.
import { planoDoCurso } from '@/data/cursos';

export interface Trilha {
  n: number;
  titulo: string;
  desc: string;
  rota: string | null;
  licoes: string[];
  total: number;
}

const DADOS: { n: number; titulo: string; desc: string }[] = [
  { n: 1, titulo: 'Conhecendo o computador', desc: 'O que é um computador, suas partes, portas USB, ligar e desligar.' },
  { n: 2, titulo: 'Aprendendo a usar o mouse', desc: 'Mover a setinha, clicar, clicar duas vezes, arrastar e rolar.' },
  { n: 3, titulo: 'Conhecendo o teclado', desc: 'Letras, números, Enter, Apagar, acentos e símbolos.' },
  { n: 4, titulo: 'Praticando digitação', desc: 'Ditados, piadas, frases, pontuação, correção e mensagens.' },
  { n: 5, titulo: 'Conhecendo o sistema', desc: 'Janelas, pastas, arquivos e lixeira, em um ambiente de treino.' },
  { n: 6, titulo: 'Navegando na internet', desc: 'Navegador, endereço, pesquisa, links, abas e informações confiáveis.' },
  { n: 7, titulo: 'Comunicação digital', desc: 'E-mail, anexos, videochamada e respostas.' },
  { n: 8, titulo: 'Segurança digital', desc: 'Senhas, golpes comuns, links suspeitos e o que fazer.' },
];

export const TRILHAS: Trilha[] = DADOS.map((d) => {
  const itens = planoDoCurso(d.n);
  return { ...d, rota: itens[0].rota, licoes: itens.map((i) => i.prog), total: itens.length };
});

/** Rota da próxima lição ainda não concluída da trilha (ou da primeira, se tudo estiver feito). */
export function rotaDaTrilha(t: Trilha, foiConcluida: (id: string) => boolean): string {
  const itens = planoDoCurso(t.n);
  return (itens.find((i) => !foiConcluida(i.prog)) ?? itens[0]).rota;
}

export const TOTAL_LICOES = TRILHAS.reduce((s, t) => s + t.total, 0);

// Módulos extras (pagos), liberados depois da Trilha 8.
export const PRECO_MODULO = 5;
export const PRECO_PACOTE = 26;

export interface Extra {
  n: number;
  icone: string;
  titulo: string;
  resumo: string;
  desc: string;
  itens: string[];
}

export const EXTRAS: Extra[] = [
  { n: 9, icone: 'pessoas', titulo: 'Redes sociais com segurança', resumo: 'Família, fotos e privacidade.', desc: 'Acompanhe a família e os amigos sem expor sua vida para estranhos.', itens: ['Criar um perfil e adicionar contatos', 'Ver e comentar fotos da família', 'Escolher quem pode ver o que você publica', 'Bloquear e denunciar perfis estranhos'] },
  { n: 10, icone: 'checar', titulo: 'É verdade ou é fake news?', resumo: 'Como conferir antes de compartilhar.', desc: 'Aprenda a conferir uma notícia antes de acreditar ou compartilhar.', itens: ['Quem publicou e quando foi publicado', 'Títulos alarmantes e correntes de mensagem', 'Fotos e vídeos tirados de contexto', 'Como usar sites de checagem de fatos'] },
  { n: 11, icone: 'banco', titulo: 'Banco e Pix sem medo', resumo: 'Saldo, Pix, comprovante e golpes.', desc: 'Resolva as coisas do banco pela internet e reconheça os golpes mais comuns.', itens: ['Ver saldo e extrato', 'Fazer e receber um Pix, passo a passo', 'Guardar o comprovante', 'Golpe do falso parente e da falsa central'] },
  { n: 12, icone: 'documento', titulo: 'Serviços públicos pela internet', resumo: 'Aposentadoria, agendamentos e documentos.', desc: 'Evite filas resolvendo pela internet o que antes exigia ir até um balcão.', itens: ['Criar e proteger sua conta nos sites do governo', 'Consultar aposentadoria e benefícios', 'Agendar atendimentos', 'Tirar a segunda via de documentos e contas'] },
  { n: 13, icone: 'saude', titulo: 'Saúde digital', resumo: 'Consultas, exames e receitas pela internet.', desc: 'Cuide da saúde usando a internet a seu favor.', itens: ['Marcar consultas e exames pela internet', 'Participar de uma consulta por vídeo', 'Abrir resultados de exames e receitas digitais', 'Desconfiar de remédios milagrosos'] },
  { n: 14, icone: 'sacola', titulo: 'Compras pela internet', resumo: 'Lojas confiáveis, pagamento e devolução.', desc: 'Compre com segurança e saiba o que fazer se algo der errado.', itens: ['Reconhecer uma loja confiável', 'Comparar preço e frete', 'Pagar com segurança', 'Trocar, devolver e reclamar'] },
];

export const reais = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
