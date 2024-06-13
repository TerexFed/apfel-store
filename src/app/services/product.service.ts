import { Injectable } from '@angular/core';
import { Product } from '../types/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    groupBy<T>(iterable: Iterable<T>, fn: (item: T) => string | number) {
        return [...iterable].reduce<Record<string, T[]>>((groups, el) => {
            const key = fn(el)
            const group = groups[key] ?? []
            group.push(el)
            return { ...groups, [key]: group }
        }, {})
    }

    memoize<T, U>(func: (arg: T) => Promise<U>): (arg: T) => Promise<U> {
        const cache = new Map<T, U>()
        return async function (arg: T): Promise<U> {
            if (cache.has(arg)) return cache.get(arg) as U
            const result = await func(arg)
            cache.set(arg, result)
            return result
        };
    }

    private async getAllProductsAPI(link: string) {
        try {
            const res = await fetch(`http://localhost:1452/api/${link}`);
            return res.json()
        } catch (e) {
            console.error('some error: ', e);
            return [{ errorMessage: "Попытка получения списка продуктов не увенчалась успехом!" }]
        }
    }

    private getAllProductsAPIMemoized = this.memoize(this.getAllProductsAPI)

    async getAllProducts(): Promise<Product[] | [{ errorMessage: string }]> {
        const products = await this.getAllProductsAPIMemoized("products")
        return products
    }

    async getProductById(id: string): Promise<Product | null> {
        const products = await this.getAllProductsAPIMemoized("products")
        if (products[0]?.errorMessage) return null
        return products.find((product: Product) => product.id === +id)
    }

    async getPopularProducts(): Promise<Product[] | [{ errorMessage: string }]> {
        const products = await this.getAllProductsAPIMemoized("products")
        if (products[0]?.errorMessage) return products
        return products.sort((productA: Product, productB: Product) => productB.count_review - productA.count_review).slice(0, 12)
    }

    async getNewestProducts(): Promise<Product[] | [{ errorMessage: string }]> {
        const products = await this.getAllProductsAPIMemoized("products")
        // return products.sort((productA: Product, productB: Product) => new Date(productB.createdAt).getTime() - new Date(productA.createdAt).getTime()).slice(0, 8)
        if (products[0]?.errorMessage) return products
        return products.sort((productA: Product, productB: Product) => productB.id - productA.id).slice(0, 8)
    }

    async getSearchedProducts(search: string): Promise<Product[]> {
        const products = await this.getAllProductsAPIMemoized("products")
        if (products[0]?.errorMessage) return []
        return products.filter((product: Product) => "iphone".includes(search.toLocaleLowerCase()) ? product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && !product.name.toLocaleLowerCase().includes('чехол') : product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).slice(0, 5)
    }

    async getAllCategories(): Promise<[string, Product[]][]> {
        const products = await this.getAllProductsAPIMemoized("products")
        if (products[0]?.errorMessage) return products
        return Object.entries(this.groupBy(products, (product: Product) => product.category)).map(category => [category[0], category[1].slice(0, 12)])
    }
}


// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class GadgetService {
//   public gadgets: Array<any> = []
//   public gadget: any

//   public getAllGadgets() {
//     fetch('http://localhost:1452/api/products')
//       .then(res => res.json())
//       .then(data => this.gadgets = data)
//       .then(() => this.gadgets.map(el => el.isInCart = false))
//   }

//   public getGadgetByID(id: string) {
//     fetch('http://localhost:1452/api/products/' + id)
//       .then(res => res.json())
//       .then(data => this.gadget = data)
//   }
// }
