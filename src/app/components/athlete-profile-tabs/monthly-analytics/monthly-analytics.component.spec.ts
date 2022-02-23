import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAnalyticsComponent } from './monthly-analytics.component';

describe('MonthlyAnalyticsComponent', () => {
  let component: MonthlyAnalyticsComponent;
  let fixture: ComponentFixture<MonthlyAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
