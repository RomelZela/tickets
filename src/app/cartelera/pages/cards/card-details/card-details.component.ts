import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { CarteleraApiService } from '../../services/cartelera.api.service';
import { CommonModule } from '@angular/common';
import { DetailsEvents, Session } from '../../../../core/model/details-events';
import { Dates } from '../../../../core/utils/Dates';

@Component({
  selector: 'onebox-card-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [CarteleraApiService],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss',
})
export class CardDetailsComponent implements OnInit {
  @Input({ alias: 'id', required: true }) eventId!: string;

  private _carteleraApi = inject(CarteleraApiService);

  detailEventSgn = signal<Partial<DetailsEvents>>({});
  selectedTickets = signal<any>({});

  availableEvent = computed(() => this.detailEventSgn().sessions ?? []);

  ngOnInit(): void {
    this.loadData();
  }

  constructor() {
    effect(() => {
      console.log(this.selectedTickets());
    });
  }

  loadData(): void {
    this._carteleraApi.getEventInfo(this.eventId).subscribe((event) => {
      event.sessions = event.sessions.map((session) => ({
        ...session,
        date: Dates.convertStringToDate(session.date),
        availability: Number(session.availability),
      }));

      event.sessions.sort(
        (a, b) => (a.date as Date).getTime() - (b.date as Date).getTime()
      );

      this.detailEventSgn.set(event);

      const initialSelected: { [key: string]: number } = {};
      event.sessions.forEach((session) => {
        initialSelected[session.date.toString()] = 0;
      });
      this.selectedTickets.set({
        ...this.detailEventSgn().event,
        initialSelected,
      });
    });
  }

  decreaseSelection(sessionSelected: Session) {
    const sessionKey = sessionSelected.date.toString();

    this.selectedTickets.update((selected) => ({
      ...selected,
      initialSelected: {
        ...selected.initialSelected,
        [sessionKey]: Math.max(
          0,
          (selected.initialSelected[sessionKey] || 0) - 1
        ),
      },
    }));
  }

  increaseSelection(sessionSelected: Session) {
    const sessionKey = sessionSelected.date.toString();
    const originalAvailability = this.detailEventSgn().sessions!.find(
      (s) => s.date === sessionSelected.date
    )!.availability;

    if (
      this.selectedTickets().initialSelected[sessionKey] <
      Number(originalAvailability)
    ) {
      this.selectedTickets.update((selected) => ({
        ...selected,
        initialSelected: {
          ...selected.initialSelected,
          [sessionKey]: (selected.initialSelected[sessionKey] || 0) + 1,
        },
      }));
    }
  }
}
