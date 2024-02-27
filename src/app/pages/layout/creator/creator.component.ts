import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';
import { ImagesCarouselComponent } from './components/images-carousel/images-carousel.component';
import { NotificationService } from '../../../service/notification/notification.service';
import { CanComponentDeactivate } from '../../../guard/can-deactive.guard';

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [TaigaModule, ShareModule, ImagesCarouselComponent],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.less',
  encapsulation: ViewEncapsulation.None,
})
export class CreatorComponent implements OnInit, CanComponentDeactivate {
  readonly control = new FormControl(new Array<File>(), [maxFilesLength(5)]);

  name: string = 'Lulu';
  statusValue: string = '';

  index = 0;
  itemsCount = 1;

  isContentChanged = false;

  expanded = false;

  // add default image
  imageList: string[] = ['https://via.placeholder.com/450'];

  constructor(private notificationService: NotificationService) {}

  canDeactivate(): boolean {
    // Add your logic here to determine whether navigation should be allowed.
    // For example, you might return false if the user has unsaved changes.
    if (this.isContentChanged) {
      this.notificationService.errorNotification('Your content will be lost!');
      return false;
    }

    return true;
  }

  ngOnInit(): void {}

  handleImageListChange(imageList: string[]): void {
    this.imageList = [...imageList];
    this.isContentChanged = true;
  }

  get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }

  toggle(): void {
    this.expanded = !this.expanded;
  }
}

export function maxFilesLength(maxLength: number): ValidatorFn {
  return ({ value }: AbstractControl) =>
    value.length > maxLength
      ? {
          maxLength: new TuiValidationError(
            'Error: maximum limit - 5 files for upload',
          ),
        }
      : null;
}
