import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavManagerComponent } from './nav-manager.component';

describe('NavManagerComponent', () => {
  let component: NavManagerComponent;
  let fixture: ComponentFixture<NavManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
