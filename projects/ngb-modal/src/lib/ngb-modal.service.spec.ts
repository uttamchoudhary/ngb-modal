import { TestBed, inject } from '@angular/core/testing';

import { NgbModalService } from './ngb-modal.service';

describe('NgbModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbModalService]
    });
  });

  it('should be created', inject([NgbModalService], (service: NgbModalService) => {
    expect(service).toBeTruthy();
  }));
});
