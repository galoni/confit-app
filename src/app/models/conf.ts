import { ConfSession} from "./confSession";

export class Conf {
  public _id: string;
  public program: ConfSession[];
  constructor(public name: string, public type: string,
              public logo: string, public start_date: string,
              public end_date: string, public location: string, public audience: string) {
  }
}
