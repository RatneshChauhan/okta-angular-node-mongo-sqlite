import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private dialogRef: any;
  isSelected = false;
  disableEditing = false;
  selectedNote: Note = new Note();

  constructor(private notesService: NotesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.notesService.noteClickSubscription.subscribe((data: Note) => {
      console.log('Selected Note ', data)
      this.selectedNote = data
      this.isSelected = true;
    });
  }

  saveNoteDescriptionHandler() {
   this.notesService.saveNoteHandler('');
  }

  saveNoteTitleHandler() {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "660px",
      data: {
        title: 'New Note Title',
        message: 'Note Title',
        type: 'Add',
        cancelText: 'Cancel',
        confirmText: 'Confirm'
      }
    });
    this.dialogRef.afterClosed().subscribe(data => {
      if (data.isConfirmed && data.title) {
        this.notesService.addNoteTitleHandler(data.title);
        this.notesService.saveNoteHandler(data.title);
        this.isSelected = true;
      }
    })
  }

  deleteNoteHandler() {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "660px",
      data: {
        title: 'Delete Note: '+this.selectedNote.title,
        message: 'Note',
        type: 'Delete',
        cancelText: 'Cancel',
        confirmText: 'Confirm'
      }
    });

    this.dialogRef.afterClosed().subscribe(data => {
      if (data.isConfirmed) {
        this.notesService.deleteNote(this.selectedNote._id)
        this.notesService.noteDeleteHandler();
        this.isSelected = false;
      }
    })
  }

  toggleHandler() {
    this.notesService.noteToggleHandler();
  }

  searchHandler(inputEl) {
    this.notesService.searchHandler(inputEl.value);
  }

  disableEditingHandler() {
    this.disableEditing = !this.disableEditing;
    this.notesService.disableEditingSubscription.next({ 'disableEditing': this.disableEditing });
  }

}
