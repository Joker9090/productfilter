import { buildCategoryTypeString, buildServerTypeString, Product } from "../models/Product";
import { FilterObject } from "../redux/reducers/main";

export const hugeText = (text: string, maxChars: number) => {
  return `${text.substring(0, maxChars)}${text.length > maxChars ? '...' : ''}`;
};

export const getSetsOfProduct = (product: Product) => {
  return Array.from(new Set([product.category, ...product.subCategories].map(t => t.type)));
}

export const getSetsOfCategoryProduct = (product: Product) => {
  return Array.from(new Set([product.category].map(t => t.type)));
}

export const getSetsOfSubCategoryProduct = (product: Product) => {
  return Array.from(new Set([...product.subCategories].map(t => t.type)));
}

export const getCategoriesFromFilterObject = (filterObject: FilterObject, withOptions: boolean = true) => {
  let categories = "";
  if(filterObject.categories !== "") categories = filterObject.categories;
  if(withOptions && filterObject.categoriesOptions !== "") categories = (categories == "") ? filterObject.categoriesOptions : `${categories},${filterObject.categoriesOptions}`;
  return categories != "" ? Array.from(new Set(categories.split(","))) : [];
}

export const buildCoolItemFromCategory = (category: string, checkIfActive: Function | null) => {
  return ({ value: category, label: buildCategoryTypeString(Number(category)), isActive: checkIfActive ? checkIfActive(category) : false, colorClass: "" })
}

export const buildCoolItemFromServerType = (category: string, checkIfActive: Function | null) => {
  return ({ value: category, label: buildServerTypeString(Number(category)), isActive: checkIfActive ? checkIfActive(category) : false, colorClass: "" })
}

