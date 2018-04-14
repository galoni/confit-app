import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQrCodeDetailsComponent } from './manage-qr-code-details.component';

describe('ManageQrCodeDetailsComponent', () => {
  let component: ManageQrCodeDetailsComponent;
  let fixture: ComponentFixture<ManageQrCodeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageQrCodeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQrCodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
