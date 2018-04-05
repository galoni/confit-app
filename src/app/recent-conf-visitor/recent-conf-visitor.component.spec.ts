import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentConfVisitorComponent } from './recent-conf-visitor.component';

describe('RecentConfVisitorComponent', () => {
  let component: RecentConfVisitorComponent;
  let fixture: ComponentFixture<RecentConfVisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentConfVisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentConfVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
