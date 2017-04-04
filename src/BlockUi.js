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

  blockingTab (e, withShift = false) {
    return this.props.blocking && (e.key === 'Tab' || e.keyCode === 9) && e.shiftKey == withShift;
  }

  tabbedUpTop = e => {
    if (this.blockingTab(e)) {
      this.blocker.focus();
    }
  };

  tabbedDownTop = e => {
    if (this.blockingTab(e)) {
      e.preventDefault();
      this.blocker.focus();
    }
  };

  tabbedUpBottom = e => {
    if (this.blockingTab(e, true)) {
        this.topFocus.focus();
    }
  };

  tabbedDownBottom = e => {
    if (this.blockingTab(e, true)) {
      e.preventDefault();
      this.topFocus.focus();
    }
  };

  componentWillReceiveProps(nextProps){
    if (nextProps.blocking !== this.props.blocking){
      if (nextProps.blocking) {
        // blocking started
        if (this.helper && this.helper.parentNode && this.helper.parentNode.contains
          && this.helper.parentNode.contains(document.activeElement)) {
          this.focused = document.activeElement;
          // https://www.tjvantoll.com/2013/08/30/bugs-with-document-activeelement-in-internet-explorer/#blurring-the-body-switches-windows-in-ie9-and-ie10
          if(this.focused && this.focused !== document.body) {
            setImmediate(() => this.topFocus && this.topFocus.focus())
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
      <Tag {...attributes} className={classes} aria-busy={blocking}>
        {blocking &&
        <div tabIndex="0" onKeyUp={this.tabbedUpTop} onKeyDown={this.tabbedDownTop} ref={c => this.topFocus = c} />}
        {renderChilds && children}
        {blocking &&
        <div className="av-block-ui-container"
          tabIndex="0"
          ref={c => this.blocker = c}
          onKeyUp={this.tabbedUpBottom}
          onKeyDown={this.tabbedDownBottom}>
          <div className="av-block-ui-overlay"></div>
          <div className="av-block-ui-message-container">
            <div className="av-block-ui-message">
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

export default BlockUi;