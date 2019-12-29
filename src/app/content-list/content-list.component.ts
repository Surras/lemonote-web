import { Component, OnInit, Output } from '@angular/core';
import { PAGES } from '../mock-pages'
import { Page } from '../models/page';
import { PageService } from '../page.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

  pages = [];

  selectedPage: Page;

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.getPages();
  }

  getPages(): void {
    this.pageService.getPages()
    .subscribe(pages => this.pages = pages);
  }

  onSelect(page: Page) {

    this.pageService.currentPage.next(page);
    console.log(page.title + " clicked!");
  }

}
