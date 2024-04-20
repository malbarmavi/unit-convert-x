/* eslint-disable @typescript-eslint/ban-types */
import { CurrencyCode } from '@core/types/currency-code';
import { LengthKey } from '@core/types/length-key';

export const Symbol: Partial<{
  [k in CurrencyCode | LengthKey | (string & {})]: string;
}> = {
  USD: '$',
  EUR: '€',
  TRY: ' ₺',
  PLN: 'zł',
  CNY: '¥',
  centimeter: 'cm',
  meter: 'm',
  foot: 'ft',
  inch: 'in',
  yard: 'yd',
};

Object.freeze(Symbol);
