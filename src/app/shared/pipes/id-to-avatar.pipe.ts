import { Pipe, PipeTransform } from '@angular/core';
import {ProfileService} from "../../service/profile/profile.service";
import {ProfileModel} from "../../model/profile.model";
import {map, Observable} from "rxjs";

@Pipe({
  name: 'idToAvatar',
  standalone: true
})
export class IdToAvatarPipe implements PipeTransform {

  constructor(private profileService: ProfileService) {
  }

  transform(id: string): Observable<string> {
    return this.profileService.getById(id).pipe(
      map((profile: ProfileModel) => {
        return profile.photoUrl;
      }),
    );
  }

}
