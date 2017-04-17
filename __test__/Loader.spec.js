import React from 'react';
import { shallow, mount } from 'enzyme';
import { Loader } from 'react-block-ui';
const animate = require('../src/animate');

describe('Loader', function() {
  it('should render a "div"', () => {
    const wrapper = shallow(<Loader />);

    expect(wrapper.type()).to.equal('div');
  });

  it('should render with the class "av-laoding-indicator', () => {
    const wrapper = shallow(<Loader />);

    expect(wrapper.hasClass('av-loading-indicator')).to.be.true;
  });

  it('should have 3 bullets', () => {
    const wrapper = shallow(<Loader />);

    expect(wrapper.find('.av-loading-bullet')).to.have.a.lengthOf(3);
  });

  describe('mounting', () => {
    it('should start animating', () => {
      const spy = sinon.spy(Loader.prototype, 'addBullet');
      const wrapper = mount(<Loader />);
      expect(spy).to.have.been.calledWith(0);
      wrapper.unmount();
      spy.restore();
    });
  });

  describe('unmounting', () => {
    beforeEach(() => {
      this.wrapper = mount(<Loader />);
      this.instance = this.wrapper.instance();
    });

    it('should clear any current timeouts', () => {
      const spy = sinon.spy(this.instance, 'clearTimeout');
      this.wrapper.unmount();

      expect(spy).to.have.been.calledOnce;
    });

    it('should cancel any remaining enter animations', () => {
      this.instance.cancelEnter = sinon.spy();
      this.wrapper.unmount();

      expect(this.instance.cancelEnter).to.have.been.calledOnce;
    });

    it('should cancel any remaining leave animations', () => {
      this.instance.cancelLeave = sinon.spy();
      this.wrapper.unmount();

      expect(this.instance.cancelLeave).to.have.been.calledOnce;
    });
  });

  describe('add bullet', () => {
    beforeEach(() => {
      this.clock = sinon.useFakeTimers();
      this.wrapper = mount(<Loader />);
      this.instance = this.wrapper.instance();
      this.instance.bullets = [
        {style: {}},
        {style: {}},
        {style: {}},
      ];
    });

    afterEach(() =>{
      this.clock.restore();
      this.wrapper.unmount();
    });

    it('should clear any current timeouts', () => {
      const spy = sinon.spy(this.instance, 'clearTimeout');
      this.instance.addBullet();

      expect(spy).to.have.been.calledOnce;
    });

    it('should queue a bullet animation', () => {
      this.instance.addBullet();

      expect(this.instance.timeout).to.exist;
    });

    it('should call add bullet when there is 1 bullet', () => {
      this.instance.addBullet(0);
      const spy = sinon.spy(this.instance, 'addBullet');
      this.clock.tick(250);
      expect(spy).to.have.been.calledOnce;
    });

    it('should call add bullet when there are 2 bullets', () => {
      this.instance.addBullet(1);
      const spy = sinon.spy(this.instance, 'addBullet');
      this.clock.tick(250);
      expect(spy).to.have.been.calledOnce;
    });

    it('should call add bullet when there are 3 bullets', () => {
      this.instance.addBullet(2);
      const addSpy = sinon.spy(this.instance, 'addBullet');
      const removeSpy = sinon.spy(this.instance, 'removeBullets');
      this.clock.tick(250);
      expect(addSpy).to.not.have.been.calledOnce;
      expect(removeSpy).to.have.been.calledOnce;
    });
  });

  describe('enter animation', () => {
    beforeEach(() => {
      this.cancelSpy = sinon.spy();
      this.animate = sinon.stub(animate, 'default').callsFake(() => this.cancelSpy);
      this.clock = sinon.useFakeTimers();
      this.wrapper = mount(<Loader />);
      this.instance = this.wrapper.instance();
      this.instance.bullets = [
        {style: {}},
        {style: {}},
        {style: {}},
      ];
    });

    afterEach(() =>{
      this.animate.restore();
      this.clock.restore();
      this.wrapper.unmount();
    });

    it('should change the opacity from 0 to 1', () => {
      this.instance.addBullet(0);
      this.clock.tick(250);
      const render = this.animate.args[0][0];
      render(0);
      expect(this.instance.bullets[0].style.opacity).to.equal(0);
      render(1);
      expect(this.instance.bullets[0].style.opacity).to.equal(1);
    });

    it('should change the translateX transform from 20 to 0', () => {
      this.instance.addBullet(0);
      this.clock.tick(250);
      const render = this.animate.args[0][0];
      render(0);
      expect(this.instance.bullets[0].style.transform).to.contain('translateX(20px)');
      render(1);
      expect(this.instance.bullets[0].style.transform).to.contain('translateX(0px)');
    });
  });

  describe('leave animation', () => {
    beforeEach(() => {
      this.cancelSpy = sinon.spy();
      this.animate = sinon.stub(animate, 'default').callsFake(() => this.cancelSpy);
      this.clock = sinon.useFakeTimers();
      this.wrapper = mount(<Loader />);
      this.instance = this.wrapper.instance();
      this.instance.bullets = [
        {style: {}},
        {style: {}},
        {style: {}},
      ];
    });

    afterEach(() =>{
      this.animate.restore();
      this.clock.restore();
      this.wrapper.unmount();
    });

    it('should change the opacity from 1 to 0', () => {
      this.instance.removeBullets();
      this.clock.tick(1800);
      const render = this.animate.args[0][0];
      render(0);
      expect(this.instance.bullets[0].style.opacity).to.equal(1);
      expect(this.instance.bullets[1].style.opacity).to.equal(1);
      expect(this.instance.bullets[2].style.opacity).to.equal(1);
      render(1);
      expect(this.instance.bullets[0].style.opacity).to.equal(0);
      expect(this.instance.bullets[1].style.opacity).to.equal(0);
      expect(this.instance.bullets[2].style.opacity).to.equal(0);
    });
  });
});
