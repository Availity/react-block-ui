import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockUi from './BlockUi';
import { register, unregister } from './reduxMiddleware';

class ReduxBlockUi extends Component {
  constructor(props) {
    super(props);

    this.middleware = this.middleware.bind(this);

    this.blocking = 0;
    this.state = {
      blocking: 0,
    };
  }

  UNSAFE_componentWillMount() {
    register(this.middleware);
  }

  componentWillUnmount() {
    unregister(this.middleware);
  }

  middleware(action) {
    const { block, unblock } = this.props;

    this.checkAction(action, block);
    this.checkAction(action, unblock, false);
  }

  checkAction(action, check, block = true) {
    if (check) {
      if (!Array.isArray(check)) {
        check = [check];
      }

      check.forEach(value => {
        let result;
        if (typeof value === 'function') {
          result = value(action);
        } else if (value instanceof RegExp) {
          value.lastIndex = 0;
          result = value.test(action.type);
        } else {
          result = (value === action.type);
        }

        if (result === true) {
          const oldValue = this.blocking;

          if (block) {
            this.setState({ blocking: ++this.blocking });
          } else {
            if (this.blocking < 1) {
              this.blocking = 0;
            } else {
              --this.blocking;
            }
            this.setState({ blocking: this.blocking });
          }

          this.props.onChange && this.props.onChange(this.blocking, oldValue);
        }
      });
    }
  }

  render() {
    const {
      blocking,
      block: omit1,
      unblock: omit2,
      onChange: omit3,
      ...attributes
    } = this.props;

    return (<BlockUi {...attributes} blocking={blocking || (this.state.blocking > 0)} />);
  }
}

ReduxBlockUi.propTypes = {
  blocking: PropTypes.bool,
  block: PropTypes.oneOfType([
    PropTypes.instanceOf(RegExp),
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
  unblock: PropTypes.oneOfType([
    PropTypes.instanceOf(RegExp),
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
  onChange: PropTypes.func,
};

export default ReduxBlockUi;
