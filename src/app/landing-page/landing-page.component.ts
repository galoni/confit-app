import {Component, ElementRef, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { LandingService } from '../services/landing.service';
import { Conf } from '../models/conf';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  selectedConf: Conf;
  subscription: Subscription;

  constructor(private LandingService: LandingService,private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.LandingService.selectedConf$
      .subscribe(conf => this.selectedConf = conf);
      console.log(this.selectedConf );
  }

}
