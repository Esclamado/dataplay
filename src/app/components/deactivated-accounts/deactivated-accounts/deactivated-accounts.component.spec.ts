import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedAccountsComponent } from './deactivated-accounts.component';

describe('DeactivatedAccountsComponent', () => {
  let component: DeactivatedAccountsComponent;
  let fixture: ComponentFixture<DeactivatedAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivatedAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
