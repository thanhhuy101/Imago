import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToString',
  standalone: true
})
export class DateToStringPipe implements PipeTransform {

  transform(date: Date): string {
    return 'on ' + date.getDate() + ' ' + date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
  }

}
