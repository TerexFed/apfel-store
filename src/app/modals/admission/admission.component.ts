import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal-admission',
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.scss'
})
export class AdmissionComponent {
  @Input() title: string = ''
}
