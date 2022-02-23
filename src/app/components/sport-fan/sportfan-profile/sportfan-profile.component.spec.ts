import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportfanProfileComponent } from './sportfan-profile.component';

describe('SportfanProfileComponent', () => {
  let component: SportfanProfileComponent;
  let fixture: ComponentFixture<SportfanProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportfanProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportfanProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
