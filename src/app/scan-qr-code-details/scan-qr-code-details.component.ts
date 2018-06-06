import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-scan-qr-code-details',
  templateUrl: './scan-qr-code-details.component.html',
  styleUrls: ['./scan-qr-code-details.component.css']
})

export class ScanQRCodeDetailsComponent implements OnInit {
  data: any = {};
  devices: any = {};

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;
  constructor(
    private router: Router, private r: ActivatedRoute) { }
  ngOnInit() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      this.devices = JSON.stringify(videoDevices);
      if (videoDevices.length > 0) {
        let choosenDev;
        console.log(videoDevices);
        for (const dev of videoDevices) {
          if (dev.label.includes('back')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);
      this.data = JSON.parse(result);
      console.log(this.data);
      if (this.data.data && this.data.id && this.data.type) {
        console.log("good Input");
        localStorage.setItem('QRCode', JSON.stringify(this.data));
        this.router.navigate(["../../MyConference"], { relativeTo: this.r, queryParams: { data: this.data.data, type: this.data.type, id: this.data.id } });
      }




    });
  }
}
