import { Component } from '@angular/core';
import { ShareModule } from '../../../shared/share.module';
import { TaigaModule } from '../../../shared/taiga.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  stories = [
    {
      id: 1,
      image: "./assets/stories1.png",
    },
    {
      id: 2,
      image: "./assets/stories2.png",
    },
    {
      id: 3,
      image: "./assets/stories3.png",
    },
    {
      id: 4,
      image: "./assets/stories4.png",
    },
    {
      id: 5,
      image: "./assets/stories5.png",
    },
  ];
  posts = [
    {
      id: 1,
      image: "./assets/picture1.png",
      tag: "#vegan #healthy",
      description: "The Best Vegan Chocolate Cake- A quick and easy recipe! It's super moist, rich and full of chocolate",
      isLiked: false,
    },
    {
      id: 2,
      image: "./assets/picture2.png",
      tag: "#sweet #healthy",
      description: "Breakfast ideas",
      isLiked: false,
    },
    {
      id: 3,
      image: "./assets/picture2.png",
      tag: "#sweet #healthy",
      description: "Breakfast ideas",
      isLiked: false,
    },
    {
      id: 4,
      image: "./assets/picture1.png",
      tag: "#vegan #healthy",
      description: "The Best Vegan Chocolate Cake- A quick and easy recipe! It's super moist, rich and full of chocolate",
      isLiked: false,
    },
    {
      id: 5,
      image: "./assets/picture1.png",
      tag: "#vegan #healthy",
      description: "The Best Vegan Chocolate Cake- A quick and easy recipe! It's super moist, rich and full of chocolate",
      isLiked: false,
    },
    {
      id: 6,
      image: "./assets/picture2.png",
      tag: "#sweet #healthy",
      description: "Breakfast ideas",
      isLiked: false,
    },
  ]
  like(id: number) {
    this.posts = this.posts.map((item) => {
      if (item.id === id) {
        item.isLiked = !item.isLiked;
      }
      return item;
    });
  }
}

