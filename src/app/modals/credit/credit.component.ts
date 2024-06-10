import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';

@Component({
  selector: 'modal-credit',
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.scss'
})
export class CreditComponent implements OnInit {
  public creditForm: FormGroup = new FormGroup({
    bank: new FormControl(''),
    creditLength: new FormControl(''),
    creditOwe: new FormControl(''),
    age: new FormControl(''),
    telephone: new FormControl(''),
  })

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder) { }

  @Input() title: string = ''
  @Input() image: string = ''
  @Input() price: string = ''
  @Input() discountPrice: string = ''

  public monthPayment: number = 0

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
    this.creditForm = this.formBuilder.group({
      bank: ['Тинькофф', Validators.required],
      creditLength: ['', Validators.required],
      creditOwe: ['Нет', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(69)]],
      telephone: ['', Validators.required, this.telephoneValidator()]
    })
    this.creditForm.get('creditLength')!.valueChanges.subscribe((value) => {
      this.setMonthPayment();
    });
  }

  setMonthPayment() {
    this.monthPayment = Math.round(+this.price / this.creditForm.controls['creditLength'].value)
  }

  public onSubmit() {
    if (this.creditForm.valid) {
      this.dialog.ngOnDestroy()
      this.dialog.open(ModalWindowComponent, { data: { type: 'ApplicationSend' } })
    }
  }
}
