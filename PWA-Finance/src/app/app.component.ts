import { AfterViewInit, Component } from '@angular/core';

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
  constructor() {
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

