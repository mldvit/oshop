import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { merge, forkJoin, combineLatest } from 'rxjs';
import { map, switchMap, mergeMap, mergeAll, flatMap} from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})

export class ProductsComponent implements OnInit {

  books: Product[] = [];
  filteredBooks: Product[] = [];
  category = '';
  shoppingCart: ShoppingCart;
  paramMap: ParamMap;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService) {}

  ngOnInit() {
    const products$ = this.productService.getAll().pipe(map(pp => this.books = pp));
    const cart$ = this.cartService.getCart().pipe(map(c => this.shoppingCart = c));
    const param$ = this.route.queryParamMap; //  .pipe(map(pm => this.paramMap = pm));

    merge( products$, cart$, param$ ).pipe(
      switchMap(paramMap => this.route.queryParamMap)
    )
      .subscribe((res) => {
        this.category = res.get('category');
        this.filteredBooks = this.category ? this.books.filter(b => b.category === this.category) : this.books;
      });
  }

}

/*
working
4)        const values$ =  merge( products$)// products$)
        values$.subscribe(res => console.log("evviva",res));
3)
        products$.pipe(map(res => console.log("-----------ci sono products new", res)))
        .subscribe(res => console.log("-----------res", res));

2) const products$ = this.productService.getAll()

    products$.pipe(
      map(pp => this.books = pp),
      switchMap(paramMap => this.route.queryParamMap)
    ).subscribe(res => {
      this.category = res.get('category');
      this.filteredBooks = this.category ? this.books.filter(b => b.category === this.category) : this.books;
    }
    );

1)
productService.getAll().subscribe(pp => {
      this.books = this.filteredBooks = pp;
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filteredBooks = this.category ? this.books.filter(b => b.category === this.category) : this.books;
      });
    });
  }*/
