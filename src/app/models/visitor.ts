export class Visitor {
  public _id: string;
  public confs: any[]=[];
  public name:any={};
  public custome_path:any[] = [];
  constructor(
              public linkedin: string, public education: string,
              public occupation: string,qr_code:string){}
}
