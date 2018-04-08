import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanQRCodeDetailsComponent } from './scan-qr-code-details.component';

describe('ScanQRCodeDetailsComponent', () => {
  let component: ScanQRCodeDetailsComponent;
  let fixture: ComponentFixture<ScanQRCodeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanQRCodeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanQRCodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
