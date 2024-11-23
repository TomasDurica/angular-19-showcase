import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Category } from '../services/product.service'

@Component({
  selector: 'category-item',
  imports: [RouterLink],
  template: `
    <a routerLink="categories/{{ category().slug }}" class="block pa-4 shape-s bg-surface-container color-secondary">
      {{ category().name }}
    </a>
  `,
})
export default class CategoryItemComponent {
  public readonly category = input.required<Category>()
}
