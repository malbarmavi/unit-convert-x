import { TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SymbolPipe } from '@core/pipes/symbol.pipe';
import { LengthKey } from '@core/types/length-key';
import { merge } from 'rxjs';
import { MaterialModule } from '../../core/modules/material.module';
import { LengthService } from './services/length.service';

@Component({
  selector: 'uc-length',
  standalone: true,
  imports: [
    MaterialModule,
    FlexModule,
    ReactiveFormsModule,
    SymbolPipe,
    TitleCasePipe,
  ],
  templateUrl: './length.component.html',
  styleUrl: './length.component.scss',
})
export class LengthComponent implements OnInit {
  ls = inject(LengthService);
  fb = inject(FormBuilder);

  units = this.ls.getList();

  form = this.fb.nonNullable.group({
    baseUnit: this.fb.nonNullable.control<LengthKey>('meter'),
    baseValue: this.fb.nonNullable.control(0),
    targetUnit: this.fb.nonNullable.control<LengthKey>('inch'),
    targetValue: this.fb.nonNullable.control(0),
  });

  desRef = inject(DestroyRef);

  ngOnInit(): void {
    const target$ = this.form.get('targetValue')!.valueChanges.subscribe(() => {
      this.convertTargetToBase();
    });

    const controls$ = merge(
      this.form.get('baseUnit')!.valueChanges,
      this.form.get('targetUnit')!.valueChanges,
      this.form.get('baseValue')!.valueChanges
    ).subscribe(() => {
      this.convertBaseToTarget();
    });

    this.desRef.onDestroy(() => {
      controls$.unsubscribe();
      target$.unsubscribe();
    });
  }

  convertBaseToTarget() {
    const { baseUnit, targetUnit, baseValue } = this.form.getRawValue();
    const value = this.ls.calculate(baseUnit, targetUnit, baseValue);

    this.form.get('targetValue')?.setValue(value, { emitEvent: false });
  }

  //only trigger as a side effect of changing the target value as the normal flow is to change base to target
  convertTargetToBase() {
    const { baseUnit, targetUnit, targetValue } = this.form.getRawValue();
    const value = this.ls.calculate(targetUnit, baseUnit, targetValue);

    this.form.get('baseValue')?.setValue(value, { emitEvent: false });
  }
}
