import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConfLectureComponent } from './my-conf-lecture.component';

describe('MyConfLectureComponent', () => {
  let component: MyConfLectureComponent;
  let fixture: ComponentFixture<MyConfLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConfLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConfLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
