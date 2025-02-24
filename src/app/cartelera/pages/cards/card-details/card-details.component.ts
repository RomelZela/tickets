import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CarteleraApiService } from '../../services/cartelera.api.service';
import { CommonModule } from '@angular/common';
import { DetailsEvents, Session } from '../../../../core/model/details-events';
import { Dates } from '../../../../core/utils/Dates';
import { CartService } from '../../../../core/services/cart.service';
import { CartComponent } from '../../../../shared/cart/cart.component';
import { Evento } from '../../../../core/model/events';

@Component({
  selector: 'onebox-card-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule, CartComponent],
  providers: [CarteleraApiService, CartService],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss',
})
export class CardDetailsComponent implements OnInit {
  @Input({ alias: 'id', required: true }) eventId!: string;

  private _carteleraApi = inject(CarteleraApiService);
  private _cartService = inject(CartService);

  eventSgn: WritableSignal<Partial<DetailsEvents>> = signal<
    Partial<DetailsEvents>
  >({});

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

      this.eventSgn.set(evento);
    });
  }

  decreaseSelection(sessionSelected: Session) {
    this.eventSgn.set({
      ...this.eventSgn(),
      sessions: this.eventSgn().sessions!.map((session) =>
        session.date === sessionSelected.date
          ? {
              ...session,
              cart: session.cart === 0 ? session.cart : (session.cart ?? 0) - 1,
            }
          : session
      ),
    });

    this._cartService.setItemsCart(this.eventSgn())
  }

  increaseSelection(sessionSelected: Session) {
    console.log(sessionSelected);
    this.eventSgn.set({
      ...this.eventSgn(),
      sessions: this.eventSgn().sessions!.map((session) =>
        session.date === sessionSelected.date
          ? {
              ...session,
              cart:
                session.cart === session.availability
                  ? session.cart
                  : (session.cart ?? 0) + 1,
            }
          : session
      ),
    });

    this._cartService.setItemsCart(this.eventSgn())
  }
}
