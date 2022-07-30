import {
  Input,
  OnInit,
  Component,
 } from '@angular/core';

 import {
  CategoryModel
} from '../../models/categoryModel';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {

  @Input() category: CategoryModel = {

    categoryID: 0,
    categoryName: ''
  };

  constructor() { }

  ngOnInit(): void {}

}
