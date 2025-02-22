import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Evento } from '../../../core/model/events';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarteleraApiService {

  private dataUrl = "assets/data/events.json";

  private _http = inject(HttpClient)

  public getEventos(): Observable<Evento[]> {
    return this._http.get<Evento[]>(this.dataUrl);
  }
}
