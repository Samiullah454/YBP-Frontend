import { AppConsts } from '@shared/AppConsts';
import { UtilsService } from 'abp-ng2-module';
import { AuthenticationService } from './authentication.service';

export class SignalRAspNetCoreHelper {
    /**
   *
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _authenticationService: AuthenticationService) {}
  initSignalR(callback?: () => void): void {
        
        const currentUser = this._authenticationService.currentUserValue;

        abp.signalr = {
            autoConnect: true,
            connect: undefined,
            hubs: undefined,
            qs: AppConsts.authorization.encryptedAuthTokenName + '=' + encodeURIComponent(currentUser.encryptedAuthToken),
            remoteServiceBaseUrl: AppConsts.remoteServiceBaseUrl,
            startConnection: undefined,
            url: '/signalr',
            withUrlOptions:undefined
        };

        const script = document.createElement('script');
        if (callback) {
            script.onload = () => {
                callback();
            };
        }
        script.src = AppConsts.appBaseUrl + '/assets/abp/abp.signalr-client.js';
        document.head.appendChild(script);
    }
}
