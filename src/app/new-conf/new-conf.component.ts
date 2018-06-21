import { Component, OnInit } from '@angular/core';
import { Response, Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';

@Component({
  selector: 'app-new-conf',
  templateUrl: './new-conf.component.html',
  styleUrls: ['./new-conf.component.css']
})
export class NewConfComponent implements OnInit {
  isCreated: Boolean = false;
  filesToUpload: Array<File> = [];
  public files: UploadFile[] = [];

  constructor(private http: Http) { }

  ngOnInit() {
    // localStorage.clear();
  }
  childStatusChanged(bool) {
    console.log('bool: ' + bool);
    this.isCreated = bool;
  }
  upload() {
    let confId = localStorage.getItem('confId');
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);
        formData.append("data", files[0], files[0]['name']);
        formData.append('type', 'logo');
        formData.append('id', confId);
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
    // this.product.photo = fileInput.target.files[0]['name'];
  }
  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          let confId = localStorage.getItem('confId');
          const formData: any = new FormData();
          const files: File = file;
          console.log(files);
          formData.append("data", files, files['name']);
          formData.append('type', 'logo');
          formData.append('id', confId);
          console.log('form data variable :   ' + formData.toString());
          this.http.post('https://confit-backend.herokuapp.com/qrcodeApi/upload_image', formData)
            .map(files => files.json())
            .subscribe(files => {
              console.log('files', files);
            });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
