import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConfTopicsComponent } from './register-conf-topics.component';

describe('RegisterConfTopicsComponent', () => {
  let component: RegisterConfTopicsComponent;
  let fixture: ComponentFixture<RegisterConfTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterConfTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConfTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
