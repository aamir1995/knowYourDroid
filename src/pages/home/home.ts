import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, private platform: Platform) {
        platform.ready().then((readySource) => {
            console.log('Platform ready from', readySource);
            // Platform now ready, execute any required native code

            let permissions = cordova.plugins['permissions'];
            permissions.hasPermission('android.permission.READ_PHONE_STATE',
                (success) => {
                    if (success.hasPermission === false) {
                        permissions.requestPermission('android.permission.READ_PHONE_STATE',
                            (success) => { console.log("success", success) },
                            (err) => { console.log("error", err) });
                    }
                },
                (err) => { console.log("error", err) });


            if (readySource !== "dom") {
                (<any>window).plugins.imei.get(
                    (imei) => {
                        console.log("got imei: " + imei);
                    },
                    () => {
                        console.log("error loading imei");
                    }
                );
            }
        });

    }

}
