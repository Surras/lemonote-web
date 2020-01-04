import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Page } from './models/page';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  createDb(){
    let pages: Page[] = [];
    pages.push(new Page("Foo", "Bar"))
    pages.push(new Page("Bar", "Bar"))

    return {pages};
  }
}
