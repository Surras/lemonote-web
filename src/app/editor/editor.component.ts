import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Page } from '../models/page';
import { PageService } from '../page.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  page: Page;
  saveTimer;

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.pageService.currentPage.subscribe(page => {
      // save current page before change, if one is selected
      if (this.page) {
        // clear timer to avoid callback on new set page
        clearTimeout(this.saveTimer);
        this.pageService.update(this.page);
      }

      // set new selected page
      this.page = page;
    });
  }

  
  onChanged(event: InputEvent) {
    let s = "";
    // clear active timer first to stop multiple calls
    clearTimeout(this.saveTimer);

    // start save timer for save-delay and bandwidth reduction
    this.saveTimer = setTimeout(() => this.pageService.update(this.page).subscribe(), 500);
  }
}
