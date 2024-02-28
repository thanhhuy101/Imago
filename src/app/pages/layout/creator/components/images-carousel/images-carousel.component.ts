import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';
import { TuiValidationError } from '@taiga-ui/cdk';

@Component({
  selector: 'app-images-carousel',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './images-carousel.component.html',
  styleUrl: './images-carousel.component.scss',
})
export class ImagesCarouselComponent implements OnInit {
  @Output() responseChangeEvent: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  control = new FormControl(new Array<File>(), [maxFilesLength(5)]);
  rejectedFiles: readonly TuiFileLike[] = [];

  imageList: string[] = ['https://via.placeholder.com/450'];
  tmpImageList: string[] = [];

  index = 0;
  itemsCount = 1;

  ngOnInit(): void {
    this.control.valueChanges.subscribe((response: File[] | null) => {
      if (response) {
        response.forEach((file: File) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = () => {
            if (reader.result) {
              const blob = new Blob([reader.result], { type: 'image/png' });
              const url = URL.createObjectURL(blob);
              this.tmpImageList.push(url);
              if (this.tmpImageList.length === response.length) {
                this.imageList = this.tmpImageList;
                if (this.imageList.length > 5) {
                  // remove the image just added
                  this.imageList.splice(-1, 1);
                }
                this.responseChangeEvent.emit(this.imageList);
                this.tmpImageList = [];
              }
            }
          };
        });
      }
    });
  }

  get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }

  onReject(files: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles = [...this.rejectedFiles, ...(files as TuiFileLike[])];
  }

  deleteImage(index: number): void {
    this.imageList.splice(index, 1);
    this.responseChangeEvent.emit(this.imageList);
    if (this.imageList.length === 0) {
      this.imageList = ['https://via.placeholder.com/450'];
    }
    // get index of the last image
    if (index === this.imageList.length) {
      this.index = index;
    }
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
