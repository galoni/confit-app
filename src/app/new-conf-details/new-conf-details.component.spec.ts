import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConfDetailsComponent } from './new-conf-details.component';

describe('NewConfDetailsComponent', () => {
  let component: NewConfDetailsComponent;
  let fixture: ComponentFixture<NewConfDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConfDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConfDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
