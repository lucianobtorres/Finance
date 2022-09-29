import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, PlanoContas } from 'src/app/db/finance-db';

@Component({
  selector: 'fi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

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
