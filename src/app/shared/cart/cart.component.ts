import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Evento } from '../../core/model/events';
import { Dates } from '../../core/utils/Dates';
import { Session } from '../../core/model/details-events';

@Component({
  selector: 'onebox-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  private _cartService = inject(CartService);
  protected ticketSelected: any = [];
  protected sessions: any[] = [];

  ngOnInit(): void {

    this._cartService.cart$.subscribe((value) => {
     this.ticketSelected = value
    })
  }

  constructor() {

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

}
