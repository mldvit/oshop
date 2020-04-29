import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'shared/models/product.model';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})

export class ProductFormComponent implements OnInit {

   categories$;
   product: Product = new Product();
   productId;

  constructor(private categoriesService: CategoryService,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) {
                this.categories$ = categoriesService.getAll();
                this.productId = route.snapshot.paramMap.get('id');
                if (this.productId) {
                  // productService.get(this.productId).subscribe(p => this.product = p);
                  // take prende solo il primo valore e unsbuscribe in automatico
                  productService.get(this.productId).pipe(take(1)).subscribe(p => this.product = p);
                }
  }

  ngOnInit() {
  }

  save() {
    if (this.productId) {  this.productService.update(this.productId, this.product); } else {  this.productService.create(this.product); }

    this.router.navigate(['admin/products']);
  }

  delete() {
    if (!(confirm('Are you sure you want to delete this book?'))) { return; }
    this.productService.delete(this.productId);
    this.router.navigate(['admin/products']);
  }

}
