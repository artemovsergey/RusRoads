import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  dialogRef = inject(MatDialogRef<ConfirmDialogComponent>)

   
  ok(){
    this.dialogRef.close(true)
  }

  cancel(){
    this.dialogRef.close(false)
  }

}
