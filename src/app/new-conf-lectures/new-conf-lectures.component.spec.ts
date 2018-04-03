import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConfLecturesComponent } from './new-conf-lectures.component';

describe('NewConfLecturesComponent', () => {
  let component: NewConfLecturesComponent;
  let fixture: ComponentFixture<NewConfLecturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConfLecturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConfLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
