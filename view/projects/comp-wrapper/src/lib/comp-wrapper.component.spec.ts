import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompWrapperComponent } from './comp-wrapper.component';

describe('CompWrapperComponent', () => {
  let component: CompWrapperComponent;
  let fixture: ComponentFixture<CompWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
