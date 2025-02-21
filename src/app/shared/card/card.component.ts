import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'onebox-card',
  standalone: true,
  imports: [
    UpperCasePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input({required: true}) title!: string;
  @Input({required: true}) subtitle!: string;
  @Input({required: true}) image!: string;
  // @Input({required: true}) place!: string;
  @Input({required: true}) start_date!: string;
  @Input({required: true}) end_date!: string;
  @Input({required: true}) description!: string;
  @Input({required: true}) action_button!: string;


}
