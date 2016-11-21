import { CountryOfOriginChecker } from '../../providers/countryOfOriginChecker';
import { PermissionService } from '../../providers/permissionService';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

declare var cordova;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, private platform: Platform, private ps: PermissionService, private originChecker: CountryOfOriginChecker) { }


    ionViewDidLoad() {

        this.originChecker.checkOrigin(369395082355678)
            .then((success) => { console.log("success", success) })

        this.platform.ready().then((readySource) => {
            console.log('Platform ready from', readySource);

            if (readySource != "dom") {

                let permissions = cordova.plugins['permissions'];
                permissions.hasPermission('android.permission.READ_PHONE_STATE',
                    (success) => {
                        if (!success.hasPermission) {
                            this.ps.getPhoneStatePermission()
                                .then((success) => {
                                    console.log("permission granted :", success);

                                    (<any>window).plugins.imei.get(
                                        (imei) => {
                                            console.log("got imei :" + imei);

                                            this.originChecker.checkOrigin(imei)
                                                .then((twoDigits) => { console.log("Two Digits", twoDigits) })

                                        },
                                        () => { console.log("error loading imei"); }
                                    );
                                })
                                .catch((error) => {
                                    console.log("error in getting permission :", error)
                                })
                        } else {
                            console.log("Permission granted already, else statement is running");
                            (<any>window).plugins.imei.get(
                                (imei) => {
                                    console.log("got imei frm else statement: " + imei);
                                },
                                () => { console.log("error loading imei"); }
                            );
                        }
                    },
                    (err) => { console.log("error", err) });
            }
        });

    }

}
