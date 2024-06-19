import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../../UI/modal-window/modal-window.component';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'distribution',
  templateUrl: './distribution.component.html',
  styleUrl: './distribution.component.scss'
})
export class DistributionComponent implements OnInit {
  constructor(private dialog: MatDialog, private formBuilder: FormBuilder) { }

  public distributionForm: FormGroup = new FormGroup({
    tel: new FormControl(''),
  })

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

  ngOnInit(): void {
    this.distributionForm = this.formBuilder.group({
      tel: ['', Validators.required, this.telephoneValidator()]
    })
  }

  openModalApplicationSend() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'ApplicationSend' } })
  }

  public onSubmit() {
    console.log(this.distributionForm.valid)
    if (this.distributionForm.valid) {
      this.openModalApplicationSend()
    }
  }

}
