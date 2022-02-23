import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DshbCardComponent } from './dshb-card.component';

describe('DshbCardComponent', () => {
  let component: DshbCardComponent;
  let fixture: ComponentFixture<DshbCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DshbCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DshbCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
