import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Header = ({ changeLayout }: { changeLayout: Function }) => {
  return (
    <div className="Header">
      <Container fluid={false}>
        <Row>
          <Col xs={6} className="text-left m-auto">
            <h1>Product Filter</h1>
          </Col>
          <Col xs={6} className="d-flex justify-content-end m-auto">
            <div className="LayoutChanger" onClick={() => changeLayout()}>
              <span className="customIcon icon-cog c-white" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}