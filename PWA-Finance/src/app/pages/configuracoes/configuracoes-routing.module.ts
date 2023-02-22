import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditGrupoLancamentoComponent } from "src/app/components/edit-grupo-lancamento/edit-grupo-lancamento.component";
import { ConfiguracoesComponent } from "./configuracoes.component";

@NgModule({
  imports: [RouterModule.forChild([])],
  exports: [RouterModule]
})
export class ConfiguracoesRoutingModule { }
