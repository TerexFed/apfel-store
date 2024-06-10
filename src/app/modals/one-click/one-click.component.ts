import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';

@Component({
  selector: 'modal-one-click',
  templateUrl: './one-click.component.html',
  styleUrl: './one-click.component.scss'
})
export class OneClickComponent implements OnInit {
  public priceLowerForm: FormGroup = new FormGroup({
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

  ngOnInit(): void {
    this.priceLowerForm = this.formBuilder.group({
      telephone: ['', Validators.required, this.telephoneValidator()]
    })
  }

  @Input() title: string
  @Input() image: string
  @Input() price: string
  @Input() discountPrice: string

  public onSubmit() {
    if (this.priceLowerForm.valid) {
      this.dialog.ngOnDestroy()
      this.dialog.open(ModalWindowComponent, { data: { type: 'ApplicationSend' } })
    }
  }
}
