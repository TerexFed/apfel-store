import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';

@Component({
  selector: 'modal-trade-in',
  templateUrl: './trade-in.component.html',
  styleUrl: './trade-in.component.scss'
})
export class TradeInComponent implements OnInit {
  public tradeInForm: FormGroup = new FormGroup({
    device: new FormControl(''),
    telephone: new FormControl(''),
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


  ngOnInit(): void {
    this.tradeInForm = this.formBuilder.group({
      device: ['', Validators.required],
      telephone: ['', Validators.required, this.telephoneValidator()]
    })
  }

  public onSubmit() {
    if (this.tradeInForm.valid) {
      this.dialog.ngOnDestroy()
      this.dialog.open(ModalWindowComponent, { data: { type: 'ApplicationSend' } })
    }
  }
}
