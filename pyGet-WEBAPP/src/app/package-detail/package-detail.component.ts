import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageModel } from '../package-model';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})
export class PackageDetailComponent implements OnInit {

  packages: PackageModel[] = [];

  constructor(private service:PackageService, private router: Router) { }

  ngOnInit(): void {
    this.getPackages();
  }

  getPackages() {
    this.service.getPackages().subscribe(
      (data) => {
        let response: any = data;
        if(data) {
          response["data"].forEach((element: PackageModel) => {
            this.packages.push(element as PackageModel);
          });
        }
      },
      (error) => {
        console.log("An error occurred! \nError: " + error.message);
      }
    );
  }

}
