import { Component } from '@angular/core';

@Component({
  selector: 'fi-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public navLinks = [
    {
      location: 'home',
      label: 'Lancamentos',
      icon: 'currency_exchange'
    }, {
      location: 'graficos',
      label: 'Gráficos',
      icon: 'trending_up'
    }, {
      location: 'configuracoes',
      label: 'Configurações',
      icon: 'settings'
    }]
}
