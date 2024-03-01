import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ShareModule } from '../../share.module';
import { TaigaModule } from '../../taiga.module';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [NgForOf, ShareModule, TaigaModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input('imageList') imageList = [''];
  @Input('statusValue') statusValue: string = '';
  @Input('index') index: number = 0;
  @Output() responseChangeEvent: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  name: string = 'Lulu';

  itemsCount = 1;

  constructor() {}

  get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }
}
