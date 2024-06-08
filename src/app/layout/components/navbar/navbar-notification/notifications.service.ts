import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  // Public
  public apiData = [];
  public onApiDataChange: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onApiDataChange = new BehaviorSubject('');
    this.getNotificationsData();
  }

  getNotificationsData(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    this._httpClient.get(environment.apiLiveUrl+'/services/app/Notifcations/GetAllNotifications').subscribe((response: any) => {
      this.apiData = response.result;
      this.onApiDataChange.next(this.apiData);
      resolve(this.apiData);
    }, reject);
  });
  }

  update(notificationDto:NotificationDto)
  { 
    return this._httpClient
      .put<any>(`${environment.apiLiveUrl}/services/app/Notifcations/Update`,notificationDto)
      .pipe(
        map(response => {         
          return response.result;  
        })
      );
  }
  
  notificationDto;
  
  updateAll(id)
  {
    this.notificationDto = new NotificationDto();
    this.notificationDto.toUser = id;
    return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/Notifcations/MarkAllAsRead`, this.notificationDto)
      .pipe(
        map(response => {  
          return response.result;  
        })
      );
  }
}

export class NotificationDto implements INotificationDto {
  id:number;
  title:string;
  detail:string;
  isRead:boolean
  fromUser:number
  toUser:number

  constructor(data?: INotificationDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.id = _data["id"];
          this.title = _data["title"];
          this.detail = _data["detail"];
          this.isRead = _data["isRead"];
          this.fromUser = _data["fromUser"];
          this.toUser = _data["toUser"];
      }
  }

  static fromJS(data: any): NotificationDto {
      data = typeof data === 'object' ? data : {};
      let result = new NotificationDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["title"] = this.title;
      data["detail"] = this.detail;
      data["isRead"] = this.isRead;
      data["fromUser"] = this.fromUser;
      data["toUser"] = this.toUser;
     
      return data; 
  }

  clone(): NotificationDto {
      const json = this.toJSON();
      let result = new NotificationDto();
      result.init(json);
      return result;
  }
}

export interface INotificationDto {
  id:number;
  title:string;
  detail:string;
  isRead:boolean
  fromUser:number
  toUser:number
}
