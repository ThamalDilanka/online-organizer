import { DeleteConfirmDialogComponent } from './../components/delete-confirm-dialog/delete-confirm-dialog.component';
import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog) {}

  popup() {
    this.dialog.open;
  }
}
