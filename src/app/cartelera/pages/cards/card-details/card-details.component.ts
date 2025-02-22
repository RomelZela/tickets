import { HttpClientModule } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CarteleraApiService } from '../../services/cartelera.api.service';
import { CommonModule } from '@angular/common';
import { DetailsEvents } from '../../../../core/model/details-events';

@Component({
  selector: 'onebox-card-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [CarteleraApiService],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent implements OnInit{

  @Input({alias: 'id', required: true}) eventId!: string;

  private _carteleraApi = inject(CarteleraApiService);

  detailEvent!: DetailsEvents;

  ngOnInit(): void {
    debugger
     this._carteleraApi.getEventInfo(this.eventId).subscribe((event) => {
       this.detailEvent = event;
     });
  }
}
