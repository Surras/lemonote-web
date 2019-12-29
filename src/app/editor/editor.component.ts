import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../models/page';
import { PageService } from '../page.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  page: Page;
  
  constructor(private pageService: PageService ) { }

  ngOnInit() {
    this.pageService.currentPage.subscribe(page => this.page = page);
  }

  onChanged(event: InputEvent){
    
  }

}
