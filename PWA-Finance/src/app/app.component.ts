import { Component, OnInit  } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
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

    constructor(private swUpdate: SwUpdate) {
      if (this.swUpdate.isEnabled) {
        this.swUpdate.versionUpdates
        .pipe(take(1))
        .subscribe(() => {

            if(confirm("Nova versão disponível. Carregar nova versão?")) {
                window.location.reload();
            }
        });
    }
    }

    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }
}
