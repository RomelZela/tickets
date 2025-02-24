import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { DetailsEvents, Session } from '../model/details-events';
import { BehaviorSubject } from 'rxjs';

export const DEFAULT_EVENTO: DetailsEvents[] = [{
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
  eventSgn: WritableSignal<Partial<DetailsEvents>> = signal<Partial<DetailsEvents>>({});

  private cartBe = new BehaviorSubject<DetailsEvents[]>(DEFAULT_EVENTO);
  cart$ = this.cartBe.asObservable();

  constructor() {
    effect( () => {
      this.cart$.subscribe( (value) => {
        localStorage.setItem('cart', JSON.stringify(value));
      })

    })
  }

  public decreaseSelection(sessionSelected: Session): void {

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

    let updatedCart = this.cartBe.getValue().map((event: DetailsEvents) => ({
      ...event,
      sessions: event.sessions.map((session) =>
        session.date === sessionSelected.date
          ? {
              ...session,
              cart: session.cart === 0 ? session.cart : (session.cart ?? 0) - 1,
            }
          : session
      ),
    }));

    this.cartBe.next(updatedCart);
  }


  public increaseSelection(sessionSelected: Session): void {
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
    this.saveItemsCart(this.eventSgn());
  }

  private saveItemsCart(addEvent: any): void {
    let cart = this.cartBe.getValue();
    cart[0].event.id.length === 0 ? cart.shift() : cart;

    const existingIndex = cart.findIndex(
      (item) => item.event.id === addEvent.event.id
    );

    if (existingIndex !== -1) {
      cart[existingIndex].sessions = addEvent.sessions;
    } else {
      cart.push(addEvent);
    }
    this.cartBe.next(cart);
  }
}
