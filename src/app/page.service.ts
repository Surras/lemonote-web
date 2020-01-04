import { Injectable } from '@angular/core';
import { Page } from './models/page';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  currentPage: Subject<Page> = new Subject();
  currentPage$: Observable<Page>;
  
  private apiUrl = 'api/pages';  // URL to web api
  pages: Page[] = [];

  constructor(private http: HttpClient) {
    this.currentPage$ = this.currentPage.asObservable();
  }

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(this.apiUrl);
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
    return pages.length > 0 ? Math.max(...pages.map(page => page.pageId)) : 0;
  }
}
