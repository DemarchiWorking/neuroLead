import { TestBed } from '@angular/core/testing';

import { TargetEmpresaService } from './target-empresa.service';

describe('TargetEmpresaService', () => {
  let service: TargetEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TargetEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
