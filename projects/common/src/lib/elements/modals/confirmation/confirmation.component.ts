import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lcu-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})

export class ConfirmationComponent implements OnInit {

  @Input('confirmation-message')
  public ConfirmMessage: string = 'default confirmation';

  constructor() { }

  ngOnInit(): void {
    // this.ConfirmMessage = 'Are you sure you want to delete?';
  }

}
