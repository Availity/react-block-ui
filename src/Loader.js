import React, { Component } from 'react';
import bezierEasing from 'bezier-easing';
import animate from './animate';

const easeIn = bezierEasing(0, 0.3, 0.45, 1);

const enter = (el) => {
  const render = (percent) => {
    el.style.opacity = percent;
    el.style.transform = `translateX(${20 - 20 * percent}px) translateZ(0)`;
  };

  return animate(render, 750, easeIn);
};
const leave = (bullets) => {
  const render = (percent) => {
    bullets.forEach(el => {
      el.style.opacity = 1 - percent;
    });
  };

  return animate(render, 500, easeIn);
};

class Loader extends Component {
  bullets = [];

  componentDidMount(){
    this.addBullet(0);
  }

  removeBullets() {
    this.clearTimeout();
    this.timeout = setTimeout(() => {
      this.cancelLeave = leave(this.bullets);
      this.addBullet(0, 950);
    }, 1800)
  }

  addBullet(bullet, delay = 250) {
    this.clearTimeout();
    this.timeout = setTimeout(() => {
      this.cancelEnter = enter(this.bullets[bullet]);
      if(bullet < 2) {
        this.addBullet(++bullet);
      } else {
        this.removeBullets();
      }
    }, delay)
  }

  clearTimeout() {
    this.timeout && clearTimeout(this.timeout);
  }

  componentWillUnmount() {
    this.clearTimeout();
    this.cancelEnter && this.cancelEnter();
    this.cancelLeave && this.cancelLeave();
  }

  render () {
    return (
      <div className="av-loading-indicator">
        <span ref={(c) => this.bullets[0] = c} className="av-loading-bullet">&bull;</span>{' '}
        <span ref={(c) => this.bullets[1] = c} className="av-loading-bullet">&bull;</span>{' '}
        <span ref={(c) => this.bullets[2] = c} className="av-loading-bullet">&bull;</span>
      </div>
    );
  }
}

export default Loader;
