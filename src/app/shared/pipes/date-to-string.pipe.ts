import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToString',
  standalone: true
})
export class DateToStringPipe implements PipeTransform {

  transform(date: number): string {

    // return date.getDate() + ' ' + date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
    return new Date(date).toLocaleDateString();

  }

}
