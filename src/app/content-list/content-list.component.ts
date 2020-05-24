import { Component, OnInit, Output } from '@angular/core';
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

  constructor(public pageService: PageService) { }

  ngOnInit() {
    // this.pages = this.pageService.pages;
    this.pageService.currentPage.subscribe(page => this.selectedPage = page);
    this.pageService.pageList.subscribe(list => this.pages = list);
    this.pageService.getPages();
  }

  onSelect(id: number) {
    this.pageService.getPage(id).subscribe(
      fetchedPage => {
        this.pageService.currentPage.next(fetchedPage);
        this.selectedPage = fetchedPage;
      }
    );

    console.log(id + " clicked!");
  }

  newPage() {
    this.pageService.add(new Page("new Note", "")).subscribe();
  }

  deleteCurrentPage() {
    this.pageService.delete(this.selectedPage);
  }
}
