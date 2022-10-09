import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MessageData, TypeToast } from 'src/app/models/message-data';



@Component({
  selector: 'fi-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  public readonly icon: string;
  public readonly messageClass: string;
  public readonly dismissing: boolean = false;

  constructor(
    private snackBarRef: MatSnackBarRef<ToastComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: MessageData
  ) {

    switch (data.typeToast) {
      case TypeToast.SUCCESS:
        this.icon = 'check_circle';
        this.messageClass = 'fi-msg-success';
        break;

      case TypeToast.WARNING:
        this.icon = 'warning';
        this.messageClass = 'fi-msg-warning';
        break;

      case TypeToast.ERROR:
        this.icon = 'error';
        this.messageClass = 'fi-msg-error';
        break;

      case TypeToast.DISMISSING:
        this.icon = 'check_circle';
        this.messageClass = 'fi-msg-success';
        this.dismissing = true;
        break;
    }
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }

  desfazer(): void {
    this.snackBarRef.dismissWithAction();
  }
}
