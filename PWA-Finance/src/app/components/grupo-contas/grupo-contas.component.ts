import { Component, Input, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, GrupoContas } from 'src/app/db/finance-db';

@Component({
  selector: 'fi-grupo-contas',
  templateUrl: './grupo-contas.component.html',
  styleUrls: ['./grupo-contas.component.scss']
})
export class GrupoContasComponent implements OnInit {

  public lancamentos$ = liveQuery(() => db.lancamentos.toArray());
  @Input() public grupoConta!: GrupoContas;

  constructor() { }

  ngOnInit(): void {
    console.log(this.grupoConta)
  }


  identifyList(index: number, list: GrupoContas) {
    return list.id;
  }
}
