import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsCardComponent } from './cms-card.component';

describe('CmsCardComponent', () => {
  let component: CmsCardComponent;
  let fixture: ComponentFixture<CmsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
