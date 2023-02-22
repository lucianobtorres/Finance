import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

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
export class AppComponent implements AfterViewInit {
  title = 'Finance';

  constructor(router: Router) {
    router.canceledNavigationResolution = 'computed';

    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }

  ngAfterViewInit(): void {
    //this.startup();
  }
  ;

  startup() {
    screen.orientation.lock("portrait")
      .then(() => {
        console.log('portrait')
      }
      )
      .catch((error) => {
        console.log(error)
      });

    // const element = document.querySelector('body');
    // element?.addEventListener('touchstart', (e) => {
    //   console.log(e)
    //   //if (e.view.pageX > 20 && e.pageX < window.innerWidth - 20) return;
    //   e.preventDefault();
    // });
  }
}

