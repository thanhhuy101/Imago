import { Inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
  ) {}

  infoNotification(message: string) {
    this.alerts
      .open(message, {
        status: 'info',
        autoClose: 3000,
      })
      .subscribe();
  }

  successNotification(message: string) {
    this.alerts
      .open(message, {
        status: 'success',
        autoClose: 3000,
      })
      .subscribe();
  }

  errorNotification(message: string) {
    this.alerts
      .open(message, {
        status: 'error',
        autoClose: 3000,
      })
      .subscribe();
  }
}
