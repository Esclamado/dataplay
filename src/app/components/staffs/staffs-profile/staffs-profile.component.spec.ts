import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsProfileComponent } from './staffs-profile.component';

describe('StaffsProfileComponent', () => {
  let component: StaffsProfileComponent;
  let fixture: ComponentFixture<StaffsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
