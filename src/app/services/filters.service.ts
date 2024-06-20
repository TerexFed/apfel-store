import { Injectable } from '@angular/core';
import { Product } from '../types/product';

@Injectable({
    providedIn: 'root'
})
export class FiltersService {
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


    private async getAllProducts(link: string) {
        try {
            const res = await fetch(`https://angular-final-project-backend.onrender.com/api/${link}`);
            return res.json()
        } catch (e) {
            console.error('some error: ', e);
            return [{ errorMessage: "Попытка получения списка продуктов не увенчалась успехом!" }]
        }
    }

    private getAllProductsMemoized = this.memoize(this.getAllProducts)

    async getPopularProducts() {
        const products = await this.getAllProductsMemoized("products")
        return products.sort((productA: any, productB: any) => productB.count_review - productA.count_review).slice(0, 12)
    }

    async getNewestProducts() {
        const products = await this.getAllProductsMemoized("products")
        // return products.sort((productA: any, productB: any) => new Date(productB.createdAt).getTime() - new Date(productA.createdAt).getTime()).slice(0, 8)
        return products.sort((productA: any, productB: any) => productB.id - productA.id).slice(0, 8)
    }

    async getSearchedProducts(search: string) {
        const products = await this.getAllProductsMemoized("products")
        return products.filter((product: Product) => product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).slice(0, 5)
    }

    async getAllCategories(): Promise<[string, Product[]][]> {
        const products = await this.getAllProductsMemoized("products")
        return Object.entries(this.groupBy(products, (product: Product) => product.category)).map(category => [category[0], category[1].slice(0, 12)])
    }
}