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

export const buildCategoryTypeString = (v: number) => productTypeEnum[v];
export const buildServerTypeString = (v: number) => serverTypeEnum[v];

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
    const check4Query = (q: string) => {
      if (this.id.toLowerCase().indexOf(q.toLowerCase()) !== -1) return true;
      if (this.title.toLowerCase().indexOf(q.toLowerCase()) !== -1) return true;
      if (this.description.toLowerCase().indexOf(q.toLowerCase()) !== -1) return true;
      return false
    }
    const check4Categories = (cs: string) => {
      let r = true;
      let all = [this.category, ...this.subCategories].map(c => `${c.type}`);
      let selected = cs.split(",");
      for (let i = 0; i < selected.length; i++) {
        if (all.indexOf(selected[i].toString()) === -1) r = false;
      }
      return r
    }
    const check4ServerType = (st: string) => {
      let all = [serverTypeEnum.LOCAL, serverTypeEnum.SERVER];
      let selected = st.split(",");
      if (selected.indexOf(this.serverType.toString()) !== -1) return true;
      return false
    }
    if (filterObject.query && filterObject.query !== "" && !check4Query(filterObject.query)) return false;
    if (filterObject.categories && filterObject.categories !== "" && !check4Categories(filterObject.categories)) return false;
    if (filterObject.serverTypes && filterObject.serverTypes !== "" && !check4ServerType(filterObject.serverTypes)) return false;

    return r;
  }
}