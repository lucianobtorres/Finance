import { Component, OnInit, Output } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { liveQuery } from 'dexie';
import { db } from 'src/app/db/finance-db';
import { GrupoContas, PlanoContas, Lancamento, MeioMovimentacao } from 'src/app/models/interfaces';
import { ItemLancamentoAgrupado, LancamentoAgrupado } from 'src/app/models/item-lancamento-agrupado';
import { AddLancamentoComponent } from '../add-lancamento/add-lancamento.component';

@Component({
  selector: 'fi-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss']
})
export class LancamentosComponent implements OnInit {
  public itensLancamentos = new ItemLancamentoAgrupado();

  public lancamentos$ = liveQuery(() => db.lancamentos.toArray());
  public planoContas$ = liveQuery(() => db.planoContas.toArray());
  public meiosMovs$ = liveQuery(() => db.meioMovimentacao.toArray());
  public grupoContas$ = liveQuery(() => db.grupoContas.toArray());

  public gruposConta!: GrupoContas[];
  public planosConta!: PlanoContas[];
  public lancamentos!: Lancamento[];
  public meiosMovimentacao!: MeioMovimentacao[];

  constructor(readonly bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.lancamentos$.subscribe((lctos) => {

      lctos.map(lcto => {

        let meioMovLcto: MeioMovimentacao;

        this.meiosMovs$.subscribe((meiosMovs) => {
          this.meiosMovimentacao = meiosMovs;

          const meioMov = meiosMovs.find(x => x.id === lcto.meioMovimentacaoId);
          if (!meioMov) return;

          meioMovLcto = meioMov;
        });

        this.planoContas$.subscribe((plansContas) => {
          this.planosConta = plansContas;

          const planConta = plansContas.find(x => x.id === lcto.planoContasId);
          if (!planConta) return;

          this.grupoContas$.subscribe((gruposContas) => {
            this.gruposConta = gruposContas;
            const grupo = gruposContas.find(x => x.id === planConta.grupoContasId);
            if (!grupo) return;

            const idGrupo = grupo.id ?? 0;
            if (!this.itensLancamentos.containsKey(idGrupo)) {
              const item = new LancamentoAgrupado(grupo);
              this.itensLancamentos.add(idGrupo, item);
            }

            this.itensLancamentos[idGrupo]?.planosContas?.push({
              planoConta: planConta,
              lancamentosGrupo: lcto,
              meioMovimentacao: meioMovLcto,
            });
          });
        });
      });
    });
  }

  incluirLancamentoNoGrupo(
    planConta: PlanoContas,
    lcto: Lancamento,
    meioMovLcto: MeioMovimentacao,
  ): void {

    const idGrupo = planConta.grupoContasId ?? 0;

    if (!this.itensLancamentos.containsKey(idGrupo)) {
      //
    }

    this.itensLancamentos[idGrupo]?.planosContas?.push({
      planoConta: planConta,
      lancamentosGrupo: lcto,
      meioMovimentacao: meioMovLcto,
    });

  }

  addLancamento() {
    const config: MatBottomSheetConfig = {
      data: {
        planosConta: this.planosConta,
        meiosMovimentacao: this.meiosMovimentacao
      }
    };

    const addRef = this.bottomSheet.open(AddLancamentoComponent, config);

    addRef.afterDismissed().subscribe((result: Lancamento) => {
      if (!result) return;
      const planoConta = this.planosConta.find(x => x.id === result.planoContasId);
      const meioMov = this.meiosMovimentacao.find(x => x.id === result.meioMovimentacaoId);

      if (!planoConta) return;
      if (!meioMov) return;

      db.lancamentos.add(
        { planoContasId: result.planoContasId,
          data: new Date(result.data),
          desc: result.desc,
          valor: result.valor,
          meioMovimentacaoId: result.meioMovimentacaoId }).catch ((err) => {
            console.log(err);
        });
    });
  }
}
