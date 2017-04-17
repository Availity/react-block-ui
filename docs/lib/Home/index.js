import React from 'react';
import { PrismCode } from 'react-prism';
import { Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router';
import Example from '../examples/import-basic';

const importBasic = require('!!raw!../examples/import-basic.js');

export default () => {
  return (
    <div>
      <section className="jumbotron text-center mb-3">
        <Container fluid>
          <Row>
            <Col>
              <p className="lead">
                <img src="assets/logo.png" alt="" width="150px" />
              </p>
              <h1 className="jumbotron-heading display-4">React Block UI</h1>
              <p className="lead">
                Easy way to block the user from interacting with your UI.
              </p>
              <p>
                <Button outline color="danger" href="https://github.com/availity/react-block-ui">View on Github</Button>
                <Button color="danger" tag={Link} to="/components/">View Components</Button>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <Container fluid>
        <Row>
          <Col sm={{ size: 8, offset: 2 }}>
            <h2>Installation</h2>
            <hr/>
            <h3>NPM</h3>
            <p>Install reactstrap and peer dependencies via NPM</p>
            <pre>
              <PrismCode className="language-bash">npm install --save react-block-ui react react-dom</PrismCode>
            </pre>
            <p>ES6 - import the components you need</p>
            <div className="docs-example">
              <Example/>
            </div>
            <pre>
              <PrismCode className="language-jsx">
                {importBasic}
              </PrismCode>
            </pre>
            {/*<h3>CDN</h3>
            <pre>
              <PrismCode className="language-jsx">
                https://unpkg.com/react-block-ui/dist/ReactBlockUi.min.js
              </PrismCode>
            </pre>
            <p>Check out the demo <a href="http://output.jsbin.com/dimive/latest">here</a></p>*/}
            <h2 className="mt-3">About the Project</h2>
            <hr/>
            <p>This library contains easy to use components to prevent the user from interacting with the user interface based on some conditions.</p>
            <p>There is also a separate component which works with redux to help block and unblock automatically based on redux action types. See the <Link to="/components/ReduxBlockUi/">ReduxBlockUi</Link> component for more details.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
