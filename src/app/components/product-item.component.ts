import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ProductItem } from '../services/product.service'

@Component({
  selector: 'product-item',
  imports: [RouterLink],
  template: `
    <a
      routerLink="/products/{{ product().id }}"
      class="flex gap-2 h-16 pa-2 items-center"
    >
      <img
        class="aspect-ratio-square h-16"
        src="{{ product().thumbnail }}"
        alt="Product Thumbnail"
      />
      <div class="flex-1 text-ellipsis line-clamp-1">{{ product().title }}</div>
      <div class="color-primary font-size-5">{{ product().price }}&euro;</div>
    </a>
  `,
})
export default class ProductItemComponent {
  public readonly product = input.required<ProductItem>()
}
