import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { RouterModule } from '@angular/router';
import { environment } from 'environments/environment';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { LearningModule } from './learning/learning.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    CoreModule,
    AdminModule,
    ShoppingModule,
    LearningModule,

    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

