import { Injectable } from '@angular/core';
declare var cordova;

@Injectable()
export class PermissionService {

    getPhoneStatePermission() {
        let permissions = cordova.plugins['permissions'];
        return new Promise((res, rej) => {
            permissions.requestPermission('android.permission.READ_PHONE_STATE',
                (success) => {
                    success.hasPermission ? res(success) : rej("Permission denied by user");
                },
                (error) => {
                    rej(error);
                })
        });
    }

}