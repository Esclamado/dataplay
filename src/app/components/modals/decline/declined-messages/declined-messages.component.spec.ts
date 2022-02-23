import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedMessagesComponent } from './declined-messages.component';

describe('DeclinedMessagesComponent', () => {
  let component: DeclinedMessagesComponent;
  let fixture: ComponentFixture<DeclinedMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclinedMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinedMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
