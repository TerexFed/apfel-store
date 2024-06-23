import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { BasketService } from '../../services/basket.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { BottomSheetService } from '../../services/bottom-sheet.service';
import { WatchedGadgetsService } from '../../services/watched-gadgets.service';


@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss'
})
// constructor() { }
export class BottomSheetComponent implements OnInit {
  public basketForm: FormGroup = new FormGroup({
    payType: new FormControl(''),
    deliveryType: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
    pickUp: new FormControl(''),
    telephone: new FormControl(''),
    email: new FormControl(''),
  })
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private bottomSheetRef: MatBottomSheetRef, public router: Router, public basketService: BasketService, public dialog: MatDialog, private formBuilder: FormBuilder, private bottomSheetService: BottomSheetService, public watchedGadgets: WatchedGadgetsService) { }



  closeBottomSheet() {
    this.bottomSheetRef.dismiss();
    this.bottomSheetService.closeBottomSheet();
  }

  public navigateToCategory(id: number) {
    this.router.navigate([`/category/${id}`])
    this.closeBottomSheet()
  }

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

  private getCityValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.basketForm.controls['deliveryType'].value === 'Доставка' && !control.value) {
        return { required: true };
      }
      return null;
    };
  }

  private getAddressValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.basketForm.controls['deliveryType'].value === 'Доставка' && !control.value) {
        return { required: true };
      }
      return null;
    };
  }

  private getPickUpValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.basketForm.controls['deliveryType'].value === 'Самовывоз' && !control.value) {
        return { required: true };
      }
      return null;
    };
  }


  ngOnInit(): void {
    this.basketForm = this.formBuilder.group({
      payType: ['Наличными', Validators.required],
      deliveryType: ['Доставка', Validators.required],
      city: ['', this.getCityValidator()],
      address: ['', this.getAddressValidator()],
      pickUp: ['', this.getPickUpValidator()],
      telephone: ['', Validators.required, this.telephoneValidator()],
      email: ['', Validators.email],
    })
  }

  public openModalBusketSuccess() {
    if (this.basketForm.valid) {
      this.dialog.ngOnDestroy()
      this.dialog.open(ModalWindowComponent, { data: { type: 'BasketSuccess' } })
    }
  }
}
