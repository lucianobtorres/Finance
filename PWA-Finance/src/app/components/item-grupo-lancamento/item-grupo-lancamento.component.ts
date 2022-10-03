import { Component, Input, OnInit } from '@angular/core';
import { LancamentoAgrupado } from 'src/app/models/item-lancamento-agrupado';

@Component({
  selector: 'fi-item-grupo-lancamento',
  templateUrl: './item-grupo-lancamento.component.html',
  styleUrls: ['./item-grupo-lancamento.component.scss']
})
export class ItemGrupoLancamentoComponent implements OnInit {
  @Input() itemGrupo!: LancamentoAgrupado;

  ngOnInit(): void {
  }
}
