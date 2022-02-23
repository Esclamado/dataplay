import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailwindUtilitiesComponent } from './tailwind-utilities.component';

describe('TailwindUtilitiesComponent', () => {
  let component: TailwindUtilitiesComponent;
  let fixture: ComponentFixture<TailwindUtilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TailwindUtilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailwindUtilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
