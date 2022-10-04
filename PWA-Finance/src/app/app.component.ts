import { Component  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Finance';
  public navLinks = [
    {
      location: 'home',
      label: 'Lancamentos',
      icon: 'currency_exchange'
    },{
      location: 'graficos',
      label: 'Gráficos',
      icon: 'trending_up'
    },{
      location: 'configuracoes',
      label: 'Configurações',
      icon: 'settings'
    }]
}
