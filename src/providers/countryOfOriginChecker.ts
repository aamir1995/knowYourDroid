import { Injectable } from '@angular/core';

@Injectable()
export class CountryOfOriginChecker {

    checkOrigin(imei: number) {

        // get the 7th and 8th digit from IMEI number.
        let twoDigits = ("" + imei)[6] + ("" + imei)[7];

        switch (twoDigits) {
            case "00":
                console.log("00");
                break;
            case "01":
            case "10":
                console.log("01 10");
                break;
            case "13":
                console.log("13");
                break;
            case "02":
            case "20":
                console.log("02 20");
                break;
            case "03":
            case "30":
            case "04":
            case "40":
                console.log("03 30 04 40");
                break;
            case "05":
            case "50":
                console.log("05 50");
                break;
            case "06":
            case "60":
                console.log("06 60");
                break;
            case "08":
            case "80":
                console.log("08 80");
        }


        return Promise.resolve(twoDigits);
    }
}