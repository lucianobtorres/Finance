import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { lastDayOfMonth, startOfMonth } from 'date-fns';
import { liveQuery } from 'dexie';
import { take } from 'rxjs';
import { db } from 'src/app/db/finance-db';

import { GrupoContas, PlanoContas, Lancamento, MeioMovimentacao } from 'src/app/models/interfaces';
import { ItemLancamentoAgrupado, LancamentoAgrupado } from 'src/app/models/item-lancamento-agrupado';
import { LancamentoService } from 'src/app/services/lancamento.service';

import { AddLancamentoComponent } from '../add-lancamento/add-lancamento.component';

@Component({
  selector: 'fi-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss']
})
export class LancamentosComponent implements OnInit {
  public hoje = new Date();
  public itensLancamentos = new ItemLancamentoAgrupado();
  public mostrarSaldo = true;
  public saldo = 0;

  public lancamentos$ = liveQuery(() => db.lancamentos.toArray());
  public planoContas$ = liveQuery(() => db.planoContas.toArray());
  public meiosMovs$ = liveQuery(() => db.meioMovimentacao.toArray());
  public grupoContas$ = liveQuery(() => db.grupoContas.toArray());

  public meiosMovimentacao!: MeioMovimentacao[];
  public gruposConta!: GrupoContas[];
  public planosConta!: PlanoContas[];
  public lancamentos!: Lancamento[];

  constructor(
    readonly bottomSheet: MatBottomSheet,
    readonly lancamentoService: LancamentoService
  ) {
    this.hoje.setHours(0, 0, 0, 0);
  }

  ngOnInit(): void {
    this.meiosMovs$.subscribe((meiosMovs) => {
      this.meiosMovimentacao = meiosMovs;
    });

    this.grupoContas$.subscribe((gruposContas) => {
      this.gruposConta = gruposContas;
    });

    this.planoContas$.subscribe((plansContas) => {
      this.planosConta = plansContas;
    });

    this.lancamentos$.subscribe((lctos) => {
      this.lancamentos = lctos.filter(x =>
        this.filtrarLancamentosMes(x)
      );

      this.saldo = 0;

      this.lancamentos.map(lcto => {
        const meioMov = this.meiosMovimentacao.find(x => x.id === lcto.meioMovimentacaoId);
        const planConta = this.planosConta.find(x => x.id === lcto.planoContasId);
        const grupo = this.gruposConta.find(x => x.id === planConta?.grupoContasId);
        const idGrupo = grupo?.id ?? 0;

        if (!this.itensLancamentos.containsKey(idGrupo)) {
          const item = new LancamentoAgrupado(grupo);
          this.itensLancamentos.add(idGrupo, item);
        }

        lcto.valor = this.lancamentoService.getValor(lcto, meioMov!);
        if (!lcto.naoRealizado) this.saldo += lcto.valor;

        this.itensLancamentos[idGrupo]?.add({
          planoConta: planConta!,
          lancamento: lcto,
          meioMovimentacao: meioMov!,
        });
      });
    });
  }

  private filtrarLancamentosMes(lcto: Lancamento): boolean {
    //return true;
    return lcto.data > startOfMonth(this.hoje) &&
      lcto.data <= lastDayOfMonth(this.hoje);
  }

  addLancamento() {
    this.bottomSheet
      .open(
        AddLancamentoComponent,
        {
          data: {
            gruposConta: this.gruposConta,
            planosConta: this.planosConta,
            meiosMovimentacao: this.meiosMovimentacao
          }
        })
      .afterDismissed()
      .pipe(
        take(1)
      )
      .subscribe((result: Lancamento) => {
        if (!result) return;
        result.naoRealizado = result.data.getTime() >= this.hoje.getTime();
        this.lancamentoService.add(result, 'Lancamento adicionado');
      });
  }

  deleteLancamento(id: number) {
    const lancamento = this.lancamentos.find(x => x.id === id);
    if (!lancamento) return;

    const planConta = this.planosConta.find(x => x.id === lancamento.planoContasId);
    if (!planConta) return;

    const idGrupo = planConta.grupoContasId ?? 0;
    if (!this.itensLancamentos.containsKey(idGrupo)) return;

    if (!this.itensLancamentos[idGrupo].remove(lancamento)) return;

    if (this.itensLancamentos[idGrupo].planosContas.length === 0) {
      this.itensLancamentos.remove(idGrupo);
    }

    this.lancamentoService.delete(id, 'Lancamento removido');
  }

  lancamentoRealizado(id: number) {
    const lancamento = this.itensLancamentos.findLancamento(id);
    if (!lancamento) return;

    lancamento.naoRealizado = false;
    this.lancamentoService.update(id, { naoRealizado: false }, '');
  }
}
