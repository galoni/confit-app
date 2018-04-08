import {Lecture} from "./lecture"
export class ConfSession {
  public _id: string;

  constructor(public name: string, public session_type: string,
              public duration: number, public dayNum: number,
              public time: number, public lectures: Lecture[]){
    this.lectures = [];
  }
}
