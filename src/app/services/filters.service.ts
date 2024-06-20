import { Injectable } from '@angular/core';
import { Characteristic, Product, productTypeId } from '../types/product';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root'
})
export class FiltersService {
    constructor(public productService: ProductService) { }

    private generateFilterProcessor(products: Characteristic[][]) {
        return { name: "Процессор", values: Object.keys(this.productService.groupBy(products.map((characteristics: Characteristic[]) => characteristics.find(characteristic => characteristic.characteristic === 'Процессор')), (characteristic) => characteristic!.value)).map(value => ({ value, status: false })) }
    }

    private generateFilterDiagonal(products: Characteristic[][]) {
        return { name: "Диагональ", values: Object.keys(this.productService.groupBy(products.map((characteristics: Characteristic[]) => characteristics.find(characteristic => characteristic.characteristic === 'Диагональ')), (characteristic) => characteristic!.value)).map(value => ({ value, status: false })) }
    }

    private generateFilterMemory(products: Characteristic[][]) {
        return { name: "Объем встроенной памяти", values: Object.keys(this.productService.groupBy(products.map((characteristics: Characteristic[]) => characteristics.find(characteristic => characteristic.characteristic === 'Объем встроенной памяти')), (characteristic) => characteristic!.value)).map(value => ({ value, status: false })) }
    }

    public generateFilters(id: productTypeId, products: Product[]) {
        const modifiedProducts = products.map(product => product.characteristics)
        if (id === 2) return [this.generateFilterProcessor(modifiedProducts), this.generateFilterDiagonal(modifiedProducts), this.generateFilterMemory(modifiedProducts)]
        if (id === 3) return [this.generateFilterProcessor(modifiedProducts), this.generateFilterMemory(modifiedProducts)]
        if (id === 4) return [this.generateFilterDiagonal(modifiedProducts), this.generateFilterMemory(modifiedProducts)]
        if (id === 5) return [this.generateFilterProcessor(modifiedProducts)]
        return []
    }
}