import { TestBed } from '@angular/core/testing';

import { HttpRquestsService } from './http-rquests.service';

describe('HttpRquestsService', () => {
  let service: HttpRquestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRquestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
