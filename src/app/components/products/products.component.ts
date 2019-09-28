import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent {

  books: Product[] = [];
  filteredBooks: Product[] = [];
  categories$: Observable<any>;
  category: string;

  constructor(route: ActivatedRoute,
              private productService: ProductService,
              private categoryService: CategoryService) {

    this.categories$ = categoryService.getAll();
    productService.getAll().subscribe(pp => {
      this.books = this.filteredBooks = pp;
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filteredBooks = this.category ? this.books.filter(b => b.category === this.category) : this.books;
      });
    });


   }

}
