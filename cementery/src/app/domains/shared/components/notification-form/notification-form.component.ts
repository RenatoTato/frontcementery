import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '@externo/services/notification.service';

@Component({
  selector: 'app-notification-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './notification-form.component.html',
  styleUrl: './notification-form.component.css'
})
export class NotificationFormComponent {
  notification = {
    name: '',
    contact_number: '',
    email: '',
    area: '',
    message: ''
  };

  constructor(private notificationService: NotificationService) {}

  onSubmit(): void {
    this.notificationService.sendNotification(this.notification).subscribe(
      (response) => {
        console.log('Notificación enviada:', response);
        alert('Tu notificación ha sido enviada con éxito.');
        this.resetForm();
      },
      (error) => {
        console.error('Error al enviar notificación:', error);
        alert('Hubo un problema al enviar tu notificación. Inténtalo de nuevo.');
      }
    );
  }

  resetForm(): void {
    this.notification = {
      name: '',
      contact_number: '',
      email: '',
      area: '',
      message: ''
    };
  }
}