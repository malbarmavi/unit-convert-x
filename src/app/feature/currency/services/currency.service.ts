import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CurrencyTable } from '@core/constant/currency-table';
import { CurrencyCode } from '@core/types/currency-code';
import { CurrencyList } from '@core/types/currency-list';
import { CurrencyRate } from '@core/types/currency-rate';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  http = inject(HttpClient);
  constructor() {
    console.log(environment.currencyAPIUrl);
  }
  getList(): CurrencyList {
    const keys: CurrencyCode[] = Object.keys(CurrencyTable) as CurrencyCode[];
    return keys.map((c: CurrencyCode) => ({
      value: c,
      label: CurrencyTable[c],
    }));
  }

  getCurrencyExchangeRate(code: CurrencyCode): Observable<CurrencyRate> {
    const params = new HttpParams()
      .set('base', code)
      .set('api_key', environment.api_key);

    return this.http.get<CurrencyRate>(`${environment.currencyAPIUrl}/live/`, {
      params,
    });
  }

  rate(code: CurrencyCode, targetCode: CurrencyCode): Observable<number> {
    if (code === targetCode) {
      return of(1);
    }
    return this.getCurrencyExchangeRate(code).pipe(
      map((r) => r.exchange_rates[targetCode])
    );
  }
}
