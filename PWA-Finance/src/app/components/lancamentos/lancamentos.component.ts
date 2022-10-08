import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { liveQuery } from 'dexie';
import { ToastService } from 'src/app/core/toast-service.service';
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

  public meiosMovimentacao!: MeioMovimentacao[];
  public gruposConta!: GrupoContas[];
  public planosConta!: PlanoContas[];
  public lancamentos!: Lancamento[];

  constructor(
    readonly bottomSheet: MatBottomSheet,
    readonly toastService: ToastService,
    ) {
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
      this.lancamentos = lctos;

      this.lancamentos.map(lcto => {
        const meioMov = this.meiosMovimentacao.find(x => x.id === lcto.meioMovimentacaoId);
        const planConta = this.planosConta.find(x => x.id === lcto.planoContasId);
        const grupo = this.gruposConta.find(x => x.id === planConta?.grupoContasId);
        const idGrupo = grupo?.id ?? 0;

        if (!this.itensLancamentos.containsKey(idGrupo)) {
          const item = new LancamentoAgrupado(grupo);
          this.itensLancamentos.add(idGrupo, item);
        }

        this.itensLancamentos[idGrupo]?.add({
          planoConta: planConta!,
          lancamento: lcto,
          meioMovimentacao: meioMov!,
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
      lancamento: lcto,
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

      db.lancamentos
        .add(
          {
            planoContasId: result.planoContasId,
            data: new Date(result.data),
            desc: result.desc,
            valor: result.valor,
            meioMovimentacaoId: result.meioMovimentacaoId
          })
        .then(() => {
          this.toastService.showSuccess("Lançamento adicionado");
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  removeLancamento(id: number) {
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

    db.lancamentos
      .where("id")
      .equals(id)
      .delete().catch(e => {
        console.error(e);
      });
  }
}
