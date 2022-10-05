import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const ROTAS = {
  root: '/',
  home: 'home',
};

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: ROTAS.home, component: HomeComponent },
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
