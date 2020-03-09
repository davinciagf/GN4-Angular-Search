import { TestBed } from '@angular/core/testing';

import { ParamRequestService } from './param-request.service';

describe('ParamRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParamRequestService = TestBed.get(ParamRequestService);
    expect(service).toBeTruthy();
  });
});
