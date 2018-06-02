export class Visitor {
  public _id: string;
  public confs: any[] = [];
  public name: any = {};
  public custome_path: any[] = [];
  public qr_code: string;
  public profilePic: string;
  constructor(
    public linkedin: string, public education: string,
    public occupation: string, qr_code: string) { }
}
