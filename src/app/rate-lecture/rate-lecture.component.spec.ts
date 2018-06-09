import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateLectureComponent } from './rate-lecture.component';

describe('RateLectureComponent', () => {
  let component: RateLectureComponent;
  let fixture: ComponentFixture<RateLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
