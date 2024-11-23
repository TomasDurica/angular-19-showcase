import { Injectable, resource } from '@angular/core'
import z from 'zod'

const baseUrl = 'https://dummyjson.com/products'

const fetchJson = async (url: string) => {
  const response = await fetch(url)
  return (await response.json()) as unknown
}

const categorySchema = z.object({
  slug: z.string(),
  name: z.string(),
})

export type Category = z.infer<typeof categorySchema>

const productItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  rating: z.number(),
  thumbnail: z.string(),
})

export type ProductItem = z.infer<typeof productItemSchema>

const productListSchema = z
  .object({
    products: z.array(productItemSchema),
  })
  .transform(({ products }) => products)

const productDetailSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  rating: z.number(),
  images: z.array(z.string()),
})

@Injectable({ providedIn: 'root' })
export class ProductService {
  public readonly categories = resource({
    loader: async () => {
      const data = await fetchJson(`${baseUrl}/categories?select=slug&select=name`)
      return z.array(categorySchema).parse(data)
    },
  }).asReadonly()

  public async searchProducts(query: string) {
    if (!query) {
      return []
    }

    const data = await fetchJson(
      `${baseUrl}/search?q=${query}&select=id&select=title&select=price&select=rating&select=thumbnail&limit=5`,
    )
    return productListSchema.parse(data)
  }

  public async getProductsByCategory(categorySlug: string) {
    const data = await fetchJson(
      `${baseUrl}/category/${categorySlug}?select=id&select=title&select=price&select=rating&select=thumbnail`,
    )
    return productListSchema.parse(data)
  }

  public async getProductDetail(productId: string) {
    const data = await fetchJson(
      `${baseUrl}/${productId}?select=title&select=description&select=category&select=price&select=rating&select=images`,
    )
    return productDetailSchema.parse(data)
  }
}
