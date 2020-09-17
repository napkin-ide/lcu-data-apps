import { GenericModalgModel } from './../../../models/generic-modal-model';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Inject, OnInit, Output, ViewContainerRef, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lcu-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit, OnDestroy {

  // Events
  @Output('action-event')
  public ActionEvent: EventEmitter<any>;

  // Properties
  protected componentRef: ComponentRef<any>;
  protected vcRef: ViewContainerRef;

  constructor(
    protected dialogRef: MatDialogRef<GenericModalComponent>,
    protected resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public Data: GenericModalgModel) {
      this.ActionEvent = new EventEmitter();
    }

   // Lifecycle hooks
  public ngOnInit(): void {
    /**
     * Need to use a timeout, otherwise the component won't
     * exist on load; dumb, I know. - shannon
     */
    setTimeout(() => {
      this.renderModalComponent();
    }, 1);
  }

  /**
   * Destroy modal component
   */
  public ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  /**
   * Close dialog
   */
  public OnCancel(): void {
    this.dialogRef.close();
  }

  public OnAction(): void {
    this.ActionEvent.emit();
  }

  // Helpers

  /**
   * Render the component to use in the modal (this.Data.Component)
   */
  protected renderModalComponent(): void {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.Data.Component);
    this.componentRef = this.vcRef.createComponent(factory);
  }
}
