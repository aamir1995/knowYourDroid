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
    countryOfOrigin: string;

    constructor(public navCtrl: NavController, private platform: Platform, private ps: PermissionService, private originChecker: CountryOfOriginChecker) { }


    ionViewDidLoad() {

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

                                    // (<any>window).plugins.imei.get(
                                    //     (imei) => {
                                    //         console.log("got imei :" + imei);
                                    //         this.originChecker.checkOrigin(imei)
                                    //             .then((countryOfOrigin) => {
                                    //                 this.countryOfOrigin = countryOfOrigin;
                                    //                 console.log("country of origin is : ", countryOfOrigin);
                                    //             });

                                    //     },
                                    //     () => { console.log("error loading imei"); }
                                    // );
                                })
                                .catch((error) => {
                                    console.log("error in getting permission :", error)
                                })
                        } else {
                            console.log("Permission granted already, else statement is running");
                            // (<any>window).plugins.imei.get(
                            //     (imei) => {
                            //         console.log("got imei frm else statement: " + imei);

                            //         this.originChecker.checkOrigin(imei)
                            //             .then((countryOfOrigin) => {
                            //                 this.countryOfOrigin = countryOfOrigin;
                            //                 console.log("country of origin is : ", countryOfOrigin);
                            //             });
                            //     },
                            //     () => { console.log("error loading imei"); }
                            // );
                        }
                    },
                    (err) => { console.log("error", err) });
            }
        });

    }

    checkOrigin(): void {
        event.preventDefault();

        // ### WE ARE ASSUMING THAT WE ALREADY HAVE IMEI PERMISSION IN ANDROID 6.0 OR OBOVE ...
        (<any>window).plugins.imei.get(
            (imei) => {
                console.log("got imei :" + imei);
                this.originChecker.checkOrigin(imei)
                    .then((countryOfOrigin) => {
                        this.countryOfOrigin = countryOfOrigin;
                        console.log("country of origin is : ", countryOfOrigin);
                    });

            },
            () => { console.log("error loading imei"); }
        );
    }

}
