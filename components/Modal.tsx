import React from "react";
import { Product, serverTypeEnum } from "../models/Product";
import { hugeText } from "../utils/helpers";
import ProductForm from "./ProductForm";

const Modal = ({ product, onClose, saveProduct, removeProduct }: { onClose: Function, removeProduct: Function, saveProduct: Function, product: Product }) => {
  const [_product, setProduct] = React.useState(product);
  return (
    <div className="Modal">
      <div className="ModalBack" onClick={() => onClose()} />
      <div className="ModalContent">
        <div className="ModalHeader">
          <div />
          <p>{hugeText(product.title, 40)}</p>
          <div className="HeaderClose" onClick={() => onClose()}>
            <span className="customIcon icon-cancel c-white" />
          </div>
        </div>
        <div className="ModalBody">
          <ProductForm product={_product} onChange={(product: Product) => setProduct(product)} />
        </div>
        <div className="ModalFooter">
          <ModalButton text="Save Local Data" onClick={() => saveProduct(_product)} />
          {(_product.serverType == serverTypeEnum.LOCAL) && (
            <ModalButton text="Remove Local Data" onClick={() => removeProduct(_product)} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal;

export const ModalButton = ({ text, onClick }: { text: string, onClick: Function }) => {
  return (
    <div className="ModalButton" onClick={() => onClick()}>
      <p>{text}</p>
    </div>
  )
}
