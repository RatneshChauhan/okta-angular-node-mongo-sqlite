import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../note';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {

  @Input() note;
   // currentDate: String;
   selected:boolean;
  
  @Output('noteClicked') noteClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('Note: ',this.note)
  //   this.currentDate = (this.note.createdAt.getHours() > 12? this.note.createdAt.getHours() - 12: this.note.createdAt.getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');    
  }

  noteClickHandler() {
    this.note.selected = true;
    this.noteClicked.emit();
  }

}
