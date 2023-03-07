import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentsModule } from "src/app/components/components.module";
import { EditGrupoLancamentoComponent } from "src/app/components/edit-grupo-lancamento/edit-grupo-lancamento.component";
import { MaterialModule } from "src/app/module/material.module";
import { ConfiguracoesRoutingModule } from "./configuracoes-routing.module";

@NgModule({
  declarations: [
    EditGrupoLancamentoComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    MaterialModule,
    ConfiguracoesRoutingModule,
  ]
})
export class ConfiguracoesModule { }
