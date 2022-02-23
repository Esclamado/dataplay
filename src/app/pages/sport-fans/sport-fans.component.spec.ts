import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportFansComponent } from './sport-fans.component';

describe('SportFansComponent', () => {
  let component: SportFansComponent;
  let fixture: ComponentFixture<SportFansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportFansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportFansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
