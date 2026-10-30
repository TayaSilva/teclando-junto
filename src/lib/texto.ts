// Utilidades de texto para os exercícios de digitação.

export interface OpcoesComparacao {
  /** aceita sem acento */
  sa?: boolean;
  /** ignora maiúsculas/minúsculas */
  ci?: boolean;
}

export const tira = (s: string) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');

export function norm(s: string, it: OpcoesComparacao, final: boolean): string {
  let x = (s || '').replace(/\r/g, '');
  if (final) x = x.replace(/\s+$/, '');
  if (it.sa) x = tira(x);
  if (it.ci) x = x.toUpperCase();
  return x;
}

export function dicaAcento(c: string): string {
  const l = c.toLowerCase();
  if ('áéíóú'.includes(l)) return 'Aperte a tecla ´ e depois a letra.';
  if ('âêô'.includes(l)) return 'Segure Shift, aperte ~, solte e depois aperte a letra.';
  if ('ãõ'.includes(l)) return 'Aperte a tecla ~ e depois a letra.';
  if (l === 'à') return 'Segure Shift, aperte ´, solte e depois aperte a letra A.';
  if (l === 'ç') return 'Use a tecla Ç, ao lado do L.';
  return '';
}

/** Explica o primeiro erro em linguagem simples. */
export function explica(r: string, v: string, it: OpcoesComparacao): string {
  const a = (r || '').replace(/\s+$/, '');
  const b = (v || '').replace(/\r/g, '').replace(/\s+$/, '');
  const igual = (x: string, y: string) => norm(x, it, false) === norm(y, it, false);
  if (!b.length) return 'O campo ainda está vazio. Clique nele e comece a digitar.';
  let i = 0;
  while (i < a.length && i < b.length && igual(a[i], b[i])) i++;
  if (i >= a.length) return `Tem algo sobrando no final: “${b.slice(i)}”. Use Backspace para apagar.`;
  if (i >= b.length) return `Está quase! Ainda falta escrever: “${a.slice(i)}”.`;
  const ce = a[i];
  const cv = b[i];
  const antes = a.slice(Math.max(0, i - 10), i).trim();
  const ctx = antes ? ` depois de “${antes}”` : ' no começo';
  if (ce === '\n') return `Aqui era para apertar Enter e começar uma nova linha${ctx}.`;
  if (cv === '\n') return `Tem uma linha nova sobrando${ctx}. Use Backspace para voltar.`;
  if (ce === ' ') return `Faltou um espaço${ctx}. Use a barra de espaço, a tecla comprida embaixo.`;
  if (cv === ' ') return `Tem um espaço a mais${ctx}. Use Backspace para apagar.`;
  if (tira(ce).toLowerCase() === tira(cv).toLowerCase()) {
    if (ce.toLowerCase() !== cv.toLowerCase()) {
      if (tira(ce) === ce) return `A letra “${cv}” não leva acento aqui${ctx}.`;
      return `Faltou o acento certo: era “${ce}”${ctx}. ${dicaAcento(ce)}`;
    }
    if (ce === ce.toUpperCase()) return `Aqui a letra é maiúscula: “${ce}”${ctx}. Segure Shift e aperte a letra.`;
    return `Aqui a letra é minúscula: “${ce}”${ctx}. Veja se o Caps Lock ficou ligado.`;
  }
  return `Era “${ce}”, mas apareceu “${cv}”${ctx}.`;
}

/** Quais teclas do teclado ABNT2 produzem o caractere. */
export function teclasDe(ch: string, misto: boolean): string[] {
  if (ch === ' ') return ['Espaço'];
  if (ch === '\n') return ['Enter'];
  const l = ch.toLowerCase();
  const acc: Record<string, string[]> = { á: ['´'], é: ['´'], í: ['´'], ó: ['´'], ú: ['´'], à: ['Shift', '´'], â: ['Shift', '~'], ê: ['Shift', '~'], ô: ['Shift', '~'], ã: ['~'], õ: ['~'] };
  if (acc[l]) return [...acc[l], tira(l).toUpperCase()];
  if (l === 'ç') return ['Ç'];
  if (/[a-z]/.test(l)) {
    const up = l.toUpperCase();
    return misto && ch === up ? ['Shift', up] : [up];
  }
  if (/[0-9]/.test(ch)) return [ch];
  const sym: Record<string, string[]> = { '?': ['Shift', '/'], '!': ['Shift', '1'], '@': ['Shift', '2'], '(': ['Shift', '9'], ')': ['Shift', '0'], ':': ['Shift', ';'], ';': [';'], ',': [','], '.': ['.'], '-': ['-'] };
  return sym[ch] || [];
}

/** Converte o evento de teclado no nome da tecla do desenho ABNT2. */
export function idDe(e: KeyboardEvent): string | null {
  const c = e.code || '';
  if (c.startsWith('Key')) return c.slice(3);
  if (c.startsWith('Digit')) return c.slice(5);
  const m: Record<string, string> = {
    Space: 'Espaço', Enter: 'Enter', NumpadEnter: 'Enter', Backspace: 'Backspace', Delete: 'Delete', Tab: 'Tab',
    ShiftLeft: 'Shift', ShiftRight: 'Shift', CapsLock: 'CapsLock', Escape: 'Esc', ControlLeft: 'Ctrl', ControlRight: 'Ctrl',
    ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓', Home: 'Home', End: 'End',
    BracketLeft: '´', BracketRight: '[', Quote: '~', Semicolon: 'Ç', Backslash: ']', Comma: ',', Period: '.',
    Slash: ';', IntlRo: '/', Minus: '-', Equal: '=', IntlBackslash: '\\',
  };
  return m[c] ?? null;
}

export const nomeTecla = (d: string) => (d === 'CapsLock' ? 'Caps Lock' : d);
