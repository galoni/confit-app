import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConfLecturesComponent } from './register-conf-lectures.component';

describe('RegisterConfLecturesComponent', () => {
  let component: RegisterConfLecturesComponent;
  let fixture: ComponentFixture<RegisterConfLecturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterConfLecturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConfLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
