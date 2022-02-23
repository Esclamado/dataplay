import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsAddComponent } from './staffs-add.component';

describe('StaffsAddComponent', () => {
  let component: StaffsAddComponent;
  let fixture: ComponentFixture<StaffsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
