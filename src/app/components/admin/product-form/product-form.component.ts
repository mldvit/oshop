import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})

export class ProductFormComponent implements OnInit {

   categories$;

  constructor(categoriesService: CategoryService, private productService: ProductService) {
    this.categories$ = categoriesService.getCategories();
  }

  ngOnInit() {
  }

  save(p: Product) {
   this.productService.create(p);
  }

}
