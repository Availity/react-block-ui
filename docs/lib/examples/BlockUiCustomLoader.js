import React from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
import BlockUi from 'react-block-ui';
import { Loader, Types } from 'react-loaders';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggleBlocking = this.toggleBlocking.bind(this);
    this.setLoaderType = this.setLoaderType.bind(this);
    this.state = {
      blocking: false,
      loaderType: 'ball-triangle-path',
    };
  }

  toggleBlocking() {
    this.setState({blocking: !this.state.blocking});
  }

  setLoaderType(e) {
    this.setState({loaderType: e.target.value});
  }

  render() {
    return (
      <div>
        <BlockUi tag="div" blocking={this.state.blocking} loader={<Loader active type={this.state.loaderType} color="#02a17c"/>}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </BlockUi>
        <Row>
          <Col xs={12} sm={6}>
            <Input type="select" onChange={this.setLoaderType} value={this.state.loaderType}>
              {Object.keys(Types).map(type =>
                <option key={type} value={type}>{type}</option>
              )}
            </Input>
          </Col>
          <Col xs={12} sm={3}>
            <Button onClick={this.toggleBlocking} color="primary">Toggle Block</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
