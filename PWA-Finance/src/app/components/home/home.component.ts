import { DatePipe, WeekDay } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { add, addDays, subDays, subMinutes } from 'date-fns';
import { liveQuery, Observable } from 'dexie';
import { db, GrupoContas, Lancamento, MeioMovimentacao, PlanoContas } from 'src/app/db/finance-db';

const QTD_DIAS = 3;

@Component({
  selector: 'fi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public hoje = new Date();
  public inicio = subDays(this.hoje, QTD_DIAS);
  public final = addDays(this.hoje, QTD_DIAS);

  private idsPlanContas: any[] =[];

  public lancamentos$ = liveQuery(() => db.lancamentos.toArray());
  public gruposContas$ = liveQuery(() => db.grupoContas
  .where('id')
  .anyOf(this.idsPlanContas)
  .toArray());

  public planoContas!: PlanoContas[];
  public meiosMovs!: MeioMovimentacao[];

  public dias: { dia: number, diaDaSemana: string, isHoje: boolean }[] = [];

  constructor(private datepipe: DatePipe) {
  }


  ngOnInit(): void {
    let cursor = subDays(this.hoje, QTD_DIAS);
    const final = addDays(this.hoje, QTD_DIAS);

    do {
      cursor = this.createRange(cursor);
    } while (cursor.toISOString() != final.toISOString())
    this.createRange(addDays(cursor, 1));

    liveQuery(() => db.planoContas.toArray()).subscribe((x) => this.planoContas = x);
    liveQuery(() => db.meioMovimentacao.toArray()).subscribe((x) => this.meiosMovs = x);

    this.lancamentos$.subscribe((lancamentos) => {
      lancamentos.map((x) => this.idsPlanContas.push(x.planoContasId ?? 0));
    });

  }

  async listTodoItems() {
    console.log(this.idsPlanContas)

    const gr = await this.listTodoItems2();
    console.log(gr)
  }

  async listTodoItems2() {
    return await db.grupoContas
    .where('id')
    .anyOf(this.idsPlanContas)
    .toArray();
  }

  private createRange(cursor: Date) {
    const dia = cursor.getDate();
    const diaDaSemana = this.datepipe.transform(cursor, 'EEE')?.toUpperCase().substring(0, 3) ?? '';
    const isHoje = dia == this.hoje.getDate();

    this.dias.push({ dia, diaDaSemana, isHoje });

    cursor = addDays(cursor, 1);
    return cursor;
  }
}
