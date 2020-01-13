import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Page } from './models/page';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(){
    let pages: Page[] = [];
    //pages.push(new Page("Foo", "Bar", this.genId(pages)))
    //pages.push(new Page("Bar", "Bar", this.genId(pages)))

    return {pages};
  }

  genId(pages: Page[]): number {
    return pages.length > 0 ? Math.max(...pages.map(page => page.id)) + 1 : 1;
  }
}
