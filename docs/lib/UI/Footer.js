import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default () => {
  return (
    <div className="footer">
      <Container fluid>
        <Row>
          <Col className="text-xs-center">
            <p className="social">
              &copy; 2016 Availity
              {' '}
              <iframe src="https://ghbtns.com/github-btn.html?user=availity&repo=react-block-ui&type=star&count=true" frameBorder="0" scrolling="0" width="100" height="20px"/>
              <iframe src="https://ghbtns.com/github-btn.html?user=availity&repo=react-block-ui&type=fork&count=true" frameBorder="0" scrolling="0" width="100" height="20px"/>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
