import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})

export class ProductFormComponent implements OnInit {

   categories$;

  constructor(private categoriesService: CategoryService, private productService: ProductService, private router: Router) {
    this.categories$ = categoriesService.getCategories();
  }

  ngOnInit() {
  }

  save(p: Product) {
   this.productService.create(p);
   this.router.navigate(['admin/products']);
  }

}
