import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Evento } from '../../core/model/events';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'onebox-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input({required: true}) eventos!: Evento;
  // @Input({required: true}) title!: string;
  // @Input({required: true}) subtitle!: string;
  // @Input({required: true}) image!: string;
  // @Input({required: true}) place!: string;
  // @Input({required: true}) start_date!: string;
  // @Input({required: true}) end_date!: string;
  // @Input({required: true}) description!: string;
  // @Input({required: true}) action_button!: string;


}
