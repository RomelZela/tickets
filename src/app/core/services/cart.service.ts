import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { DetailsEvents, Session } from '../model/details-events';
import { BehaviorSubject } from 'rxjs';

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
  eventOpenedSgn: WritableSignal<Partial<DetailsEvents>> = signal<
    Partial<DetailsEvents>
  >({});

  private cartStored = new BehaviorSubject<DetailsEvents[]>(DEFAULT_EVENTO);
  cart$ = this.cartStored.asObservable();

  constructor() {
    if(localStorage.getItem('cart')){
      this.cartStored.next(JSON.parse(localStorage.getItem('cart')!));
    }

    effect(() => {
      this.cart$.subscribe((value) => {
        localStorage.setItem('cart', JSON.stringify(value));
      });
    });
  }

  public decreaseSelection(sessionSelected: Session): void {
    this.updateEventOpenedSignal(sessionSelected);
    this.updateCartStored(sessionSelected);
  }

  private updateEventOpenedSignal(sessionSelected: Session): void {
    this.eventOpenedSgn.set({
      ...this.eventOpenedSgn(),
      sessions: this.eventOpenedSgn().sessions!.map((session) =>
        session.date === sessionSelected.date
          ? {
              ...session,
              cart: session.cart === 0 ? session.cart : (session.cart ?? 0) - 1,
            }
          : session
      ),
    });
  }

  private updateCartStored(sessionSelected: Session): void {
    let updatedCart = this.cartStored
      .getValue()
      .map((event: DetailsEvents) => ({
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

    this.cartStored.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }


  public increaseSelection(sessionSelected: Session): void {
    this.eventOpenedSgn.set({
      ...this.eventOpenedSgn(),
      sessions: this.eventOpenedSgn().sessions!.map((session) =>
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
    this.saveItemsCart(this.eventOpenedSgn());
  }

  private saveItemsCart(addEvent: any): void {
    let cart = this.cartStored.getValue();
    cart[0].event.id.length === 0 ? cart.shift() : cart;

    const existingIndex = cart.findIndex(
      (item) => item.event.id === addEvent.event.id
    );

    if (existingIndex !== -1) {
      cart[existingIndex].sessions = addEvent.sessions;
    } else {
      cart.push(addEvent);
    }
    this.cartStored.next(cart);
  }
}
