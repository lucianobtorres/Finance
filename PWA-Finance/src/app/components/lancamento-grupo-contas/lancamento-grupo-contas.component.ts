import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { liveQuery, Observable } from 'dexie';
import { db, GrupoContas, Lancamento, MeioMovimentacao, PlanoContas } from 'src/app/db/finance-db';

@Component({
  selector: 'fi-lancamento-grupo-contas',
  templateUrl: './lancamento-grupo-contas.component.html',
  styleUrls: ['./lancamento-grupo-contas.component.scss']
})
export class LancamentoGrupoContasComponent implements OnInit {

  @Input() lancamento!: Lancamento;
  @Input() grupoConta!: GrupoContas;

  @Input() lancamentos = liveQuery(
    () => this.listTodoItems()
  );


  ngOnInit(): void {
  }

  async listTodoItems() {
    const planosContas = await liveQuery(() => db.planoContas.where({grupoContasId: this.grupoConta.id}));

    return await db.lancamentos
      .where({
        todoListId: planosContas,
      })
      .toArray();
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
