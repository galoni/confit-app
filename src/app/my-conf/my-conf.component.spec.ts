import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConfComponent } from './my-conf.component';

describe('MyConfComponent', () => {
  let component: MyConfComponent;
  let fixture: ComponentFixture<MyConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
