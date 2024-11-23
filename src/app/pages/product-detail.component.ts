import { Component, inject, linkedSignal, resource } from '@angular/core'
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
        <a routerLink="/" class="font-size-3 color-tertiary"
          >&lt;&lt; Back to categories</a
        >
        <div class="h-16">
          <h2 class="font-size-8 color-secondary">
            {{ product.value()?.title }}
          </h2>
        </div>
        <div class="grid grid-cols-2 grid-rows-[auto_16] gap-2">
          <img class="aspect-ratio-square" [src]="activeImage()"/>
          <main>
            {{ product.value()?.description }}
          </main>
          <div class="flex flex-wrap gap-2 h-16">
            @for (url of product.value()?.images; track url) {
              <button
                (click)="activeImage.set(url)"
                class="aspect-ratio-square b-1 b-outline shape-s"
              >
                <img class="aspect-ratio-square h-16" [src]="url" />
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

  public readonly activeImage = linkedSignal(() => {
    const images = this.product.value()?.images
    return images?.length ? images[0] : ''
  })
}
