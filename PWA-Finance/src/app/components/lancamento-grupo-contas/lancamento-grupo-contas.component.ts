import { Component, Input, OnInit } from '@angular/core';
import { Lancamento } from 'src/app/models/interfaces';

@Component({
  selector: 'fi-lancamento-grupo-contas',
  template: `
    <span>{{ lancamento?.data | date:'dd-MMM'}}</span>
    <small>Serviços Financeiros</small>
    <small>Tarifas bancárias</small>
    <small>{{ lancamento?.desc }}</small>
    <small>R$</small>
    <span>{{ lancamento?.valor }}</span>
  `
})
export class LancamentoGrupoContasComponent implements OnInit {
  @Input() public lancamento?: Lancamento;

  ngOnInit(): void {
  }
}
