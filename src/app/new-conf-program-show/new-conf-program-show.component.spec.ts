import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConfProgramShowComponent } from './new-conf-program-show.component';

describe('NewConfProgramShowComponent', () => {
  let component: NewConfProgramShowComponent;
  let fixture: ComponentFixture<NewConfProgramShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConfProgramShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConfProgramShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
