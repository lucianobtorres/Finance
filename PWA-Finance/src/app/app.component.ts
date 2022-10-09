import { Component } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { take } from 'rxjs';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Finance';
  constructor(swUpdate: SwUpdate
    ) {
    if (!swUpdate.isEnabled) return;

    swUpdate.versionUpdates
      .pipe(take(1))
      .subscribe(() => {
        if (confirm("Nova versão disponível. Carregar nova versão?")) {
          swUpdate.activateUpdate().then(() => {
            window.location.reload();
          });
        }
      });
  }
}

