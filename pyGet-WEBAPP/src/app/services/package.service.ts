import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PackageModel } from "../package-model";
import { environment } from "src/environments/environment";
import { __values } from "tslib";

@Injectable({
    providedIn: 'root'
})

export class PackageService {
    baseUrl:string = environment.package_api_url;
    postUrl:string = this.baseUrl + "new-package";
    getUrl:string = this.baseUrl + "get-packages";

    constructor(private client:HttpClient){}

    postPackage(data:PackageModel) {
        let header = {"Content-Type":"multipart/form-data"};
        return this.client.post(this.postUrl, data, {headers:header});
    }

    getPackages() {
        return this.client.get(this.getUrl);
    }
}