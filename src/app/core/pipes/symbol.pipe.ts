import { Pipe, PipeTransform } from '@angular/core';
import { Symbol } from '@core/constant/symbol';

@Pipe({
  name: 'symbol',
  standalone: true,
})
export class SymbolPipe implements PipeTransform {
  transform(value: string = ''): string {
    return Symbol[value] || value;
  }
}
