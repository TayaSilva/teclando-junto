// Registro de todas as lições, na ordem dos cursos. Reúne as lições novas (formato LicaoGeral)
// e as que já existiam (computador-partes e as de teclado/digitação).
import { LICOES } from '@/data/licoesTeclado';
import type { LicaoGeral } from './tipos';
import { CURSO1 } from './curso1';
import { CURSO2 } from './curso2';
import { CURSO4 } from './curso4';
import { CURSO5 } from './curso5';
import { CURSO6 } from './curso6';
import { CURSO7 } from './curso7';
import { CURSO8 } from './curso8';

export type { LicaoGeral } from './tipos';

export const LICOES_GERAIS: LicaoGeral[] = [...CURSO1, ...CURSO2, ...CURSO4, ...CURSO5, ...CURSO6, ...CURSO7, ...CURSO8];

export interface ItemPlano {
  id: string;     // "2.1"
  curso: number;
  titulo: string;
  prog: string;   // id usado no progresso
  rota: string;
}

const nova = (l: LicaoGeral): ItemPlano => ({ id: l.id, curso: l.curso, titulo: l.titulo, prog: `lic-${l.id}`, rota: `/aula/${l.id}` });
const doCurso = (n: number) => LICOES_GERAIS.filter((l) => l.curso === n).map(nova);
const teclado = (c: 3 | 4) => LICOES.filter((l) => l.c === c).map((l): ItemPlano => ({ id: l.id, curso: c, titulo: l.nome, prog: `teclado-${l.id}`, rota: `/trilhas/teclado?licao=${l.id}` }));

const partes: ItemPlano = { id: '1.2', curso: 1, titulo: 'As partes do computador', prog: 'computador-partes', rota: '/trilhas/computador/partes' };

const curso1 = doCurso(1);

// Ordem completa: 46 lições.
export const PLANO: ItemPlano[] = [
  curso1[0], partes, ...curso1.slice(1),
  ...doCurso(2),
  ...teclado(3),
  ...teclado(4), ...doCurso(4),
  ...doCurso(5), ...doCurso(6), ...doCurso(7), ...doCurso(8),
];

export const planoDoCurso = (n: number) => PLANO.filter((p) => p.curso === n);
export const itemPorId = (id: string) => PLANO.find((p) => p.id === id);
export const proximoItem = (id: string) => {
  const i = PLANO.findIndex((p) => p.id === id);
  return i >= 0 ? PLANO[i + 1] : undefined;
};
