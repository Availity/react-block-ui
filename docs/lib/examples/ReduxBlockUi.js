import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import ReduxBlockUi from 'react-block-ui/redux';
import 'react-block-ui/style.css';

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.onBlockingChangeHandler = this.onBlockingChangeHandler.bind(this);
    this.state = {
      blockers: 0,
    };
  }

  // this is just for show, but demonstrates how you can get the number of 'blockers' for a given ReduxBlockUi component
  onBlockingChangeHandler(newValue, oldValue) {
    this.setState({blockers: newValue});
  }

  render() {
    return (
      <div>
        <ReduxBlockUi tag="div" block="REQUEST_START" unblock={["REQUEST_SUCCESS", /fail/i]} onChange={this.onBlockingChangeHandler}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </ReduxBlockUi>

        {/* the rest is for the demo, to allow you to trigger redux actions and see the actions, this would usually be done by some API calls or something */}
        <Button color="primary" onClick={this.props.requestStart}>Request Start</Button>
        <Button color="success" onClick={this.props.requestSuccess}>Request Success</Button>
        <Button color="danger" onClick={this.props.requestFailure}>Request Failure</Button>
        <Button outline onClick={this.props.otherAction}>Other Action</Button>
        <p>Number of pending requests: {this.state.blockers}</p>
        <div style={{maxHeight: '125px', overflow: 'auto'}}>
          {this.props.actions.map((action, i) =>
            <div key={`action_${i}`}>{this.props.actions.length - i} {JSON.stringify(action)}</div>
          )}
        </div>
      </div>
    );
  }
}

Example.propTypes = {
  requestStart: PropTypes.func,
  requestSuccess: PropTypes.func,
  requestFailure: PropTypes.func,
  otherAction: PropTypes.func,
  actions: PropTypes.array,
};

const forExampleOnly = type => () => ({ type });

export default connect(state => state, {
  requestStart: forExampleOnly('REQUEST_START'),
  requestSuccess: forExampleOnly('REQUEST_SUCCESS'),
  requestFailure: forExampleOnly('REQUEST_FAILURE'),
  otherAction: forExampleOnly('SOMETHING_ELSE'),
})(Example);
