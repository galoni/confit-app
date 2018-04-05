import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConfComponent } from './register-conf.component';

describe('RegisterConfComponent', () => {
  let component: RegisterConfComponent;
  let fixture: ComponentFixture<RegisterConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
