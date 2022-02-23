import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerHighlightsComponent } from './career-highlights.component';

describe('CareerHighlightsComponent', () => {
  let component: CareerHighlightsComponent;
  let fixture: ComponentFixture<CareerHighlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerHighlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
