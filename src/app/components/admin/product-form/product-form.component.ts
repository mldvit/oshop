import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})

export class ProductFormComponent implements OnInit {

   categories$;
   product: Product = {};
   productId;

  constructor(private categoriesService: CategoryService,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) {
                this.categories$ = categoriesService.getCategories();
                this.productId = route.snapshot.paramMap.get('id');
                if (this.productId) {
                  // productService.get(this.productId).subscribe(p => this.product = p);  
                  // take prende solo il primo valore e unsbuscribe in automatico
                  productService.get(this.productId).pipe(take(1)).subscribe(p => this.product = p);
                }
  }

  ngOnInit() {
  }

  save(p: Product) {
   this.productService.create(p);
   this.router.navigate(['admin/products']);
  }

}
