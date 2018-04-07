import {Lecture} from "./lecture"
export class ConfSession {
  public _id: string;
  public lectures: Lecture[] = [];

  constructor(public name: string, public session_type: string,
              public duration: number, public dayNum: number,
              public time: number){
    this.lectures = [];
  }
}
