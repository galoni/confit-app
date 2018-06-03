import { Component, OnInit } from '@angular/core';
import { Response, Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';

@Component({
  selector: 'app-new-conf',
  templateUrl: './new-conf.component.html',
  styleUrls: ['./new-conf.component.css']
})
export class NewConfComponent implements OnInit {
  isCreated: Boolean = false;
  filesToUpload: Array<File> = [];

  constructor(private http: Http) { }

  ngOnInit() {
    // localStorage.clear();
  }
  childStatusChanged(bool) {
    console.log('bool: ' + bool);
    this.isCreated = bool;
  }
  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);
        formData.append("data", files[0], files[0]['name']);
        formData.append('type', 'logo');
        formData.append('id', "5aeb7d196226470004135c4c");
    console.log('form data variable :   '+ formData.toString());
    this.http.post('https://confit-backend.herokuapp.com/qrcodeApi/upload_image', formData)
        .map(files => files.json())
        .subscribe(files => {
          console.log('files', files);
          // this.visitor.profilePic = files.status;
          // console.log('visitor', this.visitor.profilePic);
          // localStorage.setItem('currentUser', JSON.stringify(this.visitor));
      });
}

fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
}
}
