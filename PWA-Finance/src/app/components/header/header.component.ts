import { Component } from '@angular/core';


@Component({
  selector: 'fi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public hoje = new Date();
}
