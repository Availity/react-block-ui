import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Loader from './Loader';

class BlockUi extends Component {
  static propTypes = {
    blocking: PropTypes.bool,
    children: PropTypes.node,
    renderChildren: PropTypes.bool,
    className: PropTypes.string,
    tag: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    tag: 'div',
    renderChildren: true,
  };

  render () {
    const {
      tag: Tag,
      blocking,
      className,
      children,
      renderChildren,
      ...attributes
    } = this.props;

    if (blocking) {
      const classes = classNames(
        'av-block-ui',
        className
      );

      return (
        <Tag {...attributes} className={classes}>
          {renderChildren && children}
          <div className="av-block-ui-container">
            <div className="av-block-ui-overlay"></div>
            <div className="av-block-ui-message-container">
              <div className="av-block-ui-message">
                <Loader />
              </div>
            </div>
          </div>
        </Tag>
      );
    }

    return (<Tag {...attributes} className={className}>{children}</Tag>);
  }
}

export default BlockUi;
