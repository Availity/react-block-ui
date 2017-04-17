import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockUi from './BlockUi';
import { register, unregister } from './reduxMiddleware';

class ReduxBlockUi extends Component {
  static propTypes = {
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

  constructor (props) {
    super(props);

    this.middleware = ::this.middleware;

    this.blocking = 0;
    this.state = {
      blocking: 0,
    };
  }

  middleware (action) {
    let {block, unblock} = this.props;

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
            this.setState({blocking: ++this.blocking});
          } else {
            if (this.blocking < 1) {
              this.blocking = 0;
            } else {
              --this.blocking;
            }
            this.setState({blocking: this.blocking});
          }

          this.props.onChange && this.props.onChange(this.blocking, oldValue);
        }
      })
    }
  }

  componentWillMount () {
    register(this.middleware);
  }

  componentWillUnmount () {
    unregister(this.middleware);
  }

  render () {
    const {
      blocking,
      block,
      unblock,
      onChange,
      ...attributes
    } = this.props;

    return (<BlockUi {...attributes} blocking={blocking || (this.state.blocking > 0)} />);
  }
}

export default ReduxBlockUi;
