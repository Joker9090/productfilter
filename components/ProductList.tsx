import { Product } from "../models/Product"
import { ProductRow } from "./ProductRow"

export const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="ProductList">
      {products.map((p) => <ProductRow key={`key-product-${p.id}`} {...p} />)}
    </div>
  )
}