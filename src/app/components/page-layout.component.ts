import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import SearchProductsComponent from './search-products.component'

@Component({
  selector: 'page-layout',
  imports: [RouterLink, SearchProductsComponent],
  template: `
    <div class="h-full flex flex-col max-w-168 mx-auto">
      <header class="flex flex-row gap-2 h-19 px-4 py-2 items-center">
        <a routerLink="/" class="block font-black color-primary min-w-48"> Signal Store </a>
        <div class="flex-1">
          <search-products />
        </div>
      </header>
      <div class="flex-1 px-4">
        <ng-content />
      </div>
    </div>
  `,
})
export default class PageLayoutComponent {}
