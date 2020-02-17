import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultviewComponent } from './resultview.component';

describe('ResultviewComponent', () => {
  let component: ResultviewComponent;
  let fixture: ComponentFixture<ResultviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
