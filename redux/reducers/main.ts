import { Product } from "../../models/Product";
import * as t from "../types";

export type MainReduxState = {
  products: Product[],
  activeProduct: Product | null,
}

const GlobalState: MainReduxState = {
  products: [],
  activeProduct: null
};

const main = (state = GlobalState, action: any) => {
  switch (action.type) {
    case t.GET_PRODUCT:
      return {
        ...state,
        activeProduct: { ...action.payload },
      }
    case t.GET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
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