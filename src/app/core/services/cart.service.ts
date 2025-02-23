import { Injectable, signal, WritableSignal, effect } from '@angular/core';
import { DetailsEvents } from '../model/details-events';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartSgn: WritableSignal<any> = signal<any>(this.loadCart());

  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cartSgn()));
    });
  }

  private loadCart(): DetailsEvents[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  setItemsCart(addEvent: any): void {
    debugger;

    console.log('evento ', addEvent);

    this.cartSgn.update((cart) => {
      const eventExists = cart.some((evento: any) => evento.id === addEvent.id);

      if (eventExists) {
        return cart.map((evento: any) =>
          evento.id === addEvent.id ? addEvent : evento
        );
      } else {
        return [...cart, addEvent];
      }
    });
  }
  getItemsCart(): DetailsEvents[] {
    return this.cartSgn();
  }
}
