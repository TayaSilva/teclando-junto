<script setup lang="ts">
import { computed, ref, watch } from 'vue';

// Ilustração de cada tela: figuras grandes com uma legenda escrita, para quem enxerga pouco
// ou usa leitor de tela. As chaves vêm de src/data/cursos/*.ts.
// e = figuras, t = legenda (também usada como texto alternativo).
const props = defineProps<{ nome: string; semLegenda?: boolean }>();

const I: Record<string, { e: string; t: string }> = {
  // Curso 1
  'pessoa-computador': { e: '🧓🖥️', t: 'Uma pessoa idosa sentada diante de um computador' },
  'fotos-familia': { e: '🖥️👨‍👩‍👧', t: 'Computador mostrando fotos da família' },
  'usos-quatro': { e: '🖼️🎵📰📹', t: 'Fotos, músicas, notícias e videochamadas' },
  'tipos-computador': { e: '🖥️💻', t: 'Computador de mesa e notebook, lado a lado' },
  'historia-computador': { e: '🏢➡️🖥️➡️💻', t: 'Duas operadoras ligando cabos em um dos primeiros computadores, que ocupava uma sala inteira' },
  'desktop-pecas': { e: '🖥️⌨️🖱️', t: 'Computador de mesa: monitor, gabinete, teclado e mouse' },
  tablet: { e: '📱', t: 'Tablet' },
  'notebook-portatil': { e: '💻🔋', t: 'Notebook aberto: tela, teclado e touchpad no mesmo aparelho' },
  'comp-mesa': { e: '🖥️⌨️', t: 'Computador de mesa' },
  ventilador: { e: '🌀', t: 'Ventilador' },
  televisao: { e: '📺', t: 'Televisão' },
  'entradas-usb': { e: '🔌💻', t: 'Conector USB: a ponta metálica que se encaixa na entrada do computador' },
  pendrive: { e: '💾', t: 'Pendrive' },
  'entradas-varias': { e: '🔌💻🖥️', t: 'Entradas de um notebook e de um computador de mesa, com o nome e a função de cada uma' },
  'carregador-celular': { e: '🔌📱', t: 'Carregador do celular: fonte com entrada USB e cabo USB' },
  'dispositivos-usb': { e: '🖱️⌨️🎧', t: 'Aparelhos que podem ser ligados ao computador pela entrada USB' },
  'cuidados-usb': { e: '🔌✅❌', t: 'Conector USB: encaixe do lado certo; se não entrar, vire e tente de novo' },
  'teclado-foto': { e: '⌨️', t: 'Teclado' },
  conectores: { e: '🖱️⌨️🔌', t: 'Conector USB, usado em mouses, pendrives, fones de ouvido e cabos de carregador' },
  mouse: { e: '🖱️', t: 'Mouse' },
  monitor: { e: '🖥️', t: 'Monitor' },
  'botao-energia': { e: '⏻', t: 'Botão de ligar: um círculo com um traço' },
  iniciando: { e: '🖥️⏳', t: 'Computador iniciando: espere um pouquinho' },
  'area-trabalho': { e: '🖥️🗂️', t: 'Área de trabalho com atalhos' },
  'menu-desligar': { e: '⊞➡️⏻➡️✅', t: 'Menu Iniciar, botão de energia e Desligar' },
  // Curso 2
  'mouse-foto': { e: '🖱️', t: 'Mouse: aparelho que move a setinha na tela' },
  'touchpad-foto': { e: '💻👆', t: 'Touchpad: a área lisa do notebook, abaixo do teclado' },
  'mouse-touchpad': { e: '🖱️💻', t: 'Mouse, aparelho separado, e touchpad, área do notebook' },
  'mouse-lados': { e: '👈🖱️👉', t: 'Mouse com botão esquerdo, botão direito e roda no meio' },
  'mao-esquerda': { e: '🤚🖱️', t: 'Pessoa usando o mouse com a mão esquerda ao lado de um notebook' },
  'clique-esquerdo': { e: '👈🖱️', t: 'Clique com o botão esquerdo: escolhe e abre' },
  'clique-direito': { e: '🖱️👉📋', t: 'Clique com o botão direito: abre uma lista de opções' },
  'mao-mouse': { e: '🤚🖱️', t: 'Mão sobre o mouse, de modo confortável' },
  'ponteiro-move': { e: '⬅️🖱️➡️', t: 'Mover o mouse para a esquerda e para a direita' },
  ponteiro: { e: '🖥️↖', t: 'A setinha (ponteiro) na tela' },
  'botao-esquerdo': { e: '🖱️👈', t: 'Botão esquerdo do mouse' },
  clicar: { e: '↖🖱️1x', t: 'Colocar a setinha no objeto e clicar uma vez' },
  'clicar-usos': { e: '🔘📄📂', t: 'Um clique escolhe um botão, seleciona um objeto ou abre uma opção' },
  pasta: { e: '📁', t: 'Uma pasta' },
  'clique-duplo': { e: '🖱️2x📁', t: 'Dois cliques seguidos sobre a pasta' },
  'sem-pressa': { e: '😊🕰️', t: 'Sem pressa: tente quantas vezes quiser' },
  'arrastar-objetos': { e: '🍎➡️📦', t: 'Movimentar objetos na tela' },
  'arrastar-segurar': { e: '↖🍎🖱️', t: 'Apertar o botão esquerdo e segurar' },
  'arrastar-soltar': { e: '🍎➡️📦✋', t: 'Mover e soltar o botão no lugar desejado' },
  'pagina-longa': { e: '📄⬇️', t: 'Página com mais informações do que cabe na tela' },
  'roda-mouse': { e: '🖱️🎡', t: 'Roda de rolagem no meio do mouse' },
  'roda-giro': { e: '🔼🖱️🔽', t: 'Girar a rodinha para baixo e para cima' },
  // Curso 4
  frases: { e: '✍️💬', t: 'Uma frase é formada por palavras que transmitem uma ideia' },
  'barra-espaco': { e: '⌨️␣', t: 'Barra de espaço entre as palavras' },
  pontuacao: { e: '. , ? !', t: 'Sinais de pontuação' },
  'ponto-final': { e: '📝.', t: 'O ponto final termina a frase' },
  'interrogacao-exclamacao': { e: '❓❗', t: 'Ponto de interrogação e ponto de exclamação' },
  'corrigir-palavra': { e: 'CASSA ➡️ CASA', t: 'Corrigir uma letra a mais' },
  'corrigir-cursor': { e: '⌫ I ⌦', t: 'Clicar no lugar e apagar ou acrescentar letras' },
  mensagem: { e: '💬✍️', t: 'Escrever uma mensagem' },
  'mensagem-carinho': { e: '💌🙂', t: 'Uma mensagem carinhosa para alguém' },
  // Curso 5
  icones: { e: '📁📄🖼️', t: 'Ícones: programas, pastas e arquivos' },
  'barra-tarefas': { e: '🖥️▁⊞▁', t: 'Barra de tarefas na parte de baixo da tela' },
  janela: { e: '🪟', t: 'Uma janela aberta na tela' },
  'janela-botoes': { e: '— ▢ ✕', t: 'Os três botões no canto superior direito da janela' },
  'janela-botoes-nomes': { e: '— ▢ ✕', t: 'Minimizar, maximizar e fechar' },
  'arquivos-tipos': { e: '🖼️📝🎬🎵', t: 'Fotografia, texto, vídeo e música' },
  'arquivo-nome': { e: '📄familia.jpg', t: 'Nome do arquivo e final do nome' },
  'arq-foto': { e: '🖼️', t: 'Fotografia: familia.jpg' },
  'arq-texto': { e: '📝', t: 'Texto: carta.txt' },
  'arq-video': { e: '🎬', t: 'Vídeo: viagem.mp4' },
  'arq-audio': { e: '🎵', t: 'Música: musica.mp3' },
  'pasta-arquivos': { e: '📁📄🖼️', t: 'Pasta guardando arquivos' },
  'pastas-assuntos': { e: '📁🖼️📁📄📁🍲', t: 'Pastas de fotografias, documentos e receitas' },
  'pasta-nome': { e: '📁✏️', t: 'Uma pasta com o nome que você escolher' },
  salvar: { e: '📝💾', t: 'Salvar o trabalho' },
  'onde-guardado': { e: '💾❓📁', t: 'Lembrar onde o arquivo foi guardado' },
  lixeira: { e: '🗑️', t: 'Lixeira' },
  'lixeira-restaurar': { e: '🗑️↩️📄', t: 'Recuperar um arquivo pela lixeira' },
  'lixeira-atencao': { e: '🗑️⚠️', t: 'Atenção: nem todo arquivo apagado pode ser recuperado' },
  // Curso 6
  'internet-rede': { e: '🌐💻📱🖥️', t: 'A internet conecta aparelhos em muitos lugares do mundo' },
  'internet-usos': { e: '🍲📰👪📚', t: 'Receitas, notícias, família e aprendizado' },
  navegadores: { e: '🌐 Chrome · Edge · Firefox', t: 'Navegadores: Chrome, Edge e Firefox' },
  calculadora: { e: '🧮', t: 'Calculadora' },
  'bloco-notas': { e: '🗒️', t: 'Bloco de notas' },
  'site-endereco': { e: '🌐 www.exemplo.com', t: 'Cada site tem um endereço' },
  'barra-endereco': { e: '🔒 www.exemplo.com', t: 'Barra de endereço do navegador' },
  'enter-abrir': { e: 'www.exemplo.com ⏎', t: 'Apertar Enter para abrir a página' },
  pesquisa: { e: '🔎🌐', t: 'Ferramenta de pesquisa' },
  'pesquisa-pergunta': { e: '🔎 Como cuidar de plantas?', t: 'Escrever uma pergunta na pesquisa' },
  link: { e: '🔗', t: 'Um link' },
  'link-destaque': { e: 'Receitas de bolo ↖', t: 'Links aparecem destacados' },
  abas: { e: '🗂️🌐', t: 'Abas no navegador' },
  'abas-topo': { e: '[ Aba 1 ][ Aba 2 ] +', t: 'Abas na parte de cima do navegador' },
  'noticia-duvida': { e: '📰❓', t: 'Nem tudo o que aparece na internet é verdadeiro' },
  'noticia-fonte': { e: '📰✅ Fonte · Data', t: 'Observar quem publicou e confirmar em fontes conhecidas' },
  'pedido-dinheiro': { e: '💳⚠️', t: 'Cuidado com páginas que pedem dinheiro ou dados pessoais' },
  // Curso 7
  'email-carta': { e: '✉️➡️💻', t: 'E-mail: uma mensagem pela internet, como uma carta' },
  'email-endereco': { e: '📧 ana@exemplo.com', t: 'Endereço de e-mail' },
  'email-partes': { e: '👤 De · 📌 Assunto · 📝 Texto', t: 'Quem enviou, o assunto e o texto' },
  'email-novo': { e: '✉️✏️', t: 'Escrever um e-mail' },
  'email-destinatario': { e: 'Para: ana@exemplo.com', t: 'Campo Destinatário' },
  'email-assunto': { e: 'Assunto: Bom dia', t: 'Campo Assunto' },
  'email-mensagem': { e: '📝 Olá, Ana!', t: 'Espaço da mensagem' },
  'email-anexo': { e: '✉️🖼️', t: 'E-mail com fotografia' },
  'email-anexo-nome': { e: '✉️📎', t: 'Anexos: arquivos enviados junto com a mensagem' },
  clipe: { e: '📎', t: 'O botão para anexar tem o desenho de um clipe' },
  videochamada: { e: '👩💻🙂', t: 'Videochamada: conversar com imagem e som' },
  camera: { e: '📷🙂', t: 'A câmera mostra o seu rosto' },
  microfone: { e: '🎤🗣️', t: 'O microfone leva a sua voz' },
  'encerrar-chamada': { e: '📞🔴', t: 'Botão de encerrar a chamada' },
  'caixa-entrada': { e: '📥✉️', t: 'Caixa de entrada' },
  'email-abrir': { e: '✉️👀', t: 'Abrir a mensagem para ler' },
  'email-responder': { e: '↩️✉️', t: 'Botão Responder' },
  'email-cuidado': { e: '✉️⚠️🔑', t: 'Mensagem inesperada pedindo senhas ou dados: não responda antes de verificar' },
  // Curso 8
  'escudo-dados': { e: '🛡️🧓', t: 'Cuidar das informações pessoais' },
  'dados-sensiveis': { e: '🪪🏦🔢🔑', t: 'Documentos, dados bancários, códigos e senhas' },
  'pedido-inesperado': { e: '📞❓🤔', t: 'Pedido inesperado de informações: sem pressa para responder' },
  'senha-chave': { e: '🔑🔒', t: 'A senha funciona como uma chave' },
  'senha-forte': { e: 'Jardim!Montanha7Lua', t: 'Exemplo de senha longa e difícil de adivinhar' },
  'senha-segredo': { e: '🤫🔑', t: 'Não compartilhe senhas nem códigos' },
  'golpe-mensagem': { e: '💬🎣', t: 'Mensagens usadas para enganar: golpes' },
  'golpista-disfarce': { e: '🎭👪🏦', t: 'O golpista pode fingir ser familiar, banco ou empresa' },
  urgencia: { e: '⏰🚨', t: 'Cuidado com pedidos urgentes' },
  'link-falso': { e: '🔗🪤', t: 'Alguns links levam a páginas falsas' },
  'link-quem': { e: '🔗❓👤', t: 'Verifique quem enviou e para onde o link leva' },
  'arquivo-desconhecido': { e: '📎🙅', t: 'Cuidado com arquivos de pessoas desconhecidas' },
  'golpe-banco': { e: '🏦🎭💸', t: 'Falso funcionário de banco pedindo dinheiro' },
  'golpe-parente': { e: '📱🎭👪', t: 'Falso familiar pedindo transferência urgente' },
  'confirmar-contato': { e: '📞✅👪', t: 'Confirme por outro contato que você já conhece' },
  'pix-nome': { e: '💸👤✅', t: 'Antes do Pix, confira o nome de quem vai receber' },
  'mensagem-estranha': { e: '💬🤨', t: 'Mensagem estranha: não precisa responder logo' },
  'parar-ler': { e: '✋📖', t: 'Pare e leia com calma' },
  'pessoa-confianca': { e: '🧓🤝🧑', t: 'Procure uma pessoa de confiança ou o canal oficial' },
  'ligar-banco': { e: '🏦📞🚨', t: 'Já informou a senha ou pagou? Fale logo com o banco pelo canal oficial' },
};

