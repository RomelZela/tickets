import { TestBed } from '@angular/core/testing';

import { CarteleraApiService } from './cartelera.api.service';

describe('CarteleraApiService', () => {
  let service: CarteleraApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarteleraApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
