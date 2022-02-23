import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DshbComponent } from './dshb.component';

describe('DshbComponent', () => {
  let component: DshbComponent;
  let fixture: ComponentFixture<DshbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DshbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DshbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
