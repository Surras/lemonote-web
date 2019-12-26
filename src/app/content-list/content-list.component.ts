import { Component, OnInit } from '@angular/core';
import {PAGES } from '../mock-pages'

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

}
