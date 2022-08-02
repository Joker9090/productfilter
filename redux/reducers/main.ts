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

const main = (state = GlobalState, action: any) => {
  console.log("action.type", action.type, action.payload);
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
    case t.GET_PRODUCT:
      return {
        ...state,
        productStatus: ServerFetching.FETCH,
        activeProduct: { ...action.payload },
      }
    case t.GET_PRODUCTS:
      return {
        ...state,
        productsStatus: ServerFetching.FETCH,
        products: [...action.payload],
      }
    case t.FILTER_PRODUCTS:
      const filterObject = action.payload as FilterObject;
      const products = state.productsFiltered;
      let categoriesOptions = "";
      products.forEach(product => (categoriesOptions += `${[product.subCategories.map(s => s.type), product.category.type].join(",")},`))
      filterObject.categoriesOptions = Array.from(new Set(categoriesOptions.slice(0, -1).split(","))).join(",");
      console.log(filterObject)
      return {
        ...state,
        filterObject: { ...filterObject },
        productsFiltered: [...state.products].filter(i => i.isFiltered(filterObject)),
      }
    case t.SET_PRODUCT:
      return {
        ...state,
        products: [...state.products.map(p => p.id == action.payload.id ? action.payload : p)],
      }
    case t.REMOVE_PRODUCT:
      return {
        ...state,
        products: [...state.products.filter(p => p.id != action.payload.id)],
      }
    default:
      return { ...state };
  }
}

export default main;