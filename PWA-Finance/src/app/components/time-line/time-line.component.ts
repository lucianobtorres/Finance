import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { subDays, addDays } from 'date-fns';

const QTD_DIAS = 3;

@Component({
  selector: 'fi-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {

  public hoje = new Date();
  public inicio = subDays(this.hoje, QTD_DIAS);
  public final = addDays(this.hoje, QTD_DIAS);

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
