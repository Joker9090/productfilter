import { v4 as uuidv4 } from 'uuid';
import { FilterObject } from '../redux/reducers/main';

export enum serverTypeEnum { LOCAL, SERVER };

export enum productTypeEnum { BEER, BOOK, FOOD, PHOTOGRAPHY, GAMING, MOVIES };

// Interfaces are for Mock Script
export interface ProductInterfaceCategory {
  type: 0 | 1 | 2 | 3 | 4,
};
export interface ProductInterface {
  id: string;
  serverType: 0 | 1;
  category: ProductInterfaceCategory;
  subCategories: ProductInterfaceCategory[];
  price: number;
  description: string;
  title: string;
  image: string;
}

export const buildCategoryTypeString = (v:number) => productTypeEnum[v];
export const buildServerTypeString = (v:number) => serverTypeEnum[v];

export class ProductCategory {
  type: productTypeEnum;
  constructor(category: productTypeEnum) {
    this.type = category;
  }
}

export class Product {
  id: string;
  serverType: serverTypeEnum;
  category: ProductCategory;
  subCategories: ProductCategory[];
  price: number;
  title: string;
  description: string;
  image: string;

  constructor(json: Product | null) {
    if (json) {
      this.id = json.id;
      this.title = json.title;
      this.serverType = json.serverType;
      this.category = new ProductCategory(json.category.type);
      this.price = json.price;
      this.subCategories = json.subCategories;
      this.description = json.description;
      this.image = json.image;
    } else {
      this.id = uuidv4();
      this.title = "";
      this.serverType = serverTypeEnum.LOCAL;
      this.category = new ProductCategory(productTypeEnum.BEER);
      this.price = 0;
      this.subCategories = [];
      this.description = "";
      this.image = "";
    }
  }

  isFiltered(filterObject: FilterObject) {
    let r = true;
    const check4Id = (fid: string) => {
      if (this.id.indexOf(fid) !== -1) return true;
      return false
    }
    if (filterObject.id && filterObject.id !== "" && !check4Id(filterObject.id)) return false;
    return r;
  }
}