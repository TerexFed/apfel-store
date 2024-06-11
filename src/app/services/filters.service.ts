import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FiltersService {
    private async getAllProducts(link: string = "products") {
        try {
            const res = await fetch(`http://localhost:1452/api/${link}`);
            return res.json()
        } catch (e) {
            console.error('some error: ', e);
            return []
        }
    }

    async getPopularProducts() {
        const products = await this.getAllProducts()
        return products.sort((productA: any, productB: any) => productB.count_review - productA.count_review).slice(0, 12);
    }

    async getNewestProducts() {
        const products = await this.getAllProducts()
        // console.log(products.sort((productA: any, productB: any) => new Date(productB.createdAt).getTime() - new Date(productA.createdAt).getTime()));
        // console.log(products.map((product: any) => new Date(product.createdAt).getTime()));
        // console.log(products.map((product: any) => new Date(product.createdAt).getTime()).sort((timeA: any, timeB: any) => timeB - timeA));

        // return products.sort((productA: any, productB: any) => new Date(productB.createdAt).getTime() - new Date(productA.createdAt).getTime()).slice(0, 8)
        return products.sort((productA: any, productB: any) => productB.id - productA.id).slice(0, 8)
    }
}