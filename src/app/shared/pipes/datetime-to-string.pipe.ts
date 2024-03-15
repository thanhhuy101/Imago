import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetimeToString',
  standalone: true
})
export class DatetimeToStringPipe implements PipeTransform {

  //trasnform data datetime to string like on 15 march 2024
  transform(value: any, ...args: any[]) {
    
    let date = new Date(value);
    let month = date.toLocaleString('default', { month: 'long' });
    let day = date.getDate();
    let year = date.getFullYear();
    return `on ${day} ${month} ${year}`;
  }

}
