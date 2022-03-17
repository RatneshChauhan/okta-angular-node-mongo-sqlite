import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './notes/notes-list/note/note.component';
import { HomeComponent } from './home/home.component';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { HeaderComponent } from './notes/header/header.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';

import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DialogModule } from './shared/dialog/dialog.module';

const oktaConfig = {
  issuer: 'https://dev-94111127.okta.com/oauth2/default',
  clientId: '0oa3t914h8Cl6Y24E5d7',
  redirectUri: window.location.origin + '/callback'
};

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    NotesComponent,
    NoteComponent,
    NotesListComponent,
    NoteDetailComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    NgxEditorModule,
    OktaAuthModule,
    DialogModule
    
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
