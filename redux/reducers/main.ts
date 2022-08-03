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
      return {
        ...state,
        productsStatus: ServerFetching.FETCH,
        products: [...action.payload],
      }
    case t.FILTER_PRODUCTS:
      return {
        ...state,
        filterObject: { ...action.payload },
        productsFiltered: [...state.products].filter(i => i.isFiltered(action.payload)),
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
