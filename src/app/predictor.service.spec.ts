import { TestBed, inject } from '@angular/core/testing';

import { PredictorService } from './predictor.service';

describe('PredictorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PredictorService]
    });
  });

  it('should be created', inject([PredictorService], (service: PredictorService) => {
    expect(service).toBeTruthy();
  }));
});
