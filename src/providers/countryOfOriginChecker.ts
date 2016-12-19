import { Injectable } from '@angular/core';

@Injectable()
export class CountryOfOriginChecker {

    checkOrigin(imei: number) {

        // assign country to this variable based on 7th and 8th digit of IMEI
        let country: string = null;

        // get the 7th and 8th digit from IMEI number.
        let twoDigits = ("" + imei)[6] + ("" + imei)[7];

        switch (twoDigits) {
            case "00":
                country = "Genuine Made";
                break;
            case "01":
            case "10":
                country = "Finland";
                break;
            case "13":
                country = "Azerbaijan";
                break;
            case "02":
            case "20":
                country = "United Arab Emirates (UAE)";
                break;
            case "03":
            case "30":
            case "04":
            case "40":
                country = "China";
                break;
            case "05":
            case "50":
                country = "Brazil or USA or Finland";
                break;
            case "06":
            case "60":
                country = "Hong Kong or China or Mexico";
                break;
            case "08":
            case "80":
                country = "Germany";
                break;
            default:
                country = "Can't find Country of Origin.";
        }


        return Promise.resolve(country);
    }
}