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

  }

  add(page: Page) {
    this.pages.push(page);
  }

  delete(page: Page) {

  }
}
