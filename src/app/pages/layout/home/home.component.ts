import {Component, Inject} from '@angular/core';
import { ShareModule } from '../../../shared/share.module';
import { TaigaModule } from '../../../shared/taiga.module';
import {TuiDialogContext, TuiDialogService, TuiSizeL, TuiSizeS} from "@taiga-ui/core";
import {TuiDataListDropdownManagerModule} from "@taiga-ui/kit";
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShareModule, TaigaModule, TuiDataListDropdownManagerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  stories = [
    {
      id: 1,
      image: "../../../../assets/images/stories1.png",
    },
    {
      id: 2,
      image: "../../../../assets/images/stories2.png",
    },
    {
      id: 3,
      image: "../../../../assets/images/stories3.png",
    },
    {
      id: 4,
      image: "../../../../assets/images/stories4.png",
    },
    {
      id: 5,
      image: "../../../../assets/images/stories5.png",
    },
  ];
  posts = [
    {
      id: 1,
      image: "https://i.pinimg.com/564x/3d/48/23/3d482354c73e7fe539b356172cdc5ae8.jpg",
      tag: "#vegan #healthy",
      description: "The Best Vegan Chocolate Cake- A quick and easy recipe! It's super moist, rich and full of chocolate",
      isLiked: false,
    },
    {
      id: 2,
      image: "../../../../assets/images/picture2.png",
      tag: "#sweet #healthy",
      description: "Breakfast ideas",
      isLiked: false,
    },
    {
      id: 3,
      image: "../../../../assets/images/picture1.png",
      tag: "#vegan #healthy",
      description: "The Best Vegan Chocolate Cake- A quick and easy recipe! It's super moist, rich and full of chocolate",
      isLiked: false,
    },
    {
      id: 4,
      image: "https://i.pinimg.com/564x/35/9a/91/359a91ef6cc4b2d7b90c5a750daf1928.jpg",
      tag: "#sweet #healthy",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      isLiked: false,
    },
    {
      id: 5,
      image: "https://i.pinimg.com/564x/3e/92/1b/3e921b71612e25d82783d500494f3949.jpg",
      tag: "#vegan #healthy",
      description: "The Best Vegan Chocolate Cake- A quick and easy recipe! It's super moist, rich and full of chocolate",
      isLiked: false,
    },
    {
      id: 6,
      image: "../../../../assets/images/picture2.png",
      tag: "#sweet #healthy",
      description: "Breakfast ideas",
      isLiked: false,
    },
    {
      id: 7,
      image: "../../../../assets/images/picture1.png",
      tag: "#vegan #healthy",
      description: "The Best Vegan Chocolate Cake- A quick and easy recipe! It's super moist, rich and full of chocolate",
      isLiked: false,
    },
    {
      id: 8,
      image: "../../../../assets/images/picture2.png",
      tag: "#sweet #healthy",
      description: "Breakfast ideas",
      isLiked: false,
    },
    {
      id: 9,
      image: "https://i.pinimg.com/564x/a2/c3/e7/a2c3e74b7a6ea6b96fb06cb97d46f1a5.jpg",
      tag: "#vegan #healthy",
      description: "The Best Vegan Chocolate Cake- A quick and easy recipe! It's super moist, rich and full of chocolate",
      isLiked: false,
    },
    {
      id: 10,
      image: "../../../../assets/images/picture2.png",
      tag: "#sweet #healthy",
      description: "Breakfast ideas aaaa aaaa aaaaa aaaa aaaa  aaaa  aaaa  aaaa",
      isLiked: false,
    },
    {
      id: 11,
      image: "../../../../assets/images/picture1.png",
      tag: "#vegan #healthy",
      description: "The Best Vegan Chocolate Cake- A quick and easy recipe! It's super moist, rich and full of chocolate",
      isLiked: false,
    },
    {
      id: 12,
      image: "../../../../assets/images/picture2.png",
      tag: "#sweet #healthy",
      description: "Breakfast ideas aaaaa aaaaa aaaaaaaa aaaaaaa aaaaaaaaa aaaaa",
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
  dropdownOpen = true;
  constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService) {}

  selectOption(item: string): void {
    this.dropdownOpen = false;
    this.dialogs.open(`You selected ${item}`).subscribe();
  }
  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content,).subscribe();
  }
  testForm = new FormGroup({
    testValue0: new FormControl(false),
    testValue1: new FormControl(false),
    testValue2: new FormControl(false),
    testValue3: new FormControl(false),
    testValue4: new FormControl(false),
    testValue5: new FormControl(false),
    testValue6: new FormControl(false),
    testValue7: new FormControl(false),
  });

  listReports = ["Hate speech", "Harassment", "Spam", "Fake news", "False information", "Violence", "Terrorism", "Nude"]

  listChooses: string[] = []
  checkBox(name: string, index: any) {
      // this.listChooses.push(name)
    console.log(name, index)

  }

  submit(form: any) {
    this.testForm.patchValue({
      testValue0: false,
      testValue1: false,
      testValue2: false,
      testValue3: false,
      testValue4: false,
      testValue5: false,
      testValue6: false,
      testValue7: false,
    })
  }

  testForm2 = new FormGroup({
    testValue1: new FormControl('', Validators.required),
  });

}

