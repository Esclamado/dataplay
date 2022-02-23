import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSuccessComponent } from './custom-success.component';

describe('CustomSuccessComponent', () => {
  let component: CustomSuccessComponent;
  let fixture: ComponentFixture<CustomSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
