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

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.getPages();
    this.pageService.currentPage.subscribe(page => this.selectedPage = page);
  }

  getPages(): void {
    this.pageService.getPages()
      .subscribe(pages => {
        this.pages = pages;
      });
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
    this.pageService.add(new Page("new Note", "")).subscribe(
      (newPage: Page) => {
        if (newPage)
          this.pages.push(newPage);
      }
    );
  }

  deleteCurrentPage() {
    this.pageService.delete(this.selectedPage);
  }
}
