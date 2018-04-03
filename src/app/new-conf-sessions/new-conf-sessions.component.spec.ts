import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConfSessionsComponent } from './new-conf-sessions.component';

describe('NewConfSessionsComponent', () => {
  let component: NewConfSessionsComponent;
  let fixture: ComponentFixture<NewConfSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConfSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConfSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
