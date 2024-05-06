import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss'],
})
export class ConfirmationPopupComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<ConfirmationPopupComponent>,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  confirm() {
    this.matDialog.closeAll();
  }

  cancle() {
    this.dialog.close();
  }
}
