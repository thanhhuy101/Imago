import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private httpClient: HttpClient) { }
  create(file: File, fileName: string, idToken: string) {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('fileName', fileName);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });
    return this.httpClient.post( `http://localhost:3000/storage/upload`,
      formData,
      { headers }
    );
    }
}
