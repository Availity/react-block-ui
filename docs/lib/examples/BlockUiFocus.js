import React from 'react';
import { Button } from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggleBlocking = this.toggleBlocking.bind(this);
    this.state = {
      blocking: false,
    };
  }

  toggleBlocking() {
    if (!this.state.blocking) {
      this.unblockIn(3);
    }
    this.setState({blocking: !this.state.blocking});
  }

  unblockIn(seconds) {
    this.setState({countdown: seconds});
    if(!seconds) {
      this.setState({blocking: false});
    } else {
      setTimeout(() => this.unblockIn(--seconds), 1000)
    }
  }

  youClickedIt = () => {
    if (this.state.blocking) {
      window.alert('Please report an issue that blocking did not prevent you from clicking the button');
    } else {
      this.toggleBlocking();
    }
  };

  render() {
    return (
      <div>
        <BlockUi tag="div" blocking={this.state.blocking} className="my-2">
          <Button color="danger" onClick={this.youClickedIt}>
            {this.state.blocking
              ? `Auto-unblocking in ${this.state.countdown} seconds`
              : 'Just try to trigger me when blocking'}
          </Button><br />
          <Button color="danger" onClick={this.youClickedIt}>
            {this.state.blocking
              ? `Auto-unblocking in ${this.state.countdown} seconds`
              : 'Just try to trigger me when blocking'}
          </Button><br />
          <Button color="danger" onClick={this.youClickedIt}>
            {this.state.blocking
              ? `Auto-unblocking in ${this.state.countdown} seconds`
              : 'Just try to trigger me when blocking'}
          </Button>
        </BlockUi>
        <Button onClick={this.toggleBlocking} color="primary">Toggle Block</Button>
      </div>
    );
  }
}
