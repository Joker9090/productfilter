import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FilterObject } from "../redux/reducers/main"

export const ProductFilter = ({ filterObject, filterProducts }: { filterObject: FilterObject, filterProducts: Function }) => {
  return (
    <div className="ProductFilter">
      <Container fluid={false} >
        <Row>
          <Col>
            <input className="w-100" type="text" onChange={(event) => filterProducts({ ...filterObject, id: event.target.value })} />
          </Col>
          <Col>
            <input className="w-100" type="text" onChange={(event) => filterProducts({ ...filterObject, category: event.target.value })} />
          </Col>
          <Col>
            <input className="w-100" type="text" onChange={(event) => filterProducts({ ...filterObject, subCategory: event.target.value })} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}