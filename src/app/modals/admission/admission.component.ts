import { Component, Input } from '@angular/core';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'modal-admission',
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.scss'
})
export class AdmissionComponent {
  public admissionForm: FormGroup = new FormGroup({
    telephone: new FormControl('')
  })

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) { }

  private telephoneValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
      const pattern = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
      if (pattern.test(control.value)) {
        return Promise.resolve(null);
      } else {
        return Promise.resolve({ telephoneInvalid: true });
      }
    };
  }

  @Input() title: string = ''
  @Input() image: string = ''

  ngOnInit(): void {
    this.admissionForm = this.formBuilder.group({
      telephone: ['', Validators.required, this.telephoneValidator()]
    })
  }


  public onSubmit() {
    if (this.admissionForm.valid) {
      this.dialog.ngOnDestroy()
      this.dialog.open(ModalWindowComponent, { data: { type: 'ApplicationSend' } })
    }
  }
}
