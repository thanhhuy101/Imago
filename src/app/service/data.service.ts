import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    data: string = '';

    updateData(value: string) {
        this.data = value;
    }
}