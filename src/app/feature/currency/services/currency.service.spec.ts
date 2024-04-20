import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CurrencyCode } from '@core/types/currency-code';
import { CurrencyRate } from '@core/types/currency-rate';
import { Test } from '@core/util/test';
import { firstValueFrom, of } from 'rxjs';
import { CurrencyService } from './currency.service';

export const USD_Rate: CurrencyRate = {
  base: 'USD',
  exchange_rates: {
    CNY: 2,
    PLN: 2,
    EUR: 2,
    RON: 2,
    TRY: 32,
    USD: 1,
  },
};
describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('if base currency code and target are same return 1', async () => {
    const currencyCode: CurrencyCode = 'EUR';

    const result = await firstValueFrom(
      service.rate(currencyCode, currencyCode)
    );

    expect(result).toBe(1);
  });

  it('get the rate base of fake rate object', async () => {
    Test.spy(service, 'getCurrencyExchangeRate').and.returnValue(of(USD_Rate));

    const result = await firstValueFrom(service.rate('USD', 'TRY'));

    expect(result).toBe(USD_Rate.exchange_rates.TRY);
  });

  it('getCurrencyExchangeRate will call http get method', () => {
    const getMethod = Test.spy(service.http, 'get');

    service.getCurrencyExchangeRate('USD');

    expect(getMethod).toHaveBeenCalled();
  });
});
