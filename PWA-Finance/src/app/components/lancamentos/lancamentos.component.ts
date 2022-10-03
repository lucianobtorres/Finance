import { Component, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from 'src/app/db/finance-db';
import { GrupoContas, PlanoContas, Lancamento, MeioMovimentacao } from 'src/app/models/interfaces';
import { ItemLancamentoAgrupado, LancamentoAgrupado } from 'src/app/models/item-lancamento-agrupado';

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

  public grupoContas!: GrupoContas[];
  public planoConta!: PlanoContas[];
  public lancamento!: Lancamento[];
  public meioMovimentacao!: MeioMovimentacao[];

  ngOnInit(): void {
    this.lancamentos$.subscribe((lctos) => {

      lctos.map(lcto => {

        let meioMovLcto: MeioMovimentacao;

        this.meiosMovs$.subscribe((meiosMovs) => {

          const meioMov = meiosMovs.find(x => x.id === lcto.meioMovimentacaoId);
          if (!meioMov) return;

          meioMovLcto = meioMov;
        });

        this.planoContas$.subscribe((plansContas) => {

          const planConta = plansContas.find(x => x.id === lcto.planoContasId);
          if (!planConta) return;

          this.grupoContas$.subscribe((gruposContas) => {

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
}
