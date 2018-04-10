import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConfComponent } from './show-conf.component';

describe('ShowConfComponent', () => {
  let component: ShowConfComponent;
  let fixture: ComponentFixture<ShowConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
