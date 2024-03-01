import { CreatorComponent } from './creator.component';
import { Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../guard/can-deactive.guard';

export const CREATOR_ROUTERS: Routes = [
  {
    path: '',
    component: CreatorComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];
