import { Component } from '@angular/core';

@Component({
  selector: 'fi-root',
  template: `
  <main>
    <router-outlet>
    </router-outlet>
  </main>
  <fi-menu></fi-menu>
  `,
})
export class AppComponent {
  title = 'Finance';
}
