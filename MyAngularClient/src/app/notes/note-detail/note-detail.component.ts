import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Editor, toHTML, Toolbar, ToolbarCustomMenuItem } from 'ngx-editor';
import { NotesService } from '../notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})

export class NoteDetailComponent implements OnInit {
  selectedNote: Note = new Note();
  currentDate: any;
  editor: Editor;
  html: any;

  //@ts-ignore
  toolbar: ToolbarCustomMenuItem = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
  ];

  monthMap = {
    0: 'January', 1: 'February', 2: 'March',
    3: 'April', 4: 'May', 5: 'June',
    6: 'July', 7: 'August', 8: 'September',
    9: 'October', 10: 'November', 11: 'December'
  }

  //@ts-ignore
  @ViewChild('editorTextarea', { static: true }) editorTextarea: ElementRef;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.editor = new Editor();
    this.currentDate = (this.monthMap[new Date().getMonth()] + ' ' + new Date().getDate() + ', ' + new Date().getFullYear()) + ' at ' + (new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()) + ':' + ("0" + new Date().getMinutes()).slice(-2) + (new Date().getHours() > 12 ? ' PM' : ' AM');
    setInterval(() => {
      this.currentDate = (this.monthMap[new Date().getMonth()] + ' ' + new Date().getDate() + ', ' + new Date().getFullYear()) + ' at ' + (new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()) + ':' + ("0" + new Date().getMinutes()).slice(-2) + (new Date().getHours() > 12 ? ' PM' : ' AM');
    }, 1000);
    this.notesService.noteClickSubscription.subscribe((note) => {
      //@ts-ignore
      this.selectedNote = note;
      this.html = this.selectedNote.description;

    });

    this.notesService.noteSubscription.subscribe((data: any) => {
      this.editorTextarea.nativeElement.value = '';
      this.selectedNote = null;
    });

    this.notesService.disableEditingSubscription.subscribe(({ disableEditing }) => {
      this.editorTextarea.nativeElement.disabled = disableEditing;

    });

    this.notesService.saveSubscription.subscribe(() => {
      console.log('htmlContent: ', this.html)
      this.selectedNote.description = this.html
      this.selectedNote.createdAt = this.currentDate
      this.notesService.createNote(this.selectedNote);

    });

    //sample output of editor
    //   this.html ={
    //     "type": "doc",
    //     "content": [
    //         {
    //             "type": "paragraph",
    //             "attrs": {
    //                 "align": null
    //             },
    //             "content": [
    //                 {
    //                     "type": "text",
    //                     "marks": [
    //                         {
    //                             "type": "text_background_color",
    //                             "attrs": {
    //                                 "backgroundColor": "orange"
    //                             }
    //                         }
    //                     ],
    //                     "text": "Tarnesh"
    //                 }
    //             ]
    //         }
    //     ]
    // }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  textInputHandler() {
    this.notesService.noteDetailSubscription.next({ value: { body: this.editorTextarea.nativeElement.value, title: null }, note: this.selectedNote });
  }
}
