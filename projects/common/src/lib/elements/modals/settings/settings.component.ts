import { GenericModalService } from './../../../services/generic-modal.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lcu-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  // @Input('generic-modal')
  // public GenericModal: any;

  constructor(protected genericModalService: GenericModalService) { }

  ngOnInit(): void {
    this.genericModalService.OnAction().subscribe((res: any) => {
      console.log('ONAction Two', res);
    });
  }

  public OnAction(): void {
    this.genericModalService.OnAction();
  }

  public OnCancel(): void {
    this.genericModalService.Close('Thanks for using the modal!');
  }
}
