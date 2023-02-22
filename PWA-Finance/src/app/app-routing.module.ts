import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditGrupoLancamentoComponent } from './components/edit-grupo-lancamento/edit-grupo-lancamento.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { HomeComponent } from './pages/home/home.component';

export const ROTAS = {
  root: '/',
  home: 'home',
  extrato: 'extrato',
  configuracoes: 'configuracão',
};

export const ROTAS_CONFIG = {
  root: '/',
  grupoLncto: 'grupoLancamento',
};

const routesc: Routes = [
  { path: '', component: ConfiguracoesComponent },
  { path: ROTAS_CONFIG.grupoLncto, component: EditGrupoLancamentoComponent },
];

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: ROTAS.home, component: HomeComponent },
  { path: ROTAS.extrato, component: ExtratoComponent },
  {
    path: ROTAS.configuracoes,
    loadChildren: () =>
      import('./pages/configuracoes/configuracoes.module')
        .then(m => m.ConfiguracoesModule)
  },
  // {
  //   path: '**',
  //   loadChildren: () =>
  //     import('./pages/page-not-found/page-not-found.module')
  //       .then(m => m.PageNotFoundModule)
  // },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
