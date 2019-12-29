import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../models/page';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Input() 
  page: Page;
  
  constructor() { }

  ngOnInit() {
  }

  onChanged(event: InputEvent){
    
  }

}
