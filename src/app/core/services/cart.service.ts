import { Injectable, signal, WritableSignal, effect } from '@angular/core';
import { DetailsEvents } from '../model/details-events';
import { BehaviorSubject } from 'rxjs';
import { CardComponent } from '../../shared/card/card.component';

export const DEFAULT_EVENTO: DetailsEvents[] = [
  {
    event: {
      id: '',
      title: '',
      subtitle: '',
      image: '',
    },
    sessions: [],
  },
];
@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartBe = new BehaviorSubject<DetailsEvents[]>(DEFAULT_EVENTO);
  cart$ = this.cartBe.asObservable();

  constructor() {
    effect(() => {});
  }

  setItemsCart(addEvent: any): void {
    let cart = this.cartBe.getValue();
    cart[0].event.id.length === 0 ? cart.shift() : cart

    const existingIndex = cart.findIndex(
      (item) => item.event.id === addEvent.event.id
    );

    if (existingIndex !== -1) {
      cart[existingIndex].sessions = addEvent.sessions;
    } else {
      cart.push(addEvent);
    }

    this.cartBe.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
