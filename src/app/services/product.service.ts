import { Injectable } from '@angular/core';
import { Product, productTypeId, Subcategory } from '../types/product';

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

    private async getProductsAPI(link: string) {
        try {
            const res = await fetch(`https://angular-final-project-backend.onrender.com/api/${link}`);
            return res.json()
        } catch (e) {
            console.error('some error: ', e);
            return [{ errorMessage: "Попытка получения списка продуктов не увенчалась успехом!" }]
        }
    }

    private getProductsAPIMemoized = this.memoize(this.getProductsAPI)

    async getAllProducts(): Promise<Product[] | [{ errorMessage: string }]> {
        const products = await this.getProductsAPIMemoized("products")
        return products
    }

    async getAllDiscounts(): Promise<Product[] | [{ errorMessage: string }]> {
        const products = await this.getProductsAPIMemoized("products")
        return products.filter((product: Product) => product.discount_price && product.is_available).sort((productA: Product, productB: Product) => productA.id - productB.id)
    }

    async getProductById(id: string): Promise<Product | null> {
        const product = await this.getProductsAPIMemoized(`products/${id}`)
        if (product[0]?.errorMessage || product?.message) return null
        return product
    }

    async getPopularProducts(): Promise<Product[] | [{ errorMessage: string }]> {
        const products = await this.getProductsAPIMemoized("products")
        if (products[0]?.errorMessage) return products
        return products.sort((productA: Product, productB: Product) => productB.count_review - productA.count_review).slice(0, 12)
    }

    async getNewestProducts(): Promise<Product[] | [{ errorMessage: string }]> {
        const products = await this.getProductsAPIMemoized("products")
        // return products.sort((productA: Product, productB: Product) => new Date(productB.createdAt).getTime() - new Date(productA.createdAt).getTime()).slice(0, 8)
        if (products[0]?.errorMessage) return products
        return products.sort((productA: Product, productB: Product) => productB.id - productA.id).slice(0, 8)
    }

    async getSearchedProducts(search: string): Promise<Product[]> {
        const products = await this.getProductsAPIMemoized("products")
        if (products[0]?.errorMessage) return []
        return products.filter((product: Product) => "iphone".includes(search.toLocaleLowerCase()) ? product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && !product.name.toLocaleLowerCase().includes('чехол') : product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).slice(0, 5)
    }

    async getAllCategories(): Promise<[string, Product[]][]> {
        const products = await this.getProductsAPIMemoized("products")
        if (products[0]?.errorMessage) return products
        return Object.entries(this.groupBy(products, (product: Product) => product.category)).map(category => [category[0], category[1].slice(0, 12)])
    }

    async getSubcategoriesByCategoryId(categoryId: string): Promise<Subcategory[]> {
        const subcategories = await this.getProductsAPIMemoized(`subcategory?category=${categoryId}`)
        return subcategories
    }

    async getProductsByCategoryId(categoryId: string): Promise<Product[]> {
        const products = await this.getProductsAPIMemoized(`category/${categoryId}`)
        return products
    }

    async getProductsBySubcategoryId(subcategoryId: string): Promise<Product[]> {
        const products = await this.getProductsAPIMemoized(`subcategory/${subcategoryId}`)
        return products
    }
}
