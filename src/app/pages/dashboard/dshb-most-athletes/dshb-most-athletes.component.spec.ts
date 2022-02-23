import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DshbMostAthletesComponent } from './dshb-most-athletes.component';

describe('DshbMostAthletesComponent', () => {
  let component: DshbMostAthletesComponent;
  let fixture: ComponentFixture<DshbMostAthletesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DshbMostAthletesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DshbMostAthletesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
