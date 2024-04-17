import { Component } from '@angular/core';
import { MaterialModule } from '../../core/modules/material.module';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss',
})
export class CurrencyComponent {}
