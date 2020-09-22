import { GenericModalModel } from './../../../models/generic-modal-model';
import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  OnInit,
  ViewContainerRef,
  OnDestroy,
  ViewChild,
  HostListener, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lcu-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit, OnDestroy {

 // Properties
 protected componentRef: ComponentRef<any>;

@Input('test')
public Test: string;

 /**
  * Access the component passed into the modal
  */
 @ViewChild('content', { read: ViewContainerRef })
 public vcRef: ViewContainerRef;

  // Events
  @HostListener('keydown.esc')
  public onEsc() {
   // this.OnCancel(false);
  }

  constructor(
    protected dialogRef: MatDialogRef<GenericModalComponent>,
    protected resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public Data: GenericModalModel) {}

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
   * User cancels
   */
  public OnCancel(val: boolean = false): void {
    // this.dialogRef.close(val);
  }

  /**
   * User confirms action(s)
   */
  public OnAction(): void {
    // this.Data.CallbackAction(true);
    // this.dialogRef.close(true);
  }

  // Helpers

  /**
   * Render the component to use within the modal (this.Data.Component)
   */
  protected renderModalComponent(): void {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.Data.Component);
    this.componentRef = this.vcRef.createComponent(factory);
  }
}
