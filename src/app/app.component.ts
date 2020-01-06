import { Component } from '@angular/core';
import { Page } from './models/page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lemonote';

  currentPage: Page;

  onLogout() {
    console.log("user logged out...");
  }

}
