import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { FormControl } from '@angular/forms';
import { maxFilesLength } from '../../creator.component';
import { TuiFileLike } from '@taiga-ui/kit';

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

  readonly control = new FormControl(new Array<File>(), [maxFilesLength(5)]);
  rejectedFiles: readonly TuiFileLike[] = [];

  imageList: string[] = ['https://via.placeholder.com/650'];
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
              this.tmpImageList = [...this.tmpImageList, url];
              if (this.tmpImageList.length === response.length) {
                this.imageList = [...this.tmpImageList];
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
}
