import {
  Component,
  ElementRef,
  HostListener,
  inject,
  linkedSignal,
  model,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { debounceTime, from, switchMap } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { ProductService } from '../services/product.service'
import ProductItemComponent from './product-item.component'

@Component({
  selector: 'search-products',
  imports: [FormsModule, AsyncPipe, ProductItemComponent],
  template: `
    <div class="h-14 flex w-full">
      <div class="relative flex-1">
        <input
          class="shape-s-start bg-surface-container-high pa-4 focus:outline-primary w-full"
          placeholder="Search all products"
          [(ngModel)]="query"
        />
        @if (showResults()) {
          <div
            class="absolute mt-2 shape-s overflow-clip bg-surface-container-high w-full flex flex-col gap-2"
          >
            @for (product of products$ | async; track product.id) {
              <product-item [product]="product" />
            }
          </div>
        }
      </div>
      <button
        class="shape-s-end bg-primary-container color-on-primary-container px-4"
      >
        Search
      </button>
    </div>
  `,
})
export default class SearchProductsComponent {
  private readonly productService = inject(ProductService)
  private readonly element = inject(ElementRef)

  public readonly query = model('')

  public readonly products$ = toObservable(this.query).pipe(
    debounceTime(500),
    switchMap((query) => from(this.productService.searchProducts(query))),
  )

  public readonly products = toSignal(this.products$)

  public readonly showResults = linkedSignal(() => !!this.products()?.length)

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.element.nativeElement.contains(event.target)) {
      return
    }

    this.showResults.set(false)
  }
}
