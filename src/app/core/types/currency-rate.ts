import { CurrencyCode } from './currency-code';

export interface CurrencyRate {
  base: CurrencyCode;
  exchange_rates: {
    [code in CurrencyCode]: number;
  };
}
