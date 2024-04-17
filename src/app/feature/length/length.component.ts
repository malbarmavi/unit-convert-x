import { Component } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MaterialModule } from '../../core/modules/material.module';

@Component({
  selector: 'uc-length',
  standalone: true,
  imports: [MaterialModule, FlexModule],
  templateUrl: './length.component.html',
  styleUrl: './length.component.scss',
})
export class LengthComponent {}
