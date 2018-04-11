export class Lecture {
  public _id: string;

  constructor(public name: string, public lecturer_name: string,
              public description: string, public ratings: number,
              public topic: string){}
}
