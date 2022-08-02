import { Product } from "../../models/Product";
import * as t from "../types";

export enum ServerFetching { IDLE, FETCH, FETCHING, FETCH_ERROR }

export type FilterObject = {
  query: string,
  categories: string,
  categoriesOptions: string,
  serverTypes: string,
}

export type MainReduxState = {
  products: Product[],
  productsStatus: ServerFetching,
  productsFiltered: Product[],
  activeProduct: Product | null,
  productStatus: ServerFetching,
  filterObject: FilterObject,
}

const GlobalState: MainReduxState = {
  products: [],
  productsStatus: ServerFetching.IDLE,
  productStatus: ServerFetching.IDLE,
  productsFiltered: [],
  activeProduct: null,
  filterObject: {
    query: "",
    categories: "",
    categoriesOptions: "",
    serverTypes: "",
  }
};

const buildNewFilter = (filterObject: FilterObject, products: Product[]) => {
  const _filterObject = { ...filterObject };
  let categoriesOptions = "";
  products.forEach(product => (categoriesOptions += `${[product.subCategories.map(s => s.type), product.category.type].join(",")},`));
  categoriesOptions = categoriesOptions.slice(0, -1);
  _filterObject.categoriesOptions = Array.from(new Set(categoriesOptions.split(","))).filter(i => _filterObject.categories.split(",").indexOf(i) === -1).join(",");
  return _filterObject;
}
const main = (state = GlobalState, action: any) => {
  switch (action.type) {
    case t.FETCH_PRODUCT_ERROR:
      return {
        ...state,
        productStatus: ServerFetching.FETCH_ERROR,
      }
    case t.FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        productsStatus: ServerFetching.FETCH_ERROR,
      }
    case t.FETCHING_PRODUCT:
      return {
        ...state,
        productStatus: ServerFetching.FETCHING,
      }
    case t.FETCHING_PRODUCTS:
      return {
        ...state,
        productsStatus: ServerFetching.FETCHING,
      }
    case t.CLEAN_PRODUCT:
      return {
        ...state,
        productStatus: ServerFetching.IDLE,
        activeProduct: null,
      }
    case t.GET_PRODUCT:
      return {
        ...state,
        productStatus: ServerFetching.FETCH,
        activeProduct: { ...action.payload },
      }
    case t.GET_PRODUCTS:
      const filterObject0 = buildNewFilter(state.filterObject as FilterObject, state.productsFiltered);
      return {
        ...state,
        filterObject: { ...filterObject0 },
        productsStatus: ServerFetching.FETCH,
        products: [...action.payload],
      }
    case t.FILTER_PRODUCTS:
      const filterObject1 = buildNewFilter(action.payload as FilterObject, state.productsFiltered);
      return {
        ...state,
        filterObject: { ...filterObject1 },
        productsFiltered: [...state.products].filter(i => i.isFiltered(filterObject1)),
      }
    case t.CREATE_PRODUCT:
      return {
        ...state,
        activeProduct: action.payload,
      }
    case t.SAVE_LOCAL_PRODUCT:
      return {
        ...state,
        products: [...state.products.map(p => p.id == action.payload.id ? action.payload : p)],
      }
    case t.REMOVE_LOCAL_PRODUCT:
      return {
        ...state,
        activeProduct: null,
      }
    default:
      return { ...state };
  }
}

export default main;