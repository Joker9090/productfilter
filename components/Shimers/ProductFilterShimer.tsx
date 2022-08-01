import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const ProductFilterShimer = () => {
  return (
    <div className="ProductFilterShimer">
      <Container fluid={false} >
        <Row>
          <Col>
            <ShimerBox />
          </Col>
          <Col>
            <ShimerBox />
          </Col>
          <Col>
            <ShimerBox />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const ShimerBox = () => (
  <div className="ShimerBox" />
)