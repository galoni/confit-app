import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartDataComponent } from './pie-chart-data.component';

describe('PieChartDataComponent', () => {
  let component: PieChartDataComponent;
  let fixture: ComponentFixture<PieChartDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
