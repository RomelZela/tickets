import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, Input, OnInit } from '@angular/core';
import { CarteleraApiService } from '../../services/cartelera.api.service';
import { CommonModule, Location } from '@angular/common';
import { Session } from '../../../../core/model/details-events';
import { Dates } from '../../../../core/utils/Dates';
import { CartService } from '../../../../core/services/cart.service';
import { CartComponent } from '../../../../shared/cart/cart.component';

@Component({
  selector: 'onebox-card-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule, CartComponent],
  providers: [CarteleraApiService, CartService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss',
})
export class CardDetailsComponent implements OnInit {
  @Input({ alias: 'id', required: true }) eventId!: string;

  private _carteleraApi = inject(CarteleraApiService);
  private _cartService = inject(CartService);
  private _location = inject(Location);

  eventsSgn = computed(() => this._cartService.eventOpenedSgn());

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._carteleraApi.getEventInfo(this.eventId).subscribe((evento) => {
      evento.sessions = evento.sessions.map((session) => ({
        ...session,
        date: Dates.convertStringToDate(session.date),
        availability: Number(session.availability),
        cart: 0,
      }));

      evento.sessions.sort(
        (a, b) => (a.date as Date).getTime() - (b.date as Date).getTime()
      );

      this._cartService.eventOpenedSgn.set(evento);
    });
  }

  decreaseSelection(sessionSelected: Session) {
    this._cartService.decreaseSelection(sessionSelected);
  }
  increaseSelection(sessionSelected: Session) {
    this._cartService.increaseSelection(sessionSelected);
  }

  goBack() {
    this._location.back();
  }
}
