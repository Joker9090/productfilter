import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Product } from "../models/Product"
import { ProductRow } from "./ProductRow"

export const ProductList = ({ products, setActiveProduct }: { products: Product[], setActiveProduct: Function }) => {
  return (
    <div className="ProductList">
      <Container>
        <Row>
          <Col xs={12}>
            {products.map((p) => <ProductRow key={`key-product-${p.id}`} setActiveProduct={setActiveProduct} product={p} />)}
          </Col>
        </Row>
      </Container>
    </div>
  )
}