import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { CommonModule } from '@angular/common';
import { CarteleraApiService } from '../services/cartelera.api.service';
import { Evento } from '../../../core/model/events';
import { HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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
    this._carteleraApi.getEvents().subscribe((events) => {
      events.map(async (event) => {
        event.startDate = this.convertStringToDate(event.startDate);
        event.endDate = this.convertStringToDate(event.endDate);
        event.isAvailable = await this.isAvailableEvent(event.id);
        this.eventos = [...this.eventos, event];
      });
    });
    console.log(this.eventos);

  }

  async isAvailableEvent(eventId: string): Promise<boolean> {
    try {
      await firstValueFrom(this._carteleraApi.getEventInfo(eventId));
      return true;
    } catch (error: any) {
      return false;
    }
  }

  convertStringToDate(date: string | Date): Date {
    if(typeof date === 'string') {
      return new Date(Number(date));
    } else {
      return date
    }
  }

}
