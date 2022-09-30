import { Component, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { Observable } from 'rxjs';
import { db, Lancamentos } from 'src/app/db/finance-db';

@Component({
  selector: 'fi-lancamento-grupo-contas',
  templateUrl: './lancamento-grupo-contas.component.html',
  styleUrls: ['./lancamento-grupo-contas.component.scss']
})
export class LancamentoGrupoContasComponent implements OnInit {

  public lancamentos$: Observable<Lancamentos[]>;

  constructor() {
    this.lancamentos$ = new Observable<Lancamentos[]>();
  }

  ngOnInit(): void {
    this.lancamentos$ = liveQuery(() => db.lancamentos.toArray());
  }

  // siglaGrupo(planoConta: PlanoContas) : string {
  //   let sigla = '';
  //   this.grupoContas$.subscribe((grupo) => {
  //     const grupoConta = grupo.find(x => x.id === planoConta.grupoContasId)
  //     if (grupoConta) {
  //       sigla = `${grupoConta.sigla}${planoConta.id}`;
  //     }
  //   });

  //   return sigla;
  // }

  // planContasList(index: number, list: PlanoContas) {
  //   return `${list.id}${list.title}`;
  // }

}
