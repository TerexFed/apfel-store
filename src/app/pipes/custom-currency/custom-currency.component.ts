import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customCurrency' })
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number | string, currencySymbol: string = '₽'): string {
    const stringValue = String(value);
    const parts = stringValue.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    if (parts.length === 2) {
      return integerPart + ' ' + parts[1] + ' ' + currencySymbol;
    } else {
      return integerPart + ' ' + currencySymbol;
    }
  }
}
