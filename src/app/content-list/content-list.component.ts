import { Component, OnInit } from '@angular/core';
import { PAGES } from '../mock-pages'
import { Page } from '../models/page';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

  constructor() { }

  pages = PAGES;

  ngOnInit() {
  }

  onSelect(page: Page){
    console.log(page.title + " clicked!");
  }

}
