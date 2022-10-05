import { Dictionary } from "../util";
import { GrupoContas, ILancamentoAgrupado, PlanoContasLancamento } from "./interfaces";

export class ItemLancamentoAgrupado extends Dictionary<LancamentoAgrupado> {
  public override values(): LancamentoAgrupado[] {
    return this._values.sort((a, b) => (a.grupoConta.id ?? 0) - (b.grupoConta.id ?? 0));
  }

  public lastLctoGrupo(key: number): Date | undefined {
    let itemNew: PlanoContasLancamento | undefined = undefined;
    for (const planoConta of this[key].planosContas) {
      const data = planoConta.lancamentosGrupo.data;

      if (
        !itemNew ||
        itemNew.lancamentosGrupo.data.getTime() < data.getTime()) {
        itemNew = planoConta;
      }
    }

    return itemNew?.lancamentosGrupo.data;
  }
}

export class LancamentoAgrupado implements ILancamentoAgrupado {
  grupoConta!: GrupoContas;
  planosContas!: PlanoContasLancamento[];

  get valor(): number {
    let soma:number = 0;
    for (const conta of this.planosContas) {
      soma += Number(conta.lancamentosGrupo.valor);
    }

    return soma;
  }

  get lastDate(): Date | undefined{
    let itemNew: PlanoContasLancamento | undefined = undefined;
    for (const planoConta of this.planosContas) {
      const data = planoConta.lancamentosGrupo.data;

      if (
        !itemNew ||
        itemNew.lancamentosGrupo.data.getTime() < data.getTime()) {
        itemNew = planoConta;
      }
    }

    return itemNew?.lancamentosGrupo.data;
  }

  constructor(grupoContas: GrupoContas){
    this.grupoConta = grupoContas;
    this.planosContas = [];
  }
}
