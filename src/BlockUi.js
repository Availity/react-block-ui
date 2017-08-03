import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultLoader from './Loader';

const propTypes = {
  blocking: PropTypes.bool,
  children: PropTypes.node,
  renderChildren: PropTypes.bool,
  className: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
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

const defaultProps = {
  tag: 'div',
  renderChildren: true,
  loader: DefaultLoader,
};

class BlockUi extends Component {
  constructor(props) {
    super(props);

    this.tabbedUpTop = this.tabbedUpTop.bind(this);
    this.tabbedDownTop = this.tabbedDownTop.bind(this);
    this.tabbedUpBottom = this.tabbedUpBottom.bind(this);
    this.tabbedDownBottom = this.tabbedDownBottom.bind(this);
  }

  blockingTab(e, withShift = false) {
    return this.props.blocking && (e.key === 'Tab' || e.keyCode === 9) && e.shiftKey == withShift;
  }

  tabbedUpTop(e) {
    if (this.blockingTab(e)) {
      this.blocker.focus();
    }
  }

  tabbedDownTop(e) {
    if (this.blockingTab(e)) {
      e.preventDefault();
      this.blocker.focus();
    }
  }

  tabbedUpBottom(e) {
    if (this.blockingTab(e, true)) {
      this.topFocus.focus();
    }
  }

  tabbedDownBottom(e) {
    if (this.blockingTab(e, true)) {
      e.preventDefault();
      this.topFocus.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.blocking !== this.props.blocking) {
      if (nextProps.blocking) {
        // blocking started
        if (this.helper && this.helper.parentNode && this.helper.parentNode.contains
          && this.helper.parentNode.contains(document.activeElement)) {
          this.focused = document.activeElement;
          // https://www.tjvantoll.com/2013/08/30/bugs-with-document-activeelement-in-internet-explorer/#blurring-the-body-switches-windows-in-ie9-and-ie10
          if (this.focused && this.focused !== document.body) {
            setImmediate(() => this.topFocus && this.topFocus.focus());
          }
        }
      } else {
        const ae = document.activeElement;
        if (this.focused && (!ae || ae === document.body || ae === this.topFocus)) {
          this.focused.focus();
          this.focused = null;
        }
      }
    }
  }

  render() {
    const {
      tag: Tag,
      blocking,
      className,
      children,
      message,
      loader: Loader,
      renderChildren,
      ...attributes
    } = this.props;

    const classes = blocking ? `block-ui ${className}` : className;
    const renderChilds = !blocking || renderChildren;

    return (
      <Tag {...attributes} className={classes} aria-busy={blocking}>
        {blocking &&
        <div tabIndex="0" onKeyUp={this.tabbedUpTop} onKeyDown={this.tabbedDownTop} ref={c => this.topFocus = c} />}
        {renderChilds && children}
        {blocking &&
        <div className="block-ui-container"
          tabIndex="0"
          ref={c => this.blocker = c}
          onKeyUp={this.tabbedUpBottom}
          onKeyDown={this.tabbedDownBottom}
        >
          <div className="block-ui-overlay" />
          <div className="block-ui-message-container">
            <div className="block-ui-message">
              {message}
              {React.isValidElement(Loader) ? Loader : <Loader />}
            </div>
          </div>
        </div>
        }
        <span ref={c => this.helper = c} />
      </Tag>
    );
  }
}

BlockUi.propTypes = propTypes;
BlockUi.defaultProps = defaultProps;

export default BlockUi;