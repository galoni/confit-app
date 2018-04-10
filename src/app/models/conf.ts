import { ConfSession} from "./confSession";
import { Lecture } from "./lecture"

export class Conf {
  public _id: string;
  public program: ConfSession[];
  public visitors: string[];
  public topics: string[];
  constructor(public name: string, public type: string,
              public logo: string, public start_date: string, public lectures: Lecture[],
              public duration: number, public location: string, public audience: string) {
    this.lectures = [];
  }
}
