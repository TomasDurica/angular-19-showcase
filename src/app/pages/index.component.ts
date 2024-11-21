import { Component, inject, resource } from '@angular/core'
import { ProductService } from '../services/product.service'
import PageLayoutComponent from '../components/page-layout.component'
import CategoryItemComponent from '../components/category-item.component'

@Component({
  imports: [PageLayoutComponent, CategoryItemComponent],
  template: `
    <page-layout>
      <div class="flex flex-wrap gap-2 justify-items-stretch">
        @for (category of categories.value(); track category.slug) {
          <div class="w-full max-w-84 flex-1 min-w-48">
            <category-item [category]="category" />
          </div>
        }
      </div>
    </page-layout>
  `
})
export default class IndexComponent {
  public readonly categories = inject(ProductService).categories
}
