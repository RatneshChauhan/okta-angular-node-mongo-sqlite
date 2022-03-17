import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Note } from './note';
import { Subject, Observable } from 'rxjs';

const baseUrl = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  noteClickSubscription = new Subject();
  noteDetailSubscription = new Subject();
  noteSubscription = new Subject();
  saveSubscription = new Subject();
  showHideSubscription = new Subject<void>();
  noteSearchSubscription = new Subject();
  disableEditingSubscription = new Subject();

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any, responseType?: any) {
    const token = await this.oktaAuth.getAccessToken();

    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  getNotes() {
    // get
    return this.request('get', `${baseUrl}/notes`);
  }

  createNote(note: Note) {
    console.log('createNote ' + JSON.stringify(note));
    // post
    this.request('post', `${baseUrl}/newNote`, note);
  }

  deleteNote(id: string) {
    console.log('deleteNote ' + id)
    // delete
    return this.request('delete', `${baseUrl}/deleteNote/${id}`, null, 'text');
  }

  saveNoteHandler(noteTitle: string) {
    this.saveSubscription.next({ title: noteTitle });
  }

  addNoteTitleHandler(noteTitle: string) {
    this.noteSubscription.next({ action: 'addEdit', title: noteTitle });
  }

  noteDeleteHandler() {
    this.noteSubscription.next({ action: 'delete' });
  }

  noteToggleHandler() {
    this.showHideSubscription.next();
  }

  searchHandler(value) {
    this.noteSearchSubscription.next({ value });
  }

}
