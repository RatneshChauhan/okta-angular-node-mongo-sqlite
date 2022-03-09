import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NotesService } from '../notes.service';
import { Note } from '../note';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isSelected = false;
  disableEditing = false;
  selectedNote: Note = new Note();
  
  constructor(private notesService: NotesService) { }
  
  ngOnInit() {
    this.notesService.noteClickSubscription.subscribe((data:Note) => {
      console.log('Selected Note ',data)
      this.selectedNote = data
      this.isSelected = true;
    });
  }

  saveNoteHandler() {
    this.notesService.saveNoteHandler();
  }

  addEditNoteHandler() {
    this.notesService.noteAddEditHandler();
    this.isSelected = true;
  }

  deleteNoteHandler() {

    this.notesService.deleteNote(this.selectedNote._id)
    this.notesService.noteDeleteHandler();
    this.isSelected = false;
  }

  toggleHandler() {
   this.notesService.noteToggleHandler();
  }

  searchHandler(inputEl) {
    this.notesService.searchHandler(inputEl.value);
  }

  disableEditingHandler(){
    this.disableEditing = !this.disableEditing;
    this.notesService.disableEditingSubscription.next({'disableEditing': this.disableEditing});
  }

}
