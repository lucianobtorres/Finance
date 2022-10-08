import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastComponent } from '../components/toast/toast.component';
import { MessageData, TypeToast } from '../models/message-data';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) { }

  private show(data: MessageData): MatSnackBarRef<ToastComponent> {
    const config: MatSnackBarConfig = {
      panelClass: ['fi-toast-container'],
      data,
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    };

    return this.snackBar.openFromComponent(ToastComponent, config);
  }

  showSuccess(msg: string, desc?: string): MatSnackBarRef<ToastComponent> {
    return this.show({
      typeToast: TypeToast.SUCCESS,
      message: msg,
      description: desc
    });
  }

  showWarning(msg: string, desc?: string): MatSnackBarRef<ToastComponent> {
    return this.show({
      typeToast: TypeToast.WARNING,
      message: msg,
      description: desc
    });
  }

  showError(msg: string, desc?: string): MatSnackBarRef<ToastComponent> {
    return this.show({
      typeToast: TypeToast.ERROR,
      message: msg,
      description: desc
    });
  }
}
