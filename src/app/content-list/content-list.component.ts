import { Component, OnInit, Output } from '@angular/core';
import { PAGES } from '../mock-pages'
import { Page } from '../models/page';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

  pages = PAGES;

  @Output()
  selectedPage: Page;

  constructor() { }

  ngOnInit() {
  }

  onSelect(page: Page) {
    this.selectedPage = page;
    console.log(page.title + " clicked!");
  }

}
