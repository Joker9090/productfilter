import React from "react";
import { Product, ProductCategory, productTypeEnum, serverTypeEnum } from "../models/Product";
import { getSetsOfCategoryProduct, getSetsOfSubCategoryProduct } from "../utils/helpers";
import { CoolSelector, CoolSelectorItem } from "./CoolSelector";
import { ServerLabel } from "./ServerLabel";

const ProductForm = ({ product, onChange }: { product: Product, onChange: Function }) => {
  const [categoryItems] = React.useState<CoolSelectorItem[]>([0, 1, 2, 3, 4, 5].map((i) => ({ value: i.toString(), label: productTypeEnum[i], isActive: getSetsOfCategoryProduct(product).indexOf(i) !== -1, colorClass: "" })));
  const [subcategoryItems] = React.useState<CoolSelectorItem[]>([0, 1, 2, 3, 4, 5].map((i) => ({ value: i.toString(), label: productTypeEnum[i], isActive: getSetsOfSubCategoryProduct(product).indexOf(i) !== -1, colorClass: "" })));

  const change = (key: string, newValue: string) => {
    let newProduct = { ...product };
    // @ts-ignore
    newProduct[key] = newValue;
    onChange(newProduct);
  }

  const selectCategory = (category: CoolSelectorItem) => {
    let newProduct = { ...product };
    newProduct.category = new ProductCategory(Number(category.value));
    onChange(newProduct);

  }
  const selectSubCategory = (subcategory: CoolSelectorItem) => {
    let newProduct = { ...product };
    let subCategoriesArray = getSetsOfSubCategoryProduct(product);
    if (subCategoriesArray.indexOf(Number(subcategory.value)) === -1) {
      subCategoriesArray.push(Number(subcategory.value));
    } else {
      subCategoriesArray = subCategoriesArray.filter(i => i !== Number(subcategory.value));
    }
    newProduct.subCategories = subCategoriesArray.map((sc) => (new ProductCategory(Number(sc))));
    onChange(newProduct);

  };

  return (
    <div className="ProductForm">
      <div className="ProductFormSection">
        <label>Title</label>
        <textarea data-cy="cy-modal-title" onChange={(e) => change('title', e.target.value)} defaultValue={product.title}></textarea>
      </div>
      <div className="ProductFormSection">
        <label>Category</label>
        <CoolSelector onlyOne={true} className={""} writing={true} items={categoryItems} onClick={selectCategory} />
      </div>
      <div className="ProductFormSection">
        <label>Sub Categories</label>
        <CoolSelector onlyOne={false} className={""} writing={true} items={subcategoryItems} onClick={selectSubCategory} />
      </div>
      <div className="ProductFormSection">
        <label>Description</label>
        <textarea onChange={(e) => change('description', e.target.value)} defaultValue={product.description}></textarea>
      </div>
      <div className="ProductFormSection">
        <p>Price</p>
        <input type="number" onChange={(e) => change('price', e.target.value)} defaultValue={product.price}></input>
      </div>
      <div className="ProductFormSection ProductFormSectionServer">
        <div className="">
          {(product.serverType == serverTypeEnum.SERVER) ? (
            <label>Saving data will convert to a LOCAL server Type</label>
          ) : (
            <label>Deleting data will remove only LOCAL data for this id</label>
          )}
        </div>
        <ServerLabel value={product.serverType} onClick={null} />
      </div>
    </div>
  )
}

export default ProductForm;