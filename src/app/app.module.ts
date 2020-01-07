import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { ContentListComponent } from './content-list/content-list.component';

const ENV = 'dev';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    ContentListComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    
     ENV !== 'prod' && ENV !== 'remote' ? HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false } 
    ): [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
