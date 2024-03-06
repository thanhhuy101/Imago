import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageModel } from '../../model/storage.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private httpClient: HttpClient ) {}
  uploadFile(file: File, fileName: string, idToken: string) {
    const formData = new FormData();
    formData.append('files', file);
    console.log('file', file);
    formData.append('fileName', fileName);
    console.log('fileName', fileName);
 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });
  
    return this.httpClient.post(
      `http://localhost:3000/v1/storage/upload`, formData, { headers });
  }
}

