export class Manager {
  public _id: string;
  public confs: any[]= [];
  public name: any= {};
  constructor(
    public linkedin: string, public education: string,
    public occupation: string) {}
}
