import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MarkdownPipe } from './markdown.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    MarkdownPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatGridListModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
