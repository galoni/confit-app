import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfStatsComponent } from './conf-stats.component';

describe('ConfStatsComponent', () => {
  let component: ConfStatsComponent;
  let fixture: ComponentFixture<ConfStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
