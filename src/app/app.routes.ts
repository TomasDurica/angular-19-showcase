import { Routes } from '@angular/router'
import IndexComponent from './pages/index.component'
import ProductDetailComponent from './pages/product-detail.component'
import CategoryComponent from './pages/category.component'

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'categories/:categorySlug', component: CategoryComponent },
  { path: 'products/:productId', component: ProductDetailComponent },
]
