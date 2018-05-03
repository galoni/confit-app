import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConfMatchingComponent } from './register-conf-matching.component';

describe('RegisterConfMatchingComponent', () => {
  let component: RegisterConfMatchingComponent;
  let fixture: ComponentFixture<RegisterConfMatchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterConfMatchingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConfMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
