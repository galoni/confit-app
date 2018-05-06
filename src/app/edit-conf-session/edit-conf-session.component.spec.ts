import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfSessionComponent } from './edit-conf-session.component';

describe('EditConfSessionComponent', () => {
  let component: EditConfSessionComponent;
  let fixture: ComponentFixture<EditConfSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConfSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
