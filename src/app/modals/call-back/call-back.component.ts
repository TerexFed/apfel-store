import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'modal-callback',
  templateUrl: './call-back.component.html',
  styleUrl: './call-back.component.scss'
})
export class CallBackComponent implements OnInit {
  public callbackForm: FormGroup = new FormGroup({
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
    this.callbackForm = this.formBuilder.group({
      telephone: ['', Validators.required, this.telephoneValidator()]
    })
  }

  public onSubmit(){
    if(this.callbackForm.valid){
      this.dialog.ngOnDestroy()
      this.dialog.open(ModalWindowComponent, { data: { type: 'ApplicationSend' } })
    }
  }
}
