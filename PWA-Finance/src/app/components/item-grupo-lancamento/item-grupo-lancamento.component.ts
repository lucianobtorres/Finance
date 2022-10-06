import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LancamentoAgrupado } from 'src/app/models/item-lancamento-agrupado';

@Component({
  selector: 'fi-item-grupo-lancamento',
  templateUrl: './item-grupo-lancamento.component.html',
  styleUrls: ['./item-grupo-lancamento.component.scss']
})
export class ItemGrupoLancamentoComponent {
  @Input() itemGrupo!: LancamentoAgrupado;
  @Output() public removeLancamento = new EventEmitter<number>();
}
