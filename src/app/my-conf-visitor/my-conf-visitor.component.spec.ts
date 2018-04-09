import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConfVisitorComponent } from './my-conf-visitor.component';

describe('MyConfVisitorComponent', () => {
  let component: MyConfVisitorComponent;
  let fixture: ComponentFixture<MyConfVisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConfVisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConfVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
