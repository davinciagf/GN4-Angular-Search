import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickResultComponent } from './quick-result.component';

describe('QuickResultComponent', () => {
  let component: QuickResultComponent;
  let fixture: ComponentFixture<QuickResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
