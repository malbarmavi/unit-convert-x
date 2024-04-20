import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '@core/modules/material.module';
import { SymbolPipe } from '@core/pipes/symbol.pipe';
import { CurrencyCode } from '@core/types/currency-code';
import { debounceTime, filter, firstValueFrom, merge } from 'rxjs';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'uc-currency',
  standalone: true,
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss',
  imports: [MaterialModule, ReactiveFormsModule, FlexModule, SymbolPipe],
})
export class CurrencyComponent implements OnInit {
  currencyService = inject(CurrencyService);
  fb = inject(FormBuilder);

  currenyList = this.currencyService.getList();

  form = this.fb.nonNullable.group({
    baseCode: this.fb.nonNullable.control<CurrencyCode>('USD'),
    baseValue: this.fb.nonNullable.control(0, [
      Validators.required,
      Validators.min(0),
    ]),
    targetCode: this.fb.nonNullable.control<CurrencyCode>('EUR'),
    targetValue: this.fb.nonNullable.control(0, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  desRef = inject(DestroyRef);

  ngOnInit(): void {
    const target$ = this.form
      .get('targetValue')!
      .valueChanges.pipe(
        debounceTime(1000),
        filter(() => this.form.valid)
      )
      .subscribe(() => {
        this.convertTargetToBase();
      });

    const controls$ = merge(
      this.form.get('baseCode')!.valueChanges,
      this.form.get('targetCode')!.valueChanges,
      this.form.get('baseValue')!.valueChanges
    )
      .pipe(
        debounceTime(1000),
        filter(() => this.form.valid)
      )
      .subscribe(() => {
        this.convertBaseToTarget();
      });

    this.desRef.onDestroy(() => {
      controls$.unsubscribe();
      target$.unsubscribe();
    });
  }

  async convertBaseToTarget() {
    const { baseCode, targetCode, baseValue } = this.form.getRawValue();
    try {
      const rate = await firstValueFrom(
        this.currencyService.rate(baseCode, targetCode)
      );

      this.form
        .get('targetValue')
        ?.setValue(this.calculate(baseValue, rate), { emitEvent: false });
    } catch {
      this.form.get('targetValue')?.setValue(0, { emitEvent: false });
    }
  }

  //only trigger as a side effect of changing the target value as the normal flow is to change base to target
  async convertTargetToBase() {
    const { baseCode, targetCode, targetValue } = this.form.getRawValue();
    try {
      const rate = await firstValueFrom(
        this.currencyService.rate(targetCode, baseCode)
      );

      this.form
        .get('baseValue')
        ?.setValue(this.calculate(targetValue, rate), { emitEvent: false });
    } catch {
      this.form.get('baseValue')?.setValue(0, { emitEvent: false });
    }
  }

  calculate(value: number, rate: number) {
    return +(value * rate).toFixed(3);
  }
}
