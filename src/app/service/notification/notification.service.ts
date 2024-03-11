import { Inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
  ) {}

  infoNotification(
    message: string,
    autoClose: boolean | number = true ?? 3000,
    header: string | null = null,
  ) {
    this.alerts
      .open(message, {
        label: header,
        status: 'info',
        autoClose: autoClose,
      })
      .subscribe();
  }

  successNotification(
    message: string,
    autoClose: boolean | number = true ?? 3000,
    header: string | null = null,
  ) {
    this.alerts
      .open(message, {
        label: header,
        status: 'success',
        autoClose: autoClose,
      })
      .subscribe();
  }

  errorNotification(
    message: any,
    autoClose: boolean | number = true ?? 3000,
    header: string | null = null,
  ) {
    this.alerts
      .open(message, {
        label: header,
        status: 'error',
        autoClose: autoClose,
      })
      .subscribe();
  }
}