// Fotos reais (public/img): quando existe, a foto substitui as figuras.
const FOTOS: Record<string, string> = {
  'notebook-portatil': 'img/notebook.jpg',
  'desktop-pecas': 'img/desktop.png',
  tablet: 'img/tablet.png',
  'historia-computador': 'img/historia.jpg',
  'pessoa-computador': 'img/introducao.png',
  'mouse-foto': 'img/mouse.png',
  'mouse-lados': 'img/mouse-lados.png',
  'mao-esquerda': 'img/mao-esquerda.png',
  'clique-esquerdo': 'img/clique-esquerdo.png',
  'clique-direito': 'img/clique-direito.png',
  'touchpad-foto': 'img/touchpad.png',
  'mouse-touchpad': 'img/mouse-e-mousepad.png',
  'entradas-usb': 'img/usb.jpg',
  'entradas-varias': 'img/entradas.jpg',
  conectores: 'img/usb.jpg',
  'tipos-computador': 'img/desktop-notebook.png',
  'fotos-familia': 'img/para-que-serve.png',
  'usos-quatro': 'img/usos-cotidiano.png',
  pendrive: 'img/pendrive.png',
  mouse: 'img/mouse.png',
  'carregador-celular': 'img/carregador.png',
  'dispositivos-usb': 'img/dispositivos-usb.png',
  'cuidados-usb': 'img/cuidados-usb.png',
  'teclado-foto': 'img/teclado.png',
  iniciando: 'img/iniciando.png',
  'area-trabalho': 'img/area-trabalho.png',
  'menu-desligar': 'img/desligar.png',
};
const LARGAS: string[] = []; // fotos que usariam a largura toda (hoje todas seguem o mesmo tamanho)
const SEM_LEGENDA = ['pessoa-computador', 'fotos-familia', 'usos-quatro', 'carregador-celular', 'dispositivos-usb', 'cuidados-usb']; // fotos que dispensam a legenda escrita
const mostrarLegenda = computed(() => !props.semLegenda && !(foto.value && SEM_LEGENDA.includes(props.nome))); // fotos com legendas escritas: usam a largura toda
const falhou = ref(false);
watch(() => props.nome, () => { falhou.value = false; });
const foto = computed(() => (FOTOS[props.nome] && !falhou.value ? import.meta.env.BASE_URL + FOTOS[props.nome] : ''));

const f = computed(() => I[props.nome] ?? { e: '🖥️', t: 'Ilustração da lição' });
// Texto longo vira legenda grande; sequências de figuras ficam em destaque.
const soFiguras = computed(() => /^[^A-Za-zÀ-ú]{1,24}$/u.test(f.value.e));
</script>

<template>
  <figure class="m-0 flex flex-col items-center gap-2 rounded-2xl border-2 border-borda bg-pri-claro p-4 text-center" role="img" :aria-label="f.t">
    <img v-if="foto" :src="foto" alt="" @error="falhou = true" class="w-full rounded-xl bg-white" :class="[LARGAS.includes(nome) ? '' : 'max-w-[420px]', semLegenda ? 'aspect-[4/3] object-contain' : '']" />
    <span v-else aria-hidden="true" class="leading-tight font-bold break-words" :class="soFiguras ? 'text-[3.2rem] sm:text-[4rem]' : 'text-[1.6rem] sm:text-[2rem]'">{{ f.e }}</span>
    <figcaption v-if="mostrarLegenda" class="text-[0.95rem] font-bold">{{ f.t }}</figcaption>
  </figure>
</template>
