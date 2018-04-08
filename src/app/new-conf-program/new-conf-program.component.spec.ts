import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConfProgramComponent } from './new-conf-program.component';

describe('NewConfProgramComponent', () => {
  let component: NewConfProgramComponent;
  let fixture: ComponentFixture<NewConfProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConfProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConfProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
