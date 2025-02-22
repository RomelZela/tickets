import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { CommonModule } from '@angular/common';
import { CarteleraApiService } from '../services/cartelera.api.service';
import { Evento } from '../../../core/model/events';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'onebox-cards',
  standalone: true,
  imports: [CommonModule, CardComponent, HttpClientModule],
  providers: [CarteleraApiService],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit{

  private _carteleraApi = inject(CarteleraApiService);

  eventos: Evento[] = [];

  ngOnInit(): void {
    this._carteleraApi.getEventos().subscribe((events) => {
      events.map((event) => {
        event.startDate = this.convertStringToDate(event.startDate);
        event.endDate = this.convertStringToDate(event.endDate);
        this.eventos = [...this.eventos, event];
      });
    });
  }

  convertStringToDate(date: string | Date): Date {
    debugger
    if(typeof date === 'string') {
      return new Date(Number(date));
    } else {
      return date
    }
  }

}
