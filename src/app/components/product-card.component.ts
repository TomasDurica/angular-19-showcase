import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ProductItem } from '../services/product.service'

@Component({
  selector: 'product-card',
  imports: [RouterLink],
  template: `
    <a routerLink="/products/{{ product().id }}" class="shape-m bg-surface-container pa-4 flex flex-col gap-2">
      <div class="relative aspect-ratio-square">
        <img [src]="product().thumbnail" class="block object-contain" alt="Product Thumbnail" />
      </div>
      <div class="text-ellipsis line-clamp-2 text-center h-14">
        {{ product().title }}
      </div>

      <div class="text-center font-size-6 color-primary">{{ product().price }}&euro;</div>
    </a>
  `,
})
export default class ProductCardComponent {
  public readonly product = input.required<ProductItem>()
}
