import { Product } from "../../models/Product";
import * as t from "../types";
import ServiceApi from '../../utils/services';
import { FilterObject } from "../reducers/main";

const Api = new ServiceApi(); // Singleton Api

export type MainReduxActions = {
  getProducts: Function,
  getProduct: Function,
  setProduct: Function,
  filterProducts: Function,
  removeProduct: Function
}

export const getProduct = (id: string) => (dispatch: any) => {
  dispatch({ type: t.FETCHING_PRODUCT });
  const productsPromise = Api.GetProductPromise(id);
  productsPromise.then((result) => {
    const product = new Product((result as Product));
    dispatch({
      type: t.GET_PRODUCT,
      payload: product,
    });
  }).catch(e => {
    dispatch({ type: t.FETCH_PRODUCT_ERROR });
  })
}

export const setProduct = () => (dispatch: any) => {
  dispatch({
    type: t.SET_PRODUCT,
    payload: new Product(null),
  });
}

export const filterProducts = (filter: FilterObject) => (dispatch: any) => {
  dispatch({
    type: t.FILTER_PRODUCTS,
    payload: filter,
  });
}

export const removeProduct = () => (dispatch: any) => {
  dispatch({
    type: t.REMOVE_PRODUCT,
    payload: new Product(null),
  });
}

export const getProducts = () => (dispatch: any, getState: any) => {
  dispatch({ type: t.FETCHING_PRODUCTS });
  const productsPromise = Api.GetProductsPromise();
  const state = getState().main;
  productsPromise.then((result) => {
    const products = (result as Product[]).map(i => new Product(i));
    dispatch({
      type: t.GET_PRODUCTS,
      payload: [...products],
    });
    dispatch(filterProducts(state.filterObject))
  }).catch(e => {
    dispatch({ type: t.FETCH_PRODUCTS_ERROR });
  })
}
