import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { HomeComponent } from './pages/home/home.component';

export const ROTAS = {
  root: '/',
  home: 'home',
  extrato: 'extrato',
};

const routes: Routes = [
  { path: ROTAS.home, component: HomeComponent},
  { path: ROTAS.extrato, component: ExtratoComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/page-not-found/page-not-found.module')
        .then(m => m.PageNotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
