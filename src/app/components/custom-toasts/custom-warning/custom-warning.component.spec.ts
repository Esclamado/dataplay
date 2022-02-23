import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWarningComponent } from './custom-warning.component';

describe('CustomWarningComponent', () => {
  let component: CustomWarningComponent;
  let fixture: ComponentFixture<CustomWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
