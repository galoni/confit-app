import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQrCodeComponent } from './manage-qr-code.component';

describe('ManageQrCodeComponent', () => {
  let component: ManageQrCodeComponent;
  let fixture: ComponentFixture<ManageQrCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageQrCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
