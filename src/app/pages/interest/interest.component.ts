import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShareModule } from '../../shared/modules/share.module';
import { TaigaModule } from '../../shared/modules/taiga.module';

@Component({
  selector: 'app-interest',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterestComponent {
  // items1 = [
  //   { icon: 'palette', title: 'ART' },
  //   { icon: 'full_coverage', title: 'BLOGGING' },
  //   { icon: 'work', title: 'CAREES' },
  //   { icon: 'construction', title: 'DIY' },
  //   { icon: 'school', title: 'EDUCATION' },
  //   { icon: 'public', title: 'ENVIRONMENT' },
  //   { icon: 'styler', title: 'FASHION' },
  //   { icon: 'fitness_center', title: 'FITNESS' },
  //   { icon: 'restaurant_menu', title: 'FOOD' },
  //   { icon: 'headphones', title: 'MUSIC' },
  // ];
  // items2 = [
  //   { icon: 'travel_explore', title: 'ADVENTURE' },
  //   { icon: 'experiment', title: 'SCIENCE' },
  //   { icon: 'devices', title: 'TECHNOLOGY' },
  //   { icon: 'movie', title: 'MOVIES' },
  //   { icon: 'spa', title: 'NATURE' },
  //   { icon: 'flight_takeoff', title: 'TRAVEL' },
  //   { icon: 'center_focus_strong', title: 'PHOTOGRAPH' },
  //   { icon: 'cooking', title: 'COOKING' },
  //   { icon: 'menu_book', title: 'LITERATURE' },
  //   { icon: 'groups', title: 'SOCIAL' },
  // ];
  // items3 = [
  //   { icon: 'stadia_controller', title: 'GAMING' },
  //   { icon: 'directions_bike', title: 'BIKES' },
  //   { icon: 'sports_gymnastics', title: 'SPORTS' },
  //   { icon: 'ssid_chart', title: 'STARTUPS' },
  //   { icon: 'self_improvement', title: 'MEDITATION' },
  //   { icon: 'physical_therapy', title: 'YOGA' },
  //   { icon: 'outdoor_garden', title: 'GARDENING' },
  //   { icon: 'edit_document', title: 'WRITING' },
  //   { icon: 'location_city', title: 'ARCHITECTURE' },
  //   { icon: 'history_edu', title: 'HISTORY' },
  // ];
  // items4 = [
  //   { icon: 'frame_inspect', title: 'ASTRONOMY' },
  //   { icon: 'deployed_code', title: 'CODING' },
  //   { icon: 'recycling', title: 'SUSTAINABILITY' },
  //   { icon: 'emoji_people', title: 'MOTIVATION' },
  //   { icon: 'directions_run', title: 'WALKING' },
  //   { icon: 'psychology_alt', title: 'PHILOSOPHY' },
  //   { icon: 'ar_stickers', title: 'PSYCHOLOGY' },
  //   { icon: 'shopping_cart', title: 'SHOPPING' },
  //   { icon: 'pets', title: 'WILDLIFE' },
  //   { icon: 'sports_motorsports', title: 'MOTORS' },
  // ];
  // items5 = [
  //   { icon: 'library_add', title: 'COLLECTING' },
  //   { icon: 'sound_detection_dog_barking', title: 'DOGS' },
  //   { icon: 'thread_unread', title: 'CRAFTING' },
  //   { icon: 'design_services', title: 'DESIGN' },
  //   { icon: 'hiking', title: 'HIKING' },
  //   { icon: 'volunteer_activism', title: 'VOLUNTEERING' },
  //   { icon: 'pet_supplies', title: 'PETS' },
  //   { icon: 'heart_plus', title: 'HEALTH' },
  //   { icon: 'g_translate', title: 'LANGUAGES' },
  //   { icon: 'published_with_changes', title: 'INNOVATION' },
  // ];
  // maxSelection = 5;
  // selectedItems: number[] = [];
  //
  // toggleSelectItem(index: number) {
  //   const currentIndex = this.selectedItems.indexOf(index);
  //
  //   if (currentIndex === -1 && this.selectedItems.length < this.maxSelection) {
  //     this.selectedItems.push(index);
  //   } else if (currentIndex !== -1) {
  //     this.selectedItems.splice(currentIndex, 1);
  //   }
  // }
  //
  // isSelected(index: number): boolean {
  //   return this.selectedItems.includes(index);
  // }
  //
  // selectedItemsList1: number[] = [];
  // selectedItemsList2: number[] = [];
  // selectedItemsList3: number[] = [];
  // selectedItemsList4: number[] = [];
  // selectedItemsList5: number[] = [];

  // toggleSelectItem(listIndex: number, itemIndex: number) {
  //   let selectedItemsList = this.getSelectedItemsList(listIndex);
  //   const currentIndex = selectedItemsList.indexOf(itemIndex);
  //
  //   if (currentIndex === -1 && selectedItemsList.length < this.maxSelection) {
  //     selectedItemsList.push(itemIndex);
  //   } else if (currentIndex !== -1) {
  //     selectedItemsList.splice(currentIndex, 1);
  //   }
  // }
  //
  // isSelected(listIndex: number, itemIndex: number): boolean {
  //   return this.getSelectedItemsList(listIndex).includes(itemIndex);
  // }

  // Hàm trả về mảng selectedItems tương ứng với danh sách
  interest: any[][] = [
    // Populate your interest array with data as needed
    [
      {
        title: 'ART',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl9WKVexUhwo7yGVbpX6QmKhhBnv4zChAGLt5qa7j2jcoYhi_chR1x8hniyf-lBvS4Bm4&usqp=CAU',
        backgroundColor: true,
      },
      {
        title: 'BLOGGING',
        image:
          'data:image/jpeg;base64,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',
        backgroundColor: true,
      },
      {
        title: 'CAREES',
        image:
          'https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'DIY',
        image:
          'data:image/jpeg;base64,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',
        backgroundColor: true,
      },
      {
        title: 'EDUCATION',
        image:
          'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'ENVIRONMENT',
        image:
          'https://images.pexels.com/photos/1131458/pexels-photo-1131458.jpeg?auto=compress&cs=tinysrgb&w=600 ',
        backgroundColor: true,
      },
      {
        title: 'FASHION',
        image:
          'https://images.pexels.com/photos/768975/pexels-photo-768975.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'FITNESS',
        image:
          'https://images.pexels.com/photos/1300526/pexels-photo-1300526.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'FOOD',
        image:
          'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'MUSIC',
        image:
          'https://images.pexels.com/photos/159376/turntable-top-view-audio-equipment-159376.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
    ],
    [
      {
        title: 'ADVENTURE',
        image:
          'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'SCIENCE',
        image:
          'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'TECHNOLOGY',
        image:
          'https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'MOVIES',
        image:
          'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'NATURE',
        image:
          'https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'TRAVEL',
        image:
          'https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'PHOTOGRAPH',
        image:
          'https://images.pexels.com/photos/1252983/pexels-photo-1252983.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'COOKING',
        image:
          'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'LITERATURE',
        image:
          'https://images.pexels.com/photos/1340588/pexels-photo-1340588.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'SOCIAL',
        image:
          'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
    ],
    [
      {
        title: 'gaming',
        image:
          'https://images.pexels.com/photos/3945673/pexels-photo-3945673.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'bikes',
        image:
          'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'SPORTS',
        image:
          'https://images.pexels.com/photos/1080882/pexels-photo-1080882.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'STARTUPS',
        image:
          'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'YOGA',
        image:
          'https://images.pexels.com/photos/917732/pexels-photo-917732.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'MEDITATION',
        image:
          'https://images.pexels.com/photos/668353/pexels-photo-668353.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'GARDENING',
        image:
          'https://images.pexels.com/photos/1118154/pexels-photo-1118154.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'WRITING',
        image:
          'https://images.pexels.com/photos/316466/pexels-photo-316466.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'ARCHITECTURE',
        image:
          'https://images.pexels.com/photos/911758/pexels-photo-911758.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'HISTORY',
        image:
          'https://images.pexels.com/photos/951531/pexels-photo-951531.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
    ],
    [
      {
        title: 'ASTRONOMY',
        image:
          'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'CODING',
        image:
          'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'MOTIVATION',
        image:
          'https://images.pexels.com/photos/843266/pexels-photo-843266.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'SUSTAINABILITY',
        image:
          'https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'WALKING',
        image:
          'https://images.pexels.com/photos/670786/pexels-photo-670786.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'PHILOSOPHY',
        image:
          'https://images.pexels.com/photos/7958034/pexels-photo-7958034.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'PSYCHOLOGY',
        image:
          'https://images.pexels.com/photos/9064797/pexels-photo-9064797.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'SHOPPING',
        image:
          'https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'WILDLIFE',
        image:
          'https://images.pexels.com/photos/64219/dolphin-marine-mammals-water-sea-64219.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'MOTORS',
        image:
          'https://images.pexels.com/photos/716421/pexels-photo-716421.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
    ],
    [
      {
        title: 'COLLECTING',
        image:
          'https://images.pexels.com/photos/10481259/pexels-photo-10481259.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'DOGS',
        image:
          'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'CRAFTING',
        image:
          'https://images.pexels.com/photos/1117542/pexels-photo-1117542.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'DESIGN',
        image:
          'https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'HIKING',
        image:
          'https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'VOLUNTEERING',
        image:
          'https://images.pexels.com/photos/9034669/pexels-photo-9034669.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'PETS',
        image:
          'https://images.pexels.com/photos/2334005/pexels-photo-2334005.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'HEALTH',
        image:
          'https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'LANGUAGES',
        image:
          'https://images.pexels.com/photos/8466907/pexels-photo-8466907.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
      {
        title: 'INNOVATION',
        image:
          'https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg?auto=compress&cs=tinysrgb&w=600',
        backgroundColor: true,
      },
    ],
  ];

  changebackground(item: any): void {
    // Implement your logic to handle background change here
    item.backgroundColor = !item.backgroundColor;
    console.log('changebackground', item);
  }
}
