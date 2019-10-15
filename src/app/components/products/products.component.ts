import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
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

  /*     productService.getAll().subscribe(pp => {
      return this.books = this.filteredBooks = pp;
    });

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredBooks = this.category ? this.books.filter(b => b.category === this.category) : this.books;
    }); */

/*     console.log('1)');
    forkJoin(
      productService.getAll(),
      route.queryParamMap
    ).subscribe(res => {
      console.log('2)');
      this.books = res[0];
      this.category = res[1].get('category');
      this.filteredBooks = this.category ? this.books.filter(b => b.category === this.category) : this.books;
      console.log(this.books);
    }
    ); */

/*   
working
productService.getAll().subscribe(pp => {
      this.books = this.filteredBooks = pp;
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filteredBooks = this.category ? this.books.filter(b => b.category === this.category) : this.books;
      });
    }); */
/* 
    https://www.learnrxjs.io/operators/transformation/switchmap.html
    https://medium.com/@paynoattn/3-common-mistakes-i-see-people-use-in-rx-and-the-observable-pattern-ba55fee3d031
    this.appParameters
    .map(params => params['id'])
    .switchMap(id => {
      if(id !== null && id !== undefined) { 
        return this.getUser(id)
      }
    })
    .subscribe(user => this.user = user); */


    forkJoin(
      this.productService.getAll(),
      this.route.queryParamMap
    ).subscribe(res => {
      console.log('2)');
      this.books = res[0];
      this.category = res[1].get('category');
      this.filteredBooks = this.category ? this.books.filter(b => b.category === this.category) : this.books;
      console.log(this.books);
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
