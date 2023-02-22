import { Component } from '@angular/core';

@Component({
  selector: 'fi-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent {
  //rotas = ROTAS_CONFIG;

  public isOpened = false;

  open(): void {
    this.isOpened = true;
  }

  close(): void {
    this.isOpened = false;
  }
}
