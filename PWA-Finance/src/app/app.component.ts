import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Finance';

  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates
        .pipe(take(1))
        .subscribe(() => {

          if (confirm("Nova versão disponível. Carregar nova versão?")) {
            window.location.reload();
          }
        });
    }
  }
}
