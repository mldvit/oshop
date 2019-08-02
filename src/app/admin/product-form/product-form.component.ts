import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit {

   categories$;

  constructor(categoriesService: CategoryService) {
    this.categories$ = categoriesService.getCategories();
  }

  ngOnInit() {
  }

}
