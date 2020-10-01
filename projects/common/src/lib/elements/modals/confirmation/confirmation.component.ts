import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lcu-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  public ConfirmMessage: string;

  constructor() { }

  ngOnInit(): void {
    this.ConfirmMessage = 'Are you sure you want to delete?';
  }

}
