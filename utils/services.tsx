import mockedProducts1 from '../mocks/product1.json';
import mockedProducts2 from '../mocks/product2.json';
import mockedProducts3 from '../mocks/product3.json';
import mockedProducts4 from '../mocks/product4.json';
import mockedProducts5 from '../mocks/product5.json';
import mockedProducts6 from '../mocks/product6.json';
import mockedProducts7 from '../mocks/product7.json';
import mockedProducts8 from '../mocks/product8.json';
import mockedProducts9 from '../mocks/product9.json';
import { Product } from '../models/Product';
const allProducts = [mockedProducts1, mockedProducts2, mockedProducts3, mockedProducts4, mockedProducts5, mockedProducts6, mockedProducts7, mockedProducts8, mockedProducts9,];

export class ServiceApi {
  constructor() {

  }
  GetProductPromise(id: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const productsFiltered = allProducts.filter(i => i.ProductInterface.id == id);
        if (productsFiltered.length) resolve(productsFiltered[0].ProductInterface);
        else return reject("NO ITEM FOUND")
      }, 3000);
    })

  }

  GetProductsPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(allProducts.map(m => m.ProductInterface))
      }, 3000);
    })
  }
}

const prefix = 'productFilter-';
export class ServiceLocalApi {
  constructor() {

  }
  GetProductFromLocal(id: string) {
    const item = window.localStorage.getItem(`${prefix}-${id}`);
    if (item) return JSON.parse(item);
    else return null;
  }

  setProductFromLocal(product: Product) {
    window.localStorage.setItem(`${prefix}-${product.id}`, JSON.stringify(product));
  }
}

