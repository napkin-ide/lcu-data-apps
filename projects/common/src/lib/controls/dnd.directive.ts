import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[lcuDnd]',
})
export class DndDirective {
  //  Fields

  //  Properties
  @Output('dropped')
  Dropped: EventEmitter<DragEvent>;

  @HostBinding('class.fileover')
  public Over: boolean;

  //  Constructors
  constructor() {
    this.Dropped = new EventEmitter<DragEvent>();
  }

  //  API Methods
  @HostListener('dragover', ['$event'])
  public OnDragOver(evt: DragEvent) {
    evt.preventDefault();

    evt.stopPropagation();

    this.Over = true;
  }

  @HostListener('dragleave', ['$event'])
  public OnDragLeave(evt: DragEvent) {
    evt.preventDefault();

    evt.stopPropagation();

    this.Over = false;
  }

  @HostListener('drop', ['$event'])
  public OnDrop(evt: DragEvent) {
    evt.preventDefault();

    evt.stopPropagation();

    this.Over = false;

    this.Dropped.emit(evt);
  }

  //  Helpers
}
