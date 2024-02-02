import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ShareModule} from "../../shared/share.module";
import {TaigaModule} from "../../shared/taiga.module";

@Component({
  selector: 'app-interest',
  standalone: true,
  imports: [ShareModule,TaigaModule],
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterestComponent {
  items1 = [
    { icon: 'palette', title: 'ART' },
    { icon: 'full_coverage', title: 'BLOGGING' },
    { icon: 'work', title: 'CAREES' },
    { icon: 'construction', title: 'DIY' },
    { icon: 'school', title: 'EDUCATION' },
    { icon: 'public', title: 'ENVIRONMENT' },
    { icon: 'styler', title: 'FASHION' },
    { icon: 'fitness_center', title: 'FITNESS' },
    { icon: 'restaurant_menu', title: 'FOOD' },
    { icon: 'headphones', title: 'MUSIC' },
  ];
  items2 = [
    { icon: 'travel_explore', title: 'ADVENTURE' },
    { icon: 'experiment', title: 'SCIENCE' },
    { icon: 'devices', title: 'TECHNOLOGY' },
    { icon: 'movie', title: 'MOVIES' },
    { icon: 'spa', title: 'NATURE' },
    { icon: 'flight_takeoff', title: 'TRAVEL' },
    { icon: 'center_focus_strong', title: 'PHOTOGRAPH' },
    { icon: 'cooking', title: 'COOKING' },
    { icon: 'menu_book', title: 'LITERATURE' },
    { icon: 'groups', title: 'SOCIAL' },
  ];
  items3 = [
    { icon: 'stadia_controller', title: 'GAMING' },
    { icon: 'directions_bike', title: 'BIKES' },
    { icon: 'sports_gymnastics', title: 'SPORTS' },
    { icon: 'ssid_chart', title: 'STARTUPS' },
    { icon: 'self_improvement', title: 'MEDITATION' },
    { icon: 'physical_therapy', title: 'YOGA' },
    { icon: 'outdoor_garden', title: 'GARDENING' },
    { icon: 'edit_document', title: 'WRITING' },
    { icon: 'location_city', title: 'ARCHITECTURE' },
    { icon: 'history_edu', title: 'HISTORY' },
  ];
  items4 = [
    { icon: 'frame_inspect', title: 'ASTRONOMY' },
    { icon: 'deployed_code', title: 'CODING' },
    { icon: 'recycling', title: 'SUSTAINABILITY' },
    { icon: 'emoji_people', title: 'MOTIVATION' },
    { icon: 'directions_run', title: 'WALKING' },
    { icon: 'psychology_alt', title: 'PHILOSOPHY' },
    { icon: 'ar_stickers', title: 'PSYCHOLOGY' },
    { icon: 'shopping_cart', title: 'SHOPPING' },
    { icon: 'pets', title: 'WILDLIFE' },
    { icon: 'sports_motorsports', title: 'MOTORS' },
  ];
  items5 = [
    { icon: 'library_add', title: 'COLLECTING' },
    { icon: 'sound_detection_dog_barking', title: 'DOGS' },
    { icon: 'thread_unread', title: 'CRAFTING' },
    { icon: 'design_services', title: 'DESIGN' },
    { icon: 'hiking', title: 'HIKING' },
    { icon: 'volunteer_activism', title: 'VOLUNTEERING' },
    { icon: 'pet_supplies', title: 'PETS' },
    { icon: 'heart_plus', title: 'HEALTH' },
    { icon: 'g_translate', title: 'LANGUAGES' },
    { icon: 'published_with_changes', title: 'INNOVATION' },
  ];
  maxSelection = 5;
  selectedItems: number[] = [];

  toggleSelectItem(index: number) {
    const currentIndex = this.selectedItems.indexOf(index);

    if (currentIndex === -1 && this.selectedItems.length < this.maxSelection) {
      this.selectedItems.push(index);
    } else if (currentIndex !== -1) {
      this.selectedItems.splice(currentIndex, 1);
    }
  }

  isSelected(index: number): boolean {
    return this.selectedItems.includes(index);
  }

  selectedItemsList1: number[] = [];
  selectedItemsList2: number[] = [];
  selectedItemsList3: number[] = [];
  selectedItemsList4: number[] = [];
  selectedItemsList5: number[] = [];

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
  getSelectedItemsList(listIndex: number): number[] {
    switch (listIndex) {
      case 1:
        return this.selectedItemsList1;
      case 2:
        return this.selectedItemsList2;
      case 3:
        return this.selectedItemsList3;
      case 4:
        return this.selectedItemsList4;
      case 5:
        return this.selectedItemsList5;
      default:
        return [];
    }
  }
}
