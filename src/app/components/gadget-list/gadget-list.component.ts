import { Component, Input, OnInit } from '@angular/core';
import { GadgetService } from '../../services/gadget.service';

@Component({
  selector: 'app-gadget-list',
  templateUrl: './gadget-list.component.html',
  styleUrl: './gadget-list.component.scss'
})
export class GadgetListComponent {
  constructor(public gadgetService: GadgetService) { }

  @Input() gadgetList: any[]
}
