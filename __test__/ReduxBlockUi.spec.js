import React from 'react';
import { shallow } from 'enzyme';
import ReduxBlockUi from 'react-block-ui/redux';
import * as BlockUiMiddleware from '../src/reduxMiddleware';
import BlockUi from 'react-block-ui';

describe('ReduxBlockUi', function() {
  it('should render a "blockUi"', () => {
    const wrapper = shallow(<ReduxBlockUi>Yo!</ReduxBlockUi>);

    expect(wrapper.type()).to.equal(BlockUi);
  });

  it('should allow "manual" blocking', () => {
    const wrapper = shallow(<ReduxBlockUi blocking>Yo!</ReduxBlockUi>);

    expect(wrapper.prop('blocking')).to.be.true;
  });

  it('should trigger on change when the blocking amount changes', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<ReduxBlockUi block="fetch" onChange={spy}>Yo!</ReduxBlockUi>);
    const instance = wrapper.instance();
    instance.middleware({type: 'fetch'});
    expect(spy).to.have.been.calledWith(1, 0);
  });

  it('should not have a negative blocking value', () => {
    const wrapper = shallow(<ReduxBlockUi unblock="success">Yo!</ReduxBlockUi>);
    const instance = wrapper.instance();
    instance.blocking = 0;
    wrapper.setState({blocking: 0});
    instance.middleware({type: 'success'});
    expect(wrapper.state('blocking')).to.equal(0);
  });

  describe('mounting', () => {
    beforeEach(() => {
      this.register = sinon.spy(BlockUiMiddleware, 'register');
    });

    afterEach(() => {
      this.register.restore();
    });

    it('should register the instance in the middleware', () => {
      const wrapper = shallow(<ReduxBlockUi>Yo!</ReduxBlockUi>);
      const fn = wrapper.instance().middleware;
      expect(this.register).to.have.been.calledWith(fn);
    });
  });

  describe('unmounting', () => {
    beforeEach(() => {
      this.unregister = sinon.spy(BlockUiMiddleware, 'unregister');
    });

    afterEach(() => {
      this.unregister.restore();
    });

    it('should unregister the instance in the middleware', () => {
      const wrapper = shallow(<ReduxBlockUi>Yo!</ReduxBlockUi>);
      const fn = wrapper.instance().middleware;
      wrapper.unmount();
      expect(this.unregister).to.have.been.calledWith(fn);
    });
  });

  describe('block prop', () => {
    describe('with a string value', () => {
      it('should block when the value matches the action type', () => {
        const wrapper = shallow(<ReduxBlockUi block="fetch">Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.middleware({type: 'fetch'});
        expect(wrapper.state('blocking')).to.equal(1);
      });

      it('should not block when the value does not match the action type', () => {
        const wrapper = shallow(<ReduxBlockUi block="fetch">Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.middleware({type: 'no-fetch'});
        expect(wrapper.state('blocking')).to.equal(0);
      });
    });

    describe('with a RegExp value', () => {
      it('should block when the value matches the action type', () => {
        const wrapper = shallow(<ReduxBlockUi block={/fetch/}>Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.middleware({type: 'fetching'});
        expect(wrapper.state('blocking')).to.equal(1);
      });

      it('should not block when the value does not match the action type', () => {
        const wrapper = shallow(<ReduxBlockUi block={/fetch/}>Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.middleware({type: 'something-else'});
        expect(wrapper.state('blocking')).to.equal(0);
      });
    });

    describe('with a function value', () => {
      it('should block when the function returns true', () => {
        const wrapper = shallow(<ReduxBlockUi block={() => true}>Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.middleware({type: 'fetching'});
        expect(wrapper.state('blocking')).to.equal(1);
      });

      it('should not block when the function does not return true', () => {
        const wrapper = shallow(<ReduxBlockUi block={() => undefined}>Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.middleware({type: 'something-else'});
        expect(wrapper.state('blocking')).to.equal(0);
      });
    });

    describe('with an array value', () => {
      it('should block when any of the cases are match', () => {
        const wrapper = shallow(<ReduxBlockUi block={['something', /idk/, () => true]}>Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.middleware({type: 'fetching'});
        expect(wrapper.state('blocking')).to.equal(1);
      });

      it('should not block when none of the cases match', () => {
        const wrapper = shallow(<ReduxBlockUi block={['nothing', /fetch/, () => undefined]}>Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.middleware({type: 'something-else'});
        expect(wrapper.state('blocking')).to.equal(0);
      });
    });
  });

  describe('unblock prop', () => {
    describe('with a string value', () => {
      it('should unblock when the value matches the action type', () => {
        const wrapper = shallow(<ReduxBlockUi unblock="success">Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.blocking = 1;
        wrapper.setState({blocking: 1});
        instance.middleware({type: 'success'});
        expect(wrapper.state('blocking')).to.equal(0);
      });

      it('should not unblock when the value does not match the action type', () => {
        const wrapper = shallow(<ReduxBlockUi unblock="success">Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.blocking = 1;
        wrapper.setState({blocking: 1});
        instance.middleware({type: 'no-success'});
        expect(wrapper.state('blocking')).to.equal(1);
      });
    });

    describe('with a RegExp value', () => {
      it('should unblock when the value matches the action type', () => {
        const wrapper = shallow(<ReduxBlockUi unblock={/success/}>Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.blocking = 1;
        wrapper.setState({blocking: 1});
        instance.middleware({type: 'successful'});
        expect(wrapper.state('blocking')).to.equal(0);
      });

      it('should not unblock when the value does not match the action type', () => {
        const wrapper = shallow(<ReduxBlockUi unblock={/success/}>Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.blocking = 1;
        wrapper.setState({blocking: 1});
        instance.middleware({type: 'something-else'});
        expect(wrapper.state('blocking')).to.equal(1);
      });
    });

    describe('with a function value', () => {
      it('should unblock when the function returns true', () => {
        const wrapper = shallow(<ReduxBlockUi unblock={() => true}>Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.blocking = 1;
        wrapper.setState({blocking: 1});
        instance.middleware({type: 'successful'});
        expect(wrapper.state('blocking')).to.equal(0);
      });

      it('should not unblock when the function does not return true', () => {
        const wrapper = shallow(<ReduxBlockUi unblock={() => undefined}>Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.blocking = 1;
        wrapper.setState({blocking: 1});
        instance.middleware({type: 'something-else'});
        expect(wrapper.state('blocking')).to.equal(1);
      });
    });

    describe('with an array value', () => {
      it('should unblock when any of the cases are match', () => {
        const wrapper = shallow(<ReduxBlockUi unblock={['something', /idk/, () => true]}>Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.blocking = 1;
        wrapper.setState({blocking: 1});
        instance.middleware({type: 'successful'});
        expect(wrapper.state('blocking')).to.equal(0);
      });

      it('should not unblock when none of the cases match', () => {
        const wrapper = shallow(<ReduxBlockUi unblock={['nothing', /success/, () => undefined]}>Yo!</ReduxBlockUi>);
        const instance = wrapper.instance();
        instance.blocking = 1;
        wrapper.setState({blocking: 1});
        instance.middleware({type: 'something-else'});
        expect(wrapper.state('blocking')).to.equal(1);
      });
    });
  });
});
