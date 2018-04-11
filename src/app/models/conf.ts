import { ConfSession} from "./confSession";
import { Lecture } from "./lecture"

export class Conf {
  public _id: string;
  public program: ConfSession[];
  public visitors: string[];
  public lectures: Lecture[];
  constructor(public name: string, public type: string,
              public logo: string, public start_date: string, public duration: number,
              public location: string, public audience: string, public main_topics: string[]) {
    this.lectures = [];
  }
}
