import { TestBed } from '@angular/core/testing';

import { CompWrapperService } from './comp-wrapper.service';

describe('CompWrapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompWrapperService = TestBed.get(CompWrapperService);
    expect(service).toBeTruthy();
  });
});
