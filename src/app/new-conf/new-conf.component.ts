import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-conf',
  templateUrl: './new-conf.component.html',
  styleUrls: ['./new-conf.component.css']
})
export class NewConfComponent implements OnInit {
  isCreated: Boolean = false;
  constructor() { }

  ngOnInit() {
    // localStorage.clear();
  }
  childStatusChanged(bool) {
    console.log('bool: ' + bool);
    this.isCreated = bool;
  }
}
