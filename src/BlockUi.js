import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import DefaultLoader from './Loader';

class BlockUi extends Component {
  static propTypes = {
    blocking: PropTypes.bool,
    children: PropTypes.node,
    renderChildren: PropTypes.bool,
    className: PropTypes.string,
    loader: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    tag: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    tag: 'div',
    renderChildren: true,
    loader: DefaultLoader,
  };

  render () {
    const {
      tag: Tag,
      blocking,
      className,
      children,
      loader: Loader,
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
                {React.isValidElement(Loader) ? Loader : <Loader />}
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
