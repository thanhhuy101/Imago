import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { DataService } from '../../../service/data.service';


@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [TaigaModule, ReactiveFormsModule, NgOptimizedImage, FormsModule],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatorComponent {
  value = '';
  imgSrc = '';
  img = new FormControl('');
  onImagePicked(img: string) {
    this.imgSrc = img;
    console.log('img', img);
    console.log(this.imgSrc);
  }

  formData: FormData = new FormData();
  file: any;
  selectedImage: string | ArrayBuffer | null = null;
  inputControl = new FormControl('');
  highlightedWords: string[] = [];

  constructor(private dataService: DataService) {
    //   this.inputControl.valueChanges.subscribe(value => {
    //     if (value !== null) {
    //       this.dataService.updateData(value);
    //     }
    //   });
    this.inputControl.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.highlightedWords = this.highlightWords(value);
      }
    });
  }


  // @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   console.log(file);
  //   this.formData.append('image', file, file.name);
  //   this.file = file;

  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.selectedImage = reader.result;
  //   };
  //   console.log(this.file);
  //   console.log(this.selectedImage);
  // }

  highlightWords(value: string): string[] {
    const words = value.split(/\s+/);
    return words.filter(word => word.trim() !== ' ');
  }
  trackByIndex(index: number, word: string) {
    return index;
  }
}

