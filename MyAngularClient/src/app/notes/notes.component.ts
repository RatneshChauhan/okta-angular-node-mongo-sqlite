import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
hideSideNav = false;
title = 'Note App';
selectedNote: Note = new Note();
  loading = false;

  constructor(public noteService: NotesService) {
  }

  ngOnInit() {
    this.noteService.showHideSubscription.subscribe(() => {
      this.hideSideNav = !this.hideSideNav;
    });
   
  }

}
