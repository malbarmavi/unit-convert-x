import { CurrencyCode } from '@core/types/currency-code';

export const CurrencyTable: { [code in CurrencyCode]: string } = {
  USD: 'United States Dolar',
  EUR: 'EUR',
  TRY: 'Turkish lira',
  PLN: 'Polish złoty',
  RON: 'Romanian Leu',
  CNY: 'Chinese Yuan',
} as const;

Object.freeze(CurrencyTable);
