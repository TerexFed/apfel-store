import { Component, Input } from '@angular/core';
import { Product } from '../../types/product';

@Component({
  selector: 'app-gadget-list',
  templateUrl: './gadget-list.component.html',
  styleUrl: './gadget-list.component.scss',
})
export class GadgetListComponent {
  @Input() gadgetList: Product[] | [{ errorMessage: string }] = []

  isError(item: Product | { errorMessage: string }): item is { errorMessage: string } {
    return 'errorMessage' in item;
  }
}
