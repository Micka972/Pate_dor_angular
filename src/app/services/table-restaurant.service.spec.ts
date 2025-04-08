import { TestBed } from '@angular/core/testing';

import { TableRestaurantService } from './table-restaurant.service';

describe('TableRestaurantService', () => {
  let service: TableRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
