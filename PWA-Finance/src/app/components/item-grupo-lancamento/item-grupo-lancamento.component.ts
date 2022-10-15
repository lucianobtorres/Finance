import { Component, EventEmitter, Input, Output } from '@angular/core';
import { endOfToday, startOfToday } from 'date-fns';
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

  public inicioHoje = startOfToday();
  public finalHoje = endOfToday();

  getLancamentos(): PlanoContasLancamento[] {
    return this.itemGrupo.planosContas.sort((a, b) => a.lancamento.data.getTime() - b.lancamento.data.getTime());
  }
}
