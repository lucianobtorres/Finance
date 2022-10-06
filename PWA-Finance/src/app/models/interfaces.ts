
export interface GrupoContas {
  id?: number;
  sigla: string;
  title: string;
}

export interface PlanoContas {
  id?: number;
  grupoContasId: number | undefined;
  title: string;
}

export interface MeioMovimentacao {
  id?: number;
  sigla: string;
  title: string;
  entrada: boolean;
}

export interface Lancamento {
  id?: number;
  planoContasId: number | undefined;
  data: Date;
  desc: string;
  valor: number;
  meioMovimentacaoId: number | undefined;
}

export interface ItemLancamento {
  grupoConta: GrupoContas,
  planoConta: PlanoContas,
  lancamento: Lancamento,
  meioMovimentacao: MeioMovimentacao
}

export interface PlanoContasLancamento {
  planoConta: PlanoContas,
  lancamento: Lancamento,
  meioMovimentacao: MeioMovimentacao,
}

export interface ILancamentoAgrupado {
  grupoConta: GrupoContas,
  planosContas: PlanoContasLancamento[]
}
