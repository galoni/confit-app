import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingPageComponent } from './matching-page.component';

describe('MatchingPageComponent', () => {
  let component: MatchingPageComponent;
  let fixture: ComponentFixture<MatchingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
