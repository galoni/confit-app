import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConfComponent } from './new-conf.component';

describe('NewConfComponent', () => {
  let component: NewConfComponent;
  let fixture: ComponentFixture<NewConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
