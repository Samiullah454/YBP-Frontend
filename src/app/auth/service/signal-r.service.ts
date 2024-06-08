// signalr.service.ts
import { Injectable, Injector } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { environment } from 'environments/environment';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from 'app/layout/components/navbar/navbar-notification/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;
  private messageSubject = new Subject<{ user: string; message: string }>();
  
  constructor(
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService,
    private _notificationService:NotificationsService)
  {    
    const currentUser = this._authenticationService.currentUserValue;
    const currentHost = window.location.host;
    const parts=currentHost.split('.');
    const tenant=parts.length>1?parts[0].trim():"";
    var finaltenant=tenant=="www" || tenant=="chatroster"?"":tenant;
    if(currentUser!=undefined)
    {
      if(finaltenant=="")
        finaltenant="superadmin";
      var userId=currentUser.userId;
      this.hubConnection = new HubConnectionBuilder()
              .withUrl(environment.hubUrl+'/mychathub?userId='+finaltenant+'-'+userId) // URL to your hub
              .build();
    }  
  }

  public startConnection() 
  {
    if(this.hubConnection==undefined)
    {
      const currentUser = this._authenticationService.currentUserValue;
      const currentHost = window.location.host;
      const parts=currentHost.split('.');
      const tenant=parts.length>1?parts[0].trim():"";
      var finaltenant=tenant=="www" || tenant=="chatroster"?"":tenant;
      if(currentUser!=undefined)
      {
        if(finaltenant=="")
            finaltenant="superadmin";
        var userId=currentUser.userId;
        this.hubConnection = new HubConnectionBuilder()
                .withUrl(environment.hubUrl+'/mychathub?userId='+finaltenant+'-'+userId) // URL to your hub
                .build();
      }
    }
    this.hubConnection
        .start()
        .then(() => {
            console.log('SignalR connection started.');
        })
        .catch((err) => {
            console.error('Error starting SignalR connection: ' + err);
        });
  }

  public addReceiveMessageListener() 
  {
    if (this.hubConnection.state ===HubConnectionState.Connected) 
        {
         console.log("SignalR is connected.");
        }    
    else 
    {
       console.log("SignalR is not connected.");
       this.startConnection();
    }
    const currentUser = this._authenticationService.currentUserValue;    
    this.hubConnection.on('ReceiveMessage', (user, message) => {
      if(currentUser.userId==user)
      {
          this._notificationService.getNotificationsData();
          this._toastrService.info(message, 'Message Received', {
          timeOut:10000,
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true,         
          });
      }    
    console.log(`logged in user :${currentUser.userId} :  ${user}: ${message}`);
    });
  }


  sendMessage(user: string, message: string) {
    this.hubConnection.invoke('SendMessage', user, message);
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }

  disconnectFromHub() {
    this.hubConnection.stop()
      .then(() => {
        console.log('Disconnected from the hub');
      })
      .catch((err) => {
        console.error('Error disconnecting from the hub:', err);
      });
  }
}
