import { Component, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, PlanoContas } from 'src/app/db/finance-db';

@Component({
  selector: 'fi-plano-contas',
  templateUrl: './plano-contas.component.html',
  styleUrls: ['./plano-contas.component.scss']
})
export class PlanoContasComponent {

  grupoContas$ = liveQuery(() => db.grupoContas.toArray());
  planoContas$ = liveQuery(() => db.planoContas.toArray());

  siglaGrupo(planoConta: PlanoContas) : string {
    let sigla = '';
    this.grupoContas$.subscribe((grupo) => {
      const grupoConta = grupo.find(x => x.id === planoConta.grupoContasId)
      if (grupoConta) {
        sigla = `${grupoConta.sigla}${planoConta.id}`;
      }
    });

    return sigla;
  }

  planContasList(index: number, list: PlanoContas) {
    return `${list.id}${list.title}`;
  }
}
