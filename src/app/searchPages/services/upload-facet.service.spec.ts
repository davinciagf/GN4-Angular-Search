import { TestBed } from '@angular/core/testing';

import { UploadFacetService } from './upload-facet.service';

describe('UploadFacetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadFacetService = TestBed.get(UploadFacetService);
    expect(service).toBeTruthy();
  });
});
