import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const ProductListShimer = () => {
  return (
    <div className="ProductListShimer">
      <Container>
        <Row>
          <Col xs={12}>
            <ShimerBox />
            <ShimerBox />
            <ShimerBox />
            <ShimerBox />
            <ShimerBox />
            <ShimerBox />
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