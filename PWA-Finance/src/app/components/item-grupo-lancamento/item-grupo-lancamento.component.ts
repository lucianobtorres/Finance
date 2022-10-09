import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanoContasLancamento } from 'src/app/models/interfaces';
import { LancamentoAgrupado } from 'src/app/models/item-lancamento-agrupado';

@Component({
  selector: 'fi-item-grupo-lancamento',
  templateUrl: './item-grupo-lancamento.component.html',
  styleUrls: ['./item-grupo-lancamento.component.scss']
})
export class ItemGrupoLancamentoComponent {
  @Input() itemGrupo!: LancamentoAgrupado;
  @Output() public removeLancamento = new EventEmitter<number>();
  @Output() public realizar = new EventEmitter<number>();

  public hoje: Date;

  constructor() {
    this.hoje = new Date();
    this.hoje.setHours(0, 0, 0, 0);
  }

  getLancamentos(): PlanoContasLancamento[] {
    return this.itemGrupo.planosContas.sort((a, b) => a.lancamento.data.getTime() - b.lancamento.data.getTime());
  }
}
