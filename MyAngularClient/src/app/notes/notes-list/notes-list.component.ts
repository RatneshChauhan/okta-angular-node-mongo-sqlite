import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})



export class NotesListComponent implements OnInit {


  notesList = [];
  filteredNotes = [];
  selectedNote = null;
  loading = false;
  searchedText = '';

  constructor(private notesService: NotesService ) {
  }

  async  ngOnInit() {
    this.notesList = await this.notesService.getNotes()
    this.filteredNotes = this.notesList;

    this.notesService.noteSearchSubscription.subscribe(({ value }) => {
      this.filteredNotes = this.searchedNotes(value);
    });

    this.notesService.noteSubscription.subscribe((data: any) => {
      if (data.action === 'delete' && this.selectedNote) {
       
            this.notesList.splice(this.getSelectedNoteIndex(), 1);
            if (this.notesList.length === 0) {
              console.log('No more notes')
            }

      }
      if (data.action === 'addEdit') {
          let currentDate = (new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()) + ':' + new Date().getMinutes() + (new Date().getHours() > 12 ? ' PM' : ' AM');
          this.notesList.forEach(note => note.selected = false);
          this.notesList.unshift({
            id: Math.random() * 100,
            description: '',
            title: data.title,
            createdAt: currentDate,
            selected: true
          });
          this.noteClickHandler(this.notesList[0]);
          localStorage.setItem('notes', JSON.stringify(this.notesList));
      }   
    });
  }

  getSelectedNoteIndex() {
    const index = this.notesList.findIndex(note => note.selected === true);
    this.selectedNote = this.notesList[index];
    return index;
  }

  removeSelection() {
    this.notesList.forEach(note => note.selected = false);
  }

  noteClickHandler(data) {
    const index = this.notesList.findIndex(note => note._id === data._id);
    this.selectedNote = this.notesList[index];
    this.notesList.forEach(note => note.selected = false);
    this.notesList[index].selected = true;
    this.notesService.noteClickSubscription.next(this.notesList[index]);
  }

  searchedNotes(value?) {
    if (value || (typeof value === 'string' && value.length === 0)) {
      this.searchedText = value;
    }
    if (this.notesList && this.notesList.length > 0) {
      return this.notesList.filter((note) => {
        if (this.searchedText.trim().length === 0 ||
          note.title.indexOf(this.searchedText.trim()) > -1 ||
          note.description.indexOf(this.searchedText.trim()) > -1) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      return [];
    }

  }

}
