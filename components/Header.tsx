import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Header = () => {
  return (
    <div className="Header">
      <Container fluid={true} >
        <Row>
          <Col xs={6} className="text-center m-auto">
            <h1>Product Filter</h1>
          </Col>
        </Row>
      </Container>
    </div>
  )
}