import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageModel } from '../package-model';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-package-create',
  templateUrl: './package-create.component.html',
  styleUrls: ['./package-create.component.css']
})
export class PackageCreateComponent implements OnInit {

  package: PackageModel = {
    package_name: '',
    package_version: '',
    package_url: '',
    package_description: '',
    package_author: '',
    package_licence: '',
    package_cid: '1234567890'
  }

  constructor(private service:PackageService, private router: Router) { }

  ngOnInit(): void {
  }

  submitPackage() {
    this.service.postPackage(this.package).subscribe(
      (response) => {
        console.log("Uploaded");
      },
      (error) => {
        console.log("Error occurred: " + error.message);
      });
  }

  submit(){
    alert("Package created successfully");
  }
}
