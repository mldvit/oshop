import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent {

  books$: Observable<any>;
  categories$: Observable<any>;

  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this. books$ = productService.getAll();
    this.categories$ = categoryService.getAll();
   }

}
