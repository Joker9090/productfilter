import { Product } from "../../models/Product";
import * as t from "../types";

export type MainReduxActions = {
  getProducts: Function,
  getProduct: Function,
  setProduct: Function
  removeProduct: Function
}

export const getProduct = () => (dispatch: any) => {
  dispatch({
    type: t.GET_PRODUCT,
    payload: new Product(),
  });
}

export const setProduct = () => (dispatch: any) => {
  dispatch({
    type: t.SET_PRODUCT,
    payload: new Product(),
  });
}

export const removeProduct = () => (dispatch: any) => {
  dispatch({
    type: t.REMOVE_PRODUCT,
    payload: new Product(),
  });
}

export const getProducts = () => (dispatch: any) => {
  dispatch({
    type: t.GET_PRODUCTS,
    payload: [],
  });
}
