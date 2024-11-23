import {
  Component,
  computed,
  inject,
  linkedSignal,
  resource,
} from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { ProductService } from '../services/product.service'
import PageLayoutComponent from '../components/page-layout.component'
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs'

@Component({
  imports: [PageLayoutComponent, RouterLink],
  template: `
    <page-layout>
      <div class="pa-4 flex flex-col gap-1">
        <div class="font-size-3 color-tertiary">
          <a routerLink="/" class="decoration-underline"> Categories </a>
          <span> &gt; </span>
          <a
            routerLink="/categories/{{ category()?.slug }}"
            class="decoration-underline"
          >
            {{ category()?.name }}
          </a>
        </div>
        <div class="h-16">
          <h2 class="font-size-8 color-secondary">
            {{ product.value()?.title }}
          </h2>
        </div>
        <div class="grid grid-cols-2 grid-rows-[auto_16] gap-2">
          <img [src]="activeImage()" />
          <main>
            {{ product.value()?.description }}
          </main>
          <div class="flex flex-wrap gap-2 h-16">
            @for (url of product.value()?.images; track url) {
              <button
                (click)="activeImage.set(url)"
                class="aspect-ratio-square b-1 b-outline shape-s"
              >
                <img class="w-16" [src]="url" />
              </button>
            }
          </div>
          <div class="color-primary font-size-8 text-right">
            {{ product.value()?.price }}&euro;
          </div>
        </div>
      </div>
    </page-layout>
  `,
})
export default class ProductDetailComponent {
  private readonly productService = inject(ProductService)
  private readonly productId = toSignal(
    inject(ActivatedRoute).params.pipe(
      map((params) => (params['productId'] as string) ?? ''),
    ),
  )

  public readonly product = resource({
    request: () => ({ productId: this.productId() }),
    loader: async ({ request: { productId } }) =>
      productId
        ? await this.productService.getProductDetail(productId)
        : undefined,
  }).asReadonly()

  public readonly category = computed(() =>
    this.productService.categories
      .value()
      ?.find((category) => category.slug === this.product.value()?.category),
  )

  public readonly activeImage = linkedSignal(() => {
    const images = this.product.value()?.images
    return images?.length ? images[0] : ''
  })
}
