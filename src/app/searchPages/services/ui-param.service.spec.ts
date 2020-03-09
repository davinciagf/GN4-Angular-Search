import { TestBed } from '@angular/core/testing';

import { UiParamService } from './ui-param.service';

describe('UiParamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiParamService = TestBed.get(UiParamService);
    expect(service).toBeTruthy();
  });
});
