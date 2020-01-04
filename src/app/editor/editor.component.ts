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
  
  constructor(private pageService: PageService ) { }

  ngOnInit() {
    this.pageService.currentPage.subscribe(page => 
      {
        // save current page before change
        if(this.page){
          // clear timer to avoid callback on new set page
          clearTimeout(this.saveTimer);
          this.updatePage(this.page);
        }
        this.page = page;
      });
  }

  onChanged(event: InputEvent){
    // clear active timer first to stop multiple calls
    clearTimeout(this.saveTimer);

    // start save timer for save-delay and bandwidth reduction
    this.saveTimer = setTimeout(() => this.updatePage(this.page), 500);
  }

  updatePage(page: Page){
    console.log(this.page.title + " saved!");
  }
}
