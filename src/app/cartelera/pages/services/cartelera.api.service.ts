import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Evento } from '../../../core/model/events';
import { Observable } from 'rxjs';
import { DetailsEvents } from '../../../core/model/details-events';

@Injectable({
  providedIn: 'root'
})
export class CarteleraApiService {

  private dataUrl = "assets/data/events.json";
  private detailUrl = "assets/data/event-info-"

  private _http = inject(HttpClient)

  public getEvents(): Observable<Evento[]> {
    return this._http.get<Evento[]>(this.dataUrl);
  }

  public getEventInfo(id: string): Observable<DetailsEvents> {
    return this._http.get<DetailsEvents>(`${this.detailUrl}${id}.json`);
  }
}

