// Curso 6: Navegando na internet.
import type { LicaoGeral } from './tipos';

export const CURSO6: LicaoGeral[] = [
  {
    id: '6.1', curso: 6, titulo: 'O que é a internet?',
    telas: [
      { img: 'internet-rede', texto: ['A internet conecta computadores e outros aparelhos em muitos lugares do mundo.'] },
      { img: 'internet-usos', texto: ['Com a internet, podemos encontrar receitas, ver notícias, conversar com familiares e aprender coisas novas.'] },
      { img: 'navegadores', texto: ['Para visitar páginas da internet, utilizamos um programa chamado navegador.', 'Alguns navegadores conhecidos são o Chrome, o Edge e o Firefox.'] },
    ],
    atividades: [{
      k: 'escolha', itens: [{
        pergunta: 'Qual programa utilizamos para abrir páginas na internet?',
        opcoes: [{ t: 'Navegador', img: 'navegadores' }, { t: 'Calculadora', img: 'calculadora' }, { t: 'Bloco de notas', img: 'bloco-notas' }],
        r: 0,
        certo: 'Isso mesmo! O navegador abre as páginas da internet.',
        errado: 'Vamos tentar de novo. Lembre-se: Chrome, Edge e Firefox são exemplos desse programa.',
      }],
    }],
    conclusao: 'Muito bem! Agora você sabe o que é a internet e qual programa usamos para visitá-la.',
  },
  {
    id: '6.2', curso: 6, titulo: 'Abrindo um site',
    telas: [
      { img: 'site-endereco', texto: ['Um site é um lugar que podemos visitar na internet.', 'Cada site tem um endereço.'] },
      { img: 'barra-endereco', texto: ['No navegador existe uma barra onde podemos escrever o endereço do site.'] },
      { img: 'enter-abrir', texto: ['Depois de escrever o endereço, apertamos Enter para tentar abrir a página.'] },
    ],
    atividades: [{ k: 'sim', sim: 'url' }],
    conclusao: 'Muito bem! Você abriu um site digitando o endereço.',
  },
  {
    id: '6.3', curso: 6, titulo: 'Fazendo pesquisas',
    telas: [
      { img: 'pesquisa', texto: ['Nem sempre sabemos o endereço do site que queremos encontrar.', 'Nesses casos, podemos utilizar uma ferramenta de pesquisa.'] },
      { img: 'pesquisa-pergunta', texto: ['Você pode escrever uma palavra ou uma pergunta sobre o assunto que procura.'] },
    ],
    atividades: [{ k: 'sim', sim: 'pesquisa' }],
    conclusao: 'Você aprendeu a procurar informações na internet.',
  },
  {
    id: '6.4', curso: 6, titulo: 'Conhecendo os links',
    telas: [
      { img: 'link', texto: ['Um link é uma palavra, imagem ou botão que pode levar você para outra página.'] },
      { img: 'link-destaque', texto: ['Muitas vezes, os links aparecem destacados.', 'Quando clicamos neles, o navegador pode abrir outra página.'] },
    ],
    atividades: [{ k: 'sim', sim: 'link' }],
    conclusao: 'Muito bem! Você clicou em um link e abriu outra página.',
  },
  {
    id: '6.5', curso: 6, titulo: 'Abrindo abas',
    telas: [
      { img: 'abas', texto: ['Você pode visitar mais de uma página ao mesmo tempo usando abas.'] },
      { img: 'abas-topo', texto: ['As abas aparecem normalmente na parte superior do navegador.', 'Cada aba pode mostrar uma página diferente.'] },
    ],
    atividades: [{ k: 'sim', sim: 'abas' }],
    conclusao: 'Agora você já sabe utilizar mais de uma aba.',
  },
  {
    id: '6.6', curso: 6, titulo: 'Encontrando informações confiáveis',
    telas: [
      { img: 'noticia-duvida', texto: ['Nem tudo o que aparece na internet é verdadeiro.'] },
      { img: 'noticia-fonte', texto: ['Antes de acreditar em uma notícia, observe quem publicou e procure confirmar a informação em fontes conhecidas.'] },
      { img: 'pedido-dinheiro', texto: ['Se uma página pedir dinheiro ou informações pessoais de forma inesperada, tenha cuidado.'] },
    ],
    atividades: [{
      k: 'escolha', itens: [{
        pergunta: 'Qual notícia apresenta mais informações para conferir se o conteúdo é verdadeiro?',
        cartoes: [
          { titulo: 'Notícia 1', linhas: ['Prefeitura abre vacinação para idosos na segunda-feira', 'Fonte: Agência de Notícias da Cidade · 12/03/2025', 'Os postos abrem das 8h às 16h. Informações no site oficial da prefeitura.'] },
          { titulo: 'Notícia 2', linhas: ['URGENTE!!! ACABOU DE ACONTECER!!!', 'Compartilhe com todos antes que apaguem!', '(sem autor, sem data e sem fonte)'] },
        ],
        opcoes: [{ t: 'Notícia 1' }, { t: 'Notícia 2' }],
        r: 0,
        certo: 'Muito bem! A primeira notícia mostra a fonte, a data e informações que podemos conferir.',
        errado: 'Olhe de novo: qual delas diz quem publicou, quando e onde conferir?',
      }],
    }],
    conclusao: 'Parabéns! Você terminou o curso de navegação na internet.',
  },
];
