import { ConfSession} from "./confSession";

export class Conf {
  public _id: string;
  public program: ConfSession[];
  public visitors: string[];
  public topics: string[];
  constructor(public name: string, public type: string,
              public logo: string, public start_date: string,
              public duration: number, public location: string, public audience: string) {
  }
}
