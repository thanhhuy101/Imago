import { Pipe, PipeTransform } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { NotiService } from '../../service/noti/noti.service';
import { NotiModel } from '../../model/noti.model';
import { ProfileService } from '../../service/profile/profile.service';
import { ProfileModel } from '../../model/profile.model';

@Pipe({
  name: 'idToName',
  standalone: true,
})
export class IdToNamePipe implements PipeTransform {
  constructor(private profileService: ProfileService) {}

  transform(id: string): Observable<string> {
    return this.profileService.getById(id).pipe(
      map((profile: ProfileModel) => {
        return profile.userName;
      }),
    );
  }
}
