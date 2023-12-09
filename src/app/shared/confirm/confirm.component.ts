import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crud',
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string
  }, private mdDialogRef: MatDialogRef<ConfirmComponent>) { }

  cancel() {
    this.close(false);
  }

  close(value:boolean) {
    this.mdDialogRef.close(value);
  }

  confirm() {
    this.close(true);
  }

  @HostListener("keydown.esc")
  onEsc() {
    this.close(false);
  }

}
