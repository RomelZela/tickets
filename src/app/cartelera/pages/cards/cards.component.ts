import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { CommonModule } from '@angular/common';
import { CarteleraApiService } from '../services/cartelera.api.service';
import { Evento } from '../../../core/model/events';
import { HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Dates } from '../../../core/utils/Dates';

@Component({
  selector: 'onebox-cards',
  standalone: true,
  imports: [CommonModule, CardComponent, HttpClientModule],
  providers: [CarteleraApiService],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent implements OnInit {

  private _carteleraApi = inject(CarteleraApiService);

  eventos: Evento[] = [];

  ngOnInit(): void {
    this.loadCartelera();
  }

  loadCartelera(): void {
    this._carteleraApi.getEvents().subscribe((events) => {
      events.map(async (event) => {
        event.startDate = Dates.convertStringToDate(event.startDate);
        event.endDate = Dates.convertStringToDate(event.endDate);
        event.isAvailable = await this.isAvailableEvent(event.id);
        this.eventos = [...this.eventos, event];
        this.eventos.sort(
          (a, b) =>
            (a.endDate as Date).getTime() - (b.endDate as Date).getTime()
        );
      });
    });
  }

  async isAvailableEvent(eventId: string): Promise<boolean> {
    try {
      await firstValueFrom(this._carteleraApi.getEventInfo(eventId));
      return true;
    } catch (error: any) {
      return false;
    }
  }
}
