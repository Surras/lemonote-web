import { Injectable } from '@angular/core';
import { Page } from './models/page';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  currentPage: Subject<Page> = new Subject();
  currentPage$: Observable<Page>;

  pageList: Subject<Page[]> = new Subject();
  pageList$: Observable<Page[]>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private apiUrl = 'api/pages';  // URL to web api
  pages: Page[] = [];

  constructor(private http: HttpClient) {
    this.currentPage$ = this.currentPage.asObservable();
    this.pageList$ = this.pageList.asObservable();
  }

  getPage(pageId: number): Observable<Page> {
    for (let i = 0; i < this.pages.length; i++) {
      if (this.pages[i].id == pageId)
        return of(this.pages[i]);
    }

    return of(null);

    // const url = `${this.apiUrl}/${pageId}`;
    // return this.http.get<Page>(url).pipe(
    //   tap(_ => console.log('single page fetched')),
    //   catchError(this.handleError<Page>('getPage'))
    // );
  }

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(this.apiUrl).pipe(
      tap(_ => {
        console.log('fetched pages');
        this.pages = _;
        this.pageList.next(_);
      }),
      catchError(this.handleError<Page[]>('getPages', []))
    );
  }

  update(page: Page): Observable<any> {
    return this.http.put<Page>(this.apiUrl, page, this.httpOptions).pipe(
      tap(_ => {
        console.log(`update page ${page.id}`);
      }),
      catchError(this.handleError<any>('update'))
    );
  }

  add(page: Page): Observable<Page> {
    return this.http.post<Page>(this.apiUrl, page, this.httpOptions).pipe(
      tap((newPage: Page) => {
        console.log(`post new page created, id: ${newPage.id}`);

        // push to local data
        this.pages.push(newPage);
      }),
      catchError(this.handleError<Page>('add'))
    );
  }

  delete(page: Page) {
    for (var i = 0; i < this.pages.length; i++) {
      if (page.id === this.pages[i].id) {
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private getMaxId(pages: Page[]): number {
    return pages.length > 0 ? Math.max(...pages.map(page => page.id)) : 0;
  }
}
