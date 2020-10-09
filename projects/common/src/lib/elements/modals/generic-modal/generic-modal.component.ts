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
  HostListener, Input, Type, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentProperties } from '../../../models/generic-modal-properties.model';
import { ComponentInputProperties } from '../../../models/generic-modal-input-properties.model';

@Component({
  selector: 'lcu-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit, OnDestroy {

 // Properties
 protected componentRef: ComponentRef<any>;

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
    @Inject(MAT_DIALOG_DATA) public Data: GenericModalModel) {

      console.log('DIALOGREF', dialogRef);

      setTimeout(() => {
        this.renderModalComponent();
      }, 1);
    }

  // Lifecycle hooks
  public ngOnInit(): void {
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
    this.dialogRef.close(val);
  }

  /**
   * User confirms action(s)
   */
  public OnAction(): void {
    // this.Data.CallbackAction(true);
    this.dialogRef.close(true);
  }

  // Helpers

  /**
   * Render the component to use within the modal (this.Data.Component)
   */
  protected renderModalComponent(): void {

    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.Data.Component);

    this.componentRef = this.vcRef.createComponent(factory);
    this.updateComponentProperties(factory);
  }

  /**
   * Update component properties
   *
   * @param factory current modal component
   */
  protected updateComponentProperties(factory: ComponentFactory<any>): void {

    // @Input() properties from the component class
    factory.inputs.map((input: ComponentInputProperties) => {
      const result = this.Data.Properties.filter(
        // check for similar properties
        (dataProperties: ComponentProperties) => dataProperties.PropName === input.propName);

      if (result.length > 0) {
        // update component @Input() properties with data property values
        this.componentRef.instance[input.propName] = result[0].Value;
      }

      // return input;
    });
  }
 }
