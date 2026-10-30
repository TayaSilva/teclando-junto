// Curso 5: Conhecendo o sistema.
import type { LicaoGeral } from './tipos';

export const CURSO5: LicaoGeral[] = [
  {
    id: '5.1', curso: 5, titulo: 'A área de trabalho',
    telas: [
      { img: 'area-trabalho', texto: ['Quando o computador termina de ligar, normalmente aparece uma tela com imagens e pequenos símbolos.', 'Essa tela é chamada de área de trabalho.'] },
      { img: 'icones', texto: ['Os pequenos desenhos que aparecem na área de trabalho são chamados de ícones.', 'Eles podem representar programas, pastas e arquivos.'] },
      { img: 'barra-tarefas', texto: ['Na parte inferior da tela do Windows, geralmente encontramos a barra de tarefas.', 'Ela ajuda a encontrar programas e ver quais estão abertos.'] },
    ],
    atividades: [{ k: 'sim', sim: 'desktop' }],
    conclusao: 'Agora você conhece a área de trabalho.',
  },
  {
    id: '5.2', curso: 5, titulo: 'Abrindo e fechando janelas',
    telas: [
      { img: 'janela', texto: ['Quando abrimos um programa ou uma pasta, geralmente aparece um espaço na tela chamado janela.'] },
      { img: 'janela-botoes', texto: ['No canto superior direito de muitas janelas, existem três botões importantes.'] },
      { img: 'janela-botoes-nomes', texto: ['O botão de fechar encerra aquela janela.', 'O botão de minimizar esconde a janela temporariamente.', 'O botão de maximizar faz a janela ocupar mais espaço na tela.'] },
    ],
    atividades: [{ k: 'sim', sim: 'janelas' }],
    conclusao: 'Muito bem! Você aprendeu a controlar as janelas.',
  },
  {
    id: '5.3', curso: 5, titulo: 'O que são arquivos?',
    telas: [
      { img: 'arquivos-tipos', texto: ['Um arquivo é algo que guardamos no computador.', 'Pode ser uma fotografia, um texto, um vídeo ou uma música.'] },
      { img: 'arquivo-nome', texto: ['Cada arquivo pode ter um nome.', 'Esse nome ajuda a encontrar o que estamos procurando.', 'O desenho do arquivo e a parte final do nome, depois do ponto, também ajudam a descobrir o tipo: .jpg é fotografia, .txt é texto, .mp4 é vídeo e .mp3 é música.'] },
    ],
    atividades: [{
      k: 'escolha', itens: [{
        pergunta: 'Qual destes arquivos é uma fotografia?',
        opcoes: [{ t: 'familia.jpg', img: 'arq-foto' }, { t: 'carta.txt', img: 'arq-texto' }, { t: 'viagem.mp4', img: 'arq-video' }, { t: 'musica.mp3', img: 'arq-audio' }],
        r: 0,
        certo: 'Isso mesmo! familia.jpg é uma fotografia. O final .jpg e o desenho ajudam a descobrir.',
        errado: 'Vamos tentar de novo. Olhe o desenho de cada arquivo e o final do nome, depois do ponto.',
      }],
    }],
    conclusao: 'Muito bem! Agora você sabe que cada arquivo tem um nome e um tipo.',
  },
  {
    id: '5.4', curso: 5, titulo: 'Criando pastas',
    telas: [
      { img: 'pasta-arquivos', texto: ['Uma pasta no computador ajuda a guardar e organizar arquivos.'] },
      { img: 'pastas-assuntos', texto: ['Podemos criar pastas para separar fotografias, documentos, receitas e outros assuntos.'] },
      { img: 'pasta-nome', texto: ['Uma pasta pode ter o nome que você escolher.'] },
    ],
    atividades: [{ k: 'sim', sim: 'pasta' }],
    conclusao: 'Você criou sua primeira pasta!',
  },
  {
    id: '5.5', curso: 5, titulo: 'Salvando e encontrando arquivos',
    telas: [
      { img: 'salvar', texto: ['Quando escrevemos um texto ou criamos algo no computador, podemos guardar esse trabalho.', 'Isso se chama salvar.'] },
      { img: 'onde-guardado', texto: ['Para encontrar um arquivo depois, precisamos lembrar onde ele foi guardado.'] },
    ],
    atividades: [{ k: 'sim', sim: 'salvar' }],
    conclusao: 'Agora você sabe guardar e encontrar um arquivo.',
  },
  {
    id: '5.6', curso: 5, titulo: 'Conhecendo a lixeira',
    telas: [
      { img: 'lixeira', texto: ['A lixeira é um lugar do computador para onde muitos arquivos apagados são enviados.'] },
      { img: 'lixeira-restaurar', texto: ['Se você apagar um arquivo sem querer, em muitos casos poderá recuperá-lo pela lixeira.'] },
      { img: 'lixeira-atencao', texto: ['Mas atenção: nem todo arquivo apagado pode ser recuperado.', 'Por isso, sempre confira antes de excluir algo importante.'] },
    ],
    atividades: [{ k: 'sim', sim: 'lixeira' }],
    conclusao: 'Parabéns! Você concluiu o curso sobre o sistema do computador.',
  },
];
