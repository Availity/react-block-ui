import React from 'react';
import { Button } from 'reactstrap';
import { Loader } from 'react-block-ui';
import 'react-block-ui/style.css';

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Loader />
      </div>
    );
  }
}
