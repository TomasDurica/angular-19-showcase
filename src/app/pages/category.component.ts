import { Component, computed, inject, resource } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import ProductCardComponent from '../components/product-card.component'
import PageLayoutComponent from '../components/page-layout.component'
import { ProductService } from '../services/product.service'

@Component({
  imports: [PageLayoutComponent, ProductCardComponent, RouterLink],
  template: `
    <page-layout>
      <div class="pa-4 flex flex-col gap-1">
        <div class="font-size-3 color-tertiary">
          <a routerLink="/" class="decoration-underline"> Categories </a>
        </div>
        <div class="h-16">
          <h2 class="font-size-8 color-secondary">{{ categoryName() }}</h2>
        </div>
        <main class="grid grid-cols-3 gap-2">
          @for (product of products.value(); track product.id) {
            <product-card [product]="product" />
          }
        </main>
      </div>
    </page-layout>
  `,
})
export default class CategoryComponent {
  private readonly productService = inject(ProductService)
  private readonly categorySlug =
    (inject(ActivatedRoute).snapshot.params['categorySlug'] as string) ?? ''

  public readonly products = resource({
    request: () => ({ categorySlug: this.categorySlug }),
    loader: async ({ request: { categorySlug } }) =>
      categorySlug
        ? await this.productService.getProductsByCategory(categorySlug)
        : [],
  }).asReadonly()

  public readonly categoryName = computed(
    () =>
      this.productService.categories
        .value()
        ?.find((category) => category.slug === this.categorySlug)?.name,
  )
}
