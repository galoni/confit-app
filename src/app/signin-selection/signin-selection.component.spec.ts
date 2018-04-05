import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninSelectionComponent } from './signin-selection.component';

describe('SigninSelectionComponent', () => {
  let component: SigninSelectionComponent;
  let fixture: ComponentFixture<SigninSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
