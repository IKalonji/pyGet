import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageDetailComponent } from './package-detail/package-detail.component';
import { PackageCreateComponent } from './package-create/package-create.component';
const routes: Routes = [
  {
    path: 'create',
    component: PackageCreateComponent
  },
  {
    path: '',
    component: PackageDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
