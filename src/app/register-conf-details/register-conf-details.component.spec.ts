import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConfDetailsComponent } from './register-conf-details.component';

describe('RegisterConfDetailsComponent', () => {
  let component: RegisterConfDetailsComponent;
  let fixture: ComponentFixture<RegisterConfDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterConfDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConfDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
