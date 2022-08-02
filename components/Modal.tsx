import { Product } from "../models/Product";

const Modal = ({ product, onClose }: { onClose: Function, product: Product }) => {
  return (
    <div className="Modal">
      <div className="ModalBack" onClick={() => onClose()} />
      <div className="ModalContent">
        {product.id}
      </div>
    </div>
  )
}


export default Modal;