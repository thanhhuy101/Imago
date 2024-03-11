import { HttpClientAuth } from '../../util/http-client-auth';
import { Injectable } from '@angular/core';
import { StorageModel } from '../../model/storage.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private http: HttpClientAuth) { }

  uploadFile(file: File, fileName: string) {
    const formData = new FormData();
    //formData ''
    formData.delete('files');
    formData.append('files', file);
    formData.append('fileName', fileName);
    console.log('fileName', file);

    return this.http.post(`storage/upload`, formData);
  }
}
