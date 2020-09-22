import { Observable } from 'rxjs';
import { GenericModalModel } from './../models/generic-modal-model';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericModalComponent } from '../elements/modals/generic-modal/generic-modal.component';
import { take } from 'rxjs/internal/operators/take';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})

export class GenericModalService {

  /**
   * Instance of the modal (exposes modal properties)
   */
  public ModalInstance: GenericModalComponent;

  /**
   * Reference to the modal
   */
  public ModalComponent: MatDialogRef<GenericModalComponent, any>;

  constructor(protected dialog: MatDialog) { }

  /**
   *
   * @param modalConfig modal configuration
   *
   * open the modal
   */
  public Open(modalConfig: GenericModalModel): void {
    this.ModalComponent = this.dialog.open(GenericModalComponent, {
      data: modalConfig,
      width: modalConfig.Width
    });

    this.ModalInstance = this.ModalComponent.componentInstance;
  }

  /**
   * Close modal
   */
  public Close(val: any): void {
    this.ModalComponent.close(val);
  }

  /**
   * Event after the modal closes
   */
  public OnAction(): Observable<any> {
    
      return this.ModalComponent.afterClosed().pipe(take(1), map((res: any) => {
        return res;
      }
    ));
  }
}
