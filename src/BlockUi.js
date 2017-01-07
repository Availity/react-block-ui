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

    const classes = blocking ? classNames('av-block-ui', className) : className;
    const renderChilds = !blocking || renderChildren;

    return (
      <Tag {...attributes} className={classes}>
        {renderChilds && children}
        {blocking &&
        <div className="av-block-ui-container">
          <div className="av-block-ui-overlay"></div>
          <div className="av-block-ui-message-container">
            <div className="av-block-ui-message">
              {React.isValidElement(Loader) ? Loader : <Loader />}
            </div>
          </div>
        </div>
        }
      </Tag>
    );
  }
}

export default BlockUi;
