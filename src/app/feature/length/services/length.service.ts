import { Injectable } from '@angular/core';
import { LengthConversionTable } from '@core/constant/length-conversion-table';
import { LengthKey } from '@core/types/length-key';

@Injectable({
  providedIn: 'root',
})
export class LengthService {
  getList(): LengthKey[] {
    return Object.keys(LengthConversionTable) as LengthKey[];
  }

  calculate(baseUnit: LengthKey, toUnit: LengthKey, value: number): number {
    const rate: number = LengthConversionTable[baseUnit][toUnit];
    return +(value * rate).toFixed(3)!;
  }
}
