import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Product } from "../models/Product"
import { hugeText } from '../utils/helpers';
import { Price } from './Price';
import { Bullet } from './Bullet';
import { ServerLabel } from './ServerLabel';

export const ProductRow = ({ product, setActiveProduct }: { product: Product, setActiveProduct: Function }) => {
  const { id, title, description, price, image, category, subCategories, serverType } = product;
  return (
    <Row className="ProductRow" onClick={() => setActiveProduct(product)}>
      <div className="ProductRowHover" />
      <Col xs={12} md={4} className="p-0 m-0">
        <div className="ProductPartImage">
          <div className="ProductPartId">{id}</div>
        </div>
      </Col>
      <Col xs={12} md={8}>
        <div className="ProductPartTitle"><h5>{hugeText(title, 25)}</h5></div>
        <div className="ProductPartBullets">
          {Array.from(new Set([category, ...subCategories].map(i => i.type))).map((b, index) => <Bullet key={`bullet-${b}-${index}`} onClick={null} value={b} />)}
        </div>
        <div className="ProductPartDescription"><p>{hugeText(description, 115)}</p></div>
        <div className="ProductPartPriceAndServer">
          <Price value={price} />
          <ServerLabel value={serverType} onClick={null} />
        </div>
      </Col>
    </Row>
  )
}