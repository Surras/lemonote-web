import { Injectable } from '@angular/core';
import { PAGES } from './mock-pages'
import { Page } from './models/page';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  currentPage: Subject<Page> = new Subject();
  currentPage$: Observable<Page>;

  pages: Page[] = [];

  constructor() {
    this.currentPage$ = this.currentPage.asObservable();
  }

  getPages(): Observable<Page[]> {
    this.pages = PAGES;
    return of(this.pages);
  }

  update(page: Page) {
    console.log(page.title + " saved!");
  }

  add(page: Page) {
    page.pageId = this.getMaxId(this.pages) + 1;
    page.title = "new Note " + page.pageId;
    console.log("page added: " + page.title);
    this.pages.push(page);
  }

  delete(page: Page) {
    for (var i = 0; i < this.pages.length; i++) {
      if (page.pageId === this.pages[i].pageId) {
        this.pages.splice(i, 1);

        // if nothing else there, select 'null'
        if (this.pages.length == 0) {
          this.currentPage.next(null);
        }
        // try select the next comming page
        else if (i <= this.pages.length - 1) {
          this.currentPage.next(this.pages[i]);
        } 
        // select the previous page
        else {
          this.currentPage.next(this.pages[i - 1]);
        }
        console.log("page deleted: " + page.title);
        break;
      }
    }
  }

  private getMaxId(pages: Page[]): number {
    let maxId: number = 0;
    pages.forEach(item => {
      if (item.pageId > maxId) maxId = item.pageId;
    });

    return maxId;
  }
}
