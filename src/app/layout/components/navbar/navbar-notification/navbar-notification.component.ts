import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { NotificationsService } from 'app/layout/components/navbar/navbar-notification/notifications.service';
import { User } from 'app/auth/models';


interface notification {
  messages: [];
  systemMessages: [];
  system: Boolean;
}

@Component({
  selector: 'app-navbar-notification',
  templateUrl: './navbar-notification.component.html'
})


export class NavbarNotificationComponent implements OnInit {

  public notifications:any[]= [];
  public rows;

  constructor(
    private _notificationsService: NotificationsService,
    private _toastrService: ToastrService,) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this._notificationsService.onApiDataChange.subscribe(res => {
      const dataArray = Array.isArray(res) ? res : [res];
      const filteredData = dataArray.filter(item => !item.isRead && item.toUser === this.currentUserSubject.userId);
      this.notifications = filteredData.sort((a, b) => b.id - a.id);
    });
  }

  markAsRead(message){
    message.isRead = "True";
    this._notificationsService.update(message).pipe()
    .subscribe(
        data => {  
          this._notificationsService.onApiDataChange.subscribe(res => {
            const dataArray = Array.isArray(res) ? res : [res];
            const filteredData = dataArray.filter(item => !item.isRead && item.toUser === this.currentUserSubject.userId);
            this.notifications = filteredData.sort((a, b) => b.id - a.id);
          });
          },
      error => {        
        this._toastrService.error(error.message, 'User Deleting Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });        
      });
  }

  markAllAsRead(){
    this._notificationsService.updateAll(this.currentUserSubject.userId).pipe()
    .subscribe(res => {       
      const dataArray = Array.isArray(res) ? res : [res];
      const filteredData = dataArray.filter(item => !item.isRead && item.toUser === this.currentUserSubject.userId);
      this.notifications = filteredData.sort((a, b) => b.id - a.id);
          },
      error => {        
        this._toastrService.error(error.message, 'User Deleting Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });        
      });
  }

  public currentUserSubject: User;
  getCurrentUser(){
    this.currentUserSubject = JSON.parse(localStorage.getItem('currentUser'));
  }

}
