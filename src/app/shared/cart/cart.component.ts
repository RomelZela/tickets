import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

import { DetailsEvents, Session } from '../../core/model/details-events';

@Component({
  selector: 'onebox-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {

  private _cartService = inject(CartService);

  ticketSelected: DetailsEvents[] = [];

  ngOnInit(): void {
    this._cartService.cart$.subscribe((value: DetailsEvents[]) => {
      this.ticketSelected = value;
    });
  }

  removeItem(session: Session): void {
    this._cartService.decreaseSelection(session);
  }
}
