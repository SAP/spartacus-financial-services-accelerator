import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-fs-slider-component',
  templateUrl: './slider-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  constructor() {}
}
