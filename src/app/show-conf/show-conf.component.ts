import { Component, OnInit } from '@angular/core';
import { NewConfService } from "../services/newConf.service";
import { ConfSession } from "../models/confSession";
import { ActivatedRoute, Router } from "@angular/router";
import { Conf } from "../models/conf";
import { Lecture } from "../models/lecture";

@Component({
  selector: 'app-show-conf',
  templateUrl: './show-conf.component.html',
  styleUrls: ['./show-conf.component.css']
})
export class ShowConfComponent implements OnInit {
  confId: string;
  confSession: ConfSession[];
  lectures: Lecture[] = [];
  data: any = [];
  conf: Conf;

  constructor(private newConfService: NewConfService,
    private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
    this.conf = new Conf("name", "type", "logo", "date", [], 2, "loc", "aud");
    this.confId = localStorage.getItem('confId');
    if (!this.confId) {
      this.confId = "5aca81ae58bd880510606ad4";
    }
    this.confId = "5aca81ae58bd880510606ad4";
    console.log(this.confId);
    this.newConfService.getConfById(this.confId).then((conf) => {
      this.conf = conf;
      console.log(this.conf);
      for (let i = 0; i < this.conf.duration; i++) {
        this.data[i] = [];
      }
      this.confSession = this.conf.program;
      // console.log(this.conf.program);
      // console.log("data: "+ JSON.stringify(this.data));
      for (let i = 0; i < this.conf.program.length; i++) {
        this.data[this.conf.program[i].dayNum - 1].push(this.conf.program[i]);
      }
      this.newConfService.confProgram.emit(this.data);
    });
  }

}
