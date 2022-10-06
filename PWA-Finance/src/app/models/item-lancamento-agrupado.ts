import { Dictionary } from "../util";
import { GrupoContas, ILancamentoAgrupado, Lancamento, PlanoContasLancamento } from "./interfaces";

export class ItemLancamentoAgrupado extends Dictionary<LancamentoAgrupado> {
  public override values(): LancamentoAgrupado[] {
    return this._values.sort((a, b) => (a.grupoConta.id ?? 0) - (b.grupoConta.id ?? 0));
  }

  public lastLctoGrupo(key: number): Date | undefined {
    let itemNew: PlanoContasLancamento | undefined = undefined;
    for (const planoConta of this[key].planosContas) {
      const data = planoConta.lancamento.data;

      if (
        !itemNew ||
        itemNew.lancamento.data.getTime() < data.getTime()) {
        itemNew = planoConta;
      }
    }

    return itemNew?.lancamento.data;
  }
}

export class LancamentoAgrupado implements ILancamentoAgrupado {
  grupoConta!: GrupoContas;
  planosContas!: PlanoContasLancamento[];

  get valor(): number {
    let soma: number = 0;
    for (const conta of this.planosContas) {
      soma += Number(conta.lancamento.valor);
    }

    return soma;
  }

  get lastDate(): Date | undefined {
    let itemNew: PlanoContasLancamento | undefined = undefined;
    for (const planoConta of this.planosContas) {
      const data = planoConta.lancamento.data;

      if (
        !itemNew ||
        itemNew.lancamento.data.getTime() < data.getTime()) {
        itemNew = planoConta;
      }
    }

    return itemNew?.lancamento.data;
  }

  constructor(grupoContas: GrupoContas | undefined) {
    if (grupoContas) this.grupoConta = grupoContas;
    this.planosContas = [];
  }

  add(planoConta: PlanoContasLancamento): void {
    if (this.planosContas.find(x => x.lancamento.id == planoConta.lancamento.id)) return;
    this.planosContas.push(planoConta);
  }

  remove(lancamento: Lancamento): boolean {
    const index = (this.planosContas.findIndex(x => x.lancamento.id === lancamento.id));
    if (index === -1) return false;

    this.planosContas.splice(index, 1);
    return true;
  }
}
