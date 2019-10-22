import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, forkJoin, pipe } from 'rxjs';
import {map, switchMapTo, switchMap} from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

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

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private categoryService: CategoryService) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

    this.productService.getAll().pipe(
      map(pp => this.books = pp),
      switchMap(paramMap => this.route.queryParamMap)
    ).subscribe(res => {
      this.category = res.get('category');
      this.filteredBooks = this.category ? this.books.filter(b => b.category === this.category) : this.books;
    }
    );

/*
working
productService.getAll().subscribe(pp => {
      this.books = this.filteredBooks = pp;
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filteredBooks = this.category ? this.books.filter(b => b.category === this.category) : this.books;
      });
    }); */
  }
}
