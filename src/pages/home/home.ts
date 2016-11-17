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

            (<any>window).plugins.imei.get(
                function(imei) {
                    console.log("got imei: " + imei);
                },
                function() {
                    console.log("error loading imei");
                }
            );

        });
    }

}
