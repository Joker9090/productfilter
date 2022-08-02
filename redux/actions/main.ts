import { Product } from "../../models/Product";
import * as t from "../types";
import { ServiceApi, ServiceLocalApi } from '../../utils/services';
import { FilterObject } from "../reducers/main";

const Api = new ServiceApi(); // Singleton Api
const ApiLocal = new ServiceLocalApi(); // Singleton Api

export type MainReduxActions = {
  getProducts: Function,
  cleanProduct: Function,
  getProduct: Function,
  saveLocalProduct: Function,
  filterProducts: Function,
  removeLocalProduct: Function,
  createProduct: Function,
}

export const cleanProduct = () => (dispatch: any) => {
  dispatch({ type: t.CLEAN_PRODUCT });
}

export const getProduct = (id: string) => (dispatch: any) => {
  dispatch({ type: t.FETCHING_PRODUCT });
  const productPromise = Api.GetProductPromise(id);
  const productFromLocal = ApiLocal.GetProductFromLocal(id);
  productPromise.then((result) => {
    let product
    if (result) {
      product = new Product((result as Product));
    }
    if (productFromLocal) {
      product = productFromLocal;
    }
    if (product) {
      dispatch({
        type: t.GET_PRODUCT,
        payload: product,
      });
    } else {
      dispatch({ type: t.FETCH_PRODUCT_ERROR });
    }
  }).catch(e => {
    let product
    if (productFromLocal) {
      product = productFromLocal;
      dispatch({
        type: t.GET_PRODUCT,
        payload: product,
      });
    } else {
      dispatch({ type: t.FETCH_PRODUCT_ERROR });
    }
  })
}

export const createProduct = () => (dispatch: any) => {
  dispatch({
    type: t.CREATE_PRODUCT,
    payload: new Product(null),
  });
}

export const filterProducts = (filter: FilterObject) => (dispatch: any) => {
  dispatch({
    type: t.FILTER_PRODUCTS,
    payload: filter,
  });
}

export const saveLocalProduct = (product: Product) => (dispatch: any) => {
  ApiLocal.saveProductFromLocal(product);
  dispatch({
    type: t.SAVE_LOCAL_PRODUCT,
    payload: product,
  });
  dispatch(getProducts());
}

export const removeLocalProduct = (product: Product) => (dispatch: any) => {
  ApiLocal.removeProductFromLocal(product);
  dispatch({
    type: t.REMOVE_LOCAL_PRODUCT,
    payload: product,
  });
  dispatch(getProducts());
}

export const getProducts = () => (dispatch: any, getState: any) => {
  dispatch({ type: t.FETCHING_PRODUCTS });
  const productsPromise = Api.GetProductsPromise();
  const productsFromLocal = ApiLocal.GetProductsFromLocal();
  const state = getState().main;

  Promise.all([productsPromise, productsFromLocal]).then(([resultServer, resultLocal]) => {
    const resultServerProducts = (resultServer as Product[]).map(i => new Product(i));
    const resultLocalProducts = (resultLocal as Product[]).map(i => new Product(i));

    /* override LocalProducts over serverProducts */
    let productsMixed = resultServerProducts.map((i) => {
      let id = i.id;
      const fromLocal = resultLocalProducts.filter(l => l.id == id);
      if (fromLocal.length > 0) return fromLocal[0];
      return i;
    });
    /* concat others localProducts */
    resultLocalProducts.forEach((i) => {
      const fromLocal = productsMixed.filter((l) => l.id == i.id);
      if (!fromLocal.length) productsMixed.push(i);
    })

    dispatch({
      type: t.GET_PRODUCTS,
      payload: [...productsMixed],
    });
    dispatch(filterProducts(state.filterObject))
  }).catch(e => {
    dispatch({ type: t.FETCH_PRODUCTS_ERROR });
  })
}
