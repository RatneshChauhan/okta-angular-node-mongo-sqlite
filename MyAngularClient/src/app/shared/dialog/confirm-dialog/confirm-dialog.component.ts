import { Component, OnInit, ChangeDetectionStrategy, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})

export class ConfirmDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string,
    type:string
  }, private mdDialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  title = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'You must enter a value';
    }

  }

  ngOnInit(): void {
  }

  public cancel() {
    this.close(false);
  }
  public close(value) {
    const data = {isConfirmed:value, title:this.title.value}
    this.mdDialogRef.close(data);
  }
  public confirm() {
    this.close(true);
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
}

