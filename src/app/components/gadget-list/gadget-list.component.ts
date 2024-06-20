import { Component, OnInit } from '@angular/core';
import { GadgetService } from '../../services/gadget.service';

@Component({
  selector: 'app-gadget-list',
  templateUrl: './gadget-list.component.html',
  styleUrl: './gadget-list.component.scss',
})
export class GadgetListComponent implements OnInit {
  constructor(public gadgetService: GadgetService) {}

  ngOnInit(): void {
    this.gadgetService.getAllGadgets();
  }
}
