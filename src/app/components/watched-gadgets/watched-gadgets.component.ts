import { Component, Input } from '@angular/core';
import { WatchedGadgetsService } from '../../services/watched-gadgets.service';
import { GadgetService } from '../../services/gadget.service';

@Component({
  selector: 'watched-gadgets',
  templateUrl: './watched-gadgets.component.html',
  styleUrl: './watched-gadgets.component.scss'
})
export class WatchedGadgetsComponent {
  constructor(public watchedGadgetsService: WatchedGadgetsService) { }

  @Input() type:string
}
