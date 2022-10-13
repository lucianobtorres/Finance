import { Component } from '@angular/core';

@Component({
  selector: 'fi-page-not-found',
  template: `
  <mat-card class="mat-elevation-z0">
    <div fxLayoutAlign="space-between">
        <fi-header>
          Página não encontrada
        </fi-header>
    </div>
  </mat-card>
  `,
  styles: [`
  mat-card {
    height: 100vh;
    overflow: hidden;
  }
  `]
})

export class PageNotFoundComponent { }
