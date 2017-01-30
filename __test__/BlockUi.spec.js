import React from 'react';
import { shallow, mount } from 'enzyme';
import BlockUi, { Loader } from 'react-block-ui';

const tab = {key: 'Tab', shiftKey: false};
const shiftTab = {keyCode: 9, shiftKey: true};

describe('BlockUi', function() {
  describe('not blocking', () => {
    it('should render a "div" by default', () => {
      const wrapper = shallow(<BlockUi>Yo!</BlockUi>);

      expect(wrapper.type()).to.equal('div');
    });

    it('should render children', () => {
      const wrapper = shallow(<BlockUi>Yo!</BlockUi>);

      expect(wrapper.text()).to.equal('Yo!');
    });

    it('should render with the props passed in', () => {
      const wrapper = shallow(<BlockUi style={{textAlign: 'center'}}>Yo!</BlockUi>);

      expect(wrapper.prop('style').textAlign).to.equal('center');
    });

    it('should render just the className passed in', () => {
      const wrapper = shallow(<BlockUi className="myClass">Yo!</BlockUi>);

      expect(wrapper.prop('className')).to.equal('myClass');
    });

    it('should render a the tag provided', () => {
      const wrapper = shallow(<BlockUi tag="span">Yo!</BlockUi>);

      expect(wrapper.type()).to.equal('span');
    });

    describe('renderChildren is false', () => {
      it('should render children', () => {
        const wrapper = shallow(<BlockUi renderChildren={false}>Yo!</BlockUi>);

        expect(wrapper.text()).to.contain('Yo!');
      });
    });
  });

  describe('blocking', () => {
    it('should render a "div" by default', () => {
      const wrapper = shallow(<BlockUi blocking>Yo!</BlockUi>);

      expect(wrapper.type()).to.equal('div');
    });

    it('should render children between focus blockers', () => {
      const wrapper = shallow(<BlockUi blocking>Yo!</BlockUi>);

      expect(wrapper.childAt(0).prop('tabIndex')).to.equal('0');
      expect(wrapper.childAt(1).text()).to.equal('Yo!');
      expect(wrapper.childAt(2).prop('tabIndex')).to.equal('0');
    });

    it('should render with the props passed in', () => {
      const wrapper = shallow(<BlockUi blocking style={{textAlign: 'center'}}>Yo!</BlockUi>);

      expect(wrapper.prop('style').textAlign).to.equal('center');
    });

    it('should render the className "av-block-ui"', () => {
      const wrapper = shallow(<BlockUi blocking className="myClass">Yo!</BlockUi>);

      expect(wrapper.hasClass('av-block-ui')).to.be.true;
    });

    it('should render className passed in', () => {
      const wrapper = shallow(<BlockUi blocking className="myClass">Yo!</BlockUi>);

      expect(wrapper.hasClass('myClass')).to.be.true;
    });

    it('should render a the tag provided', () => {
      const wrapper = shallow(<BlockUi blocking tag="span">Yo!</BlockUi>);

      expect(wrapper.type()).to.equal('span');
    });

    it('should append "av-block-ui-container" div', () => {
      const container = shallow(<BlockUi blocking>Yo!</BlockUi>).childAt(2);

      expect(container.type()).to.equal('div');
      expect(container.hasClass('av-block-ui-container')).to.be.true;
    });

    it('should append "av-block-ui-overlay" div', () => {
      const overlay = shallow(<BlockUi blocking>Yo!</BlockUi>).childAt(2).childAt(0);

      expect(overlay.type()).to.equal('div');
      expect(overlay.hasClass('av-block-ui-overlay')).to.be.true;
    });

    it('should append "av-block-ui-message-container" div', () => {
      const container = shallow(<BlockUi blocking>Yo!</BlockUi>).childAt(2).childAt(1);

      expect(container.type()).to.equal('div');
      expect(container.hasClass('av-block-ui-message-container')).to.be.true;
    });

    it('should append "av-block-ui-message" div', () => {
      const message = shallow(<BlockUi blocking>Yo!</BlockUi>).childAt(2).childAt(1).childAt(0);

      expect(message.type()).to.equal('div');
      expect(message.hasClass('av-block-ui-message')).to.be.true;
    });

    describe('the loader', () => {
      it('should append the Loader', () => {
        const message = shallow(<BlockUi blocking>Yo!</BlockUi>).childAt(2).childAt(1).childAt(0).childAt(0);

        expect(message.type()).to.equal(Loader);
      });

      it('should append a custom Loader (element) if provided', () => {
        const message = shallow(<BlockUi blocking loader={<span/>}>Yo!</BlockUi>).childAt(2).childAt(1).childAt(0).childAt(0);

        expect(message.type()).to.equal('span');
      });

      it('should append a custom Loader (string) if provided', () => {
        const message = shallow(<BlockUi blocking loader="span">Yo!</BlockUi>).childAt(2).childAt(1).childAt(0).childAt(0);

        expect(message.type()).to.equal('span');
      });

      it('should append a custom Loader (component) if provided', () => {
        const message = shallow(<BlockUi blocking loader={Loader}>Yo!</BlockUi>).childAt(2).childAt(1).childAt(0).childAt(0);

        expect(message.type()).to.equal(Loader);
      });
    });

    describe('renderChildren is false', () => {
      it('should not render children', () => {
        const wrapper = shallow(<BlockUi blocking renderChildren={false}>Yo!</BlockUi>);

        expect(wrapper.text()).to.not.contain('Yo!');
      });
    });

    describe('tabbing', () => {
      describe('top blocker', () => {
        describe('tab down', () => {
          it('should do nothing with shift; letting the browser handle it', () => {
            const wrapper = shallow(<BlockUi blocking><p>Yo</p></BlockUi>);
            const instance = wrapper.instance();

            instance.blocker = {
              focus: sinon.spy().named('focus'),
            };
            const spy = sinon.spy().named('preventDefault');
            wrapper.childAt(0).simulate('keyDown', {...shiftTab, preventDefault: spy});
            expect(instance.blocker.focus).to.not.have.been.called;
            expect(spy).to.not.have.been.called;
          });

          it('should focus on the bottom blocker without shift', () => {
            const wrapper = shallow(<BlockUi blocking><p>Yo</p></BlockUi>);
            const instance = wrapper.instance();
            instance.blocker = {
              focus: sinon.spy().named('focus'),
            };
            const spy = sinon.spy().named('preventDefault');
            wrapper.childAt(0).simulate('keyDown', {...tab, preventDefault: spy});
            expect(instance.blocker.focus).to.have.been.called;
            expect(spy).to.have.been.called;
          });
        });

        describe('tab up', () => {
          it('should do nothing with shift; letting the browser handle it', () => {
            const wrapper = shallow(<BlockUi blocking><p>Yo</p></BlockUi>);
            const instance = wrapper.instance();

            instance.blocker = {
              focus: sinon.spy().named('focus'),
            };
            const spy = sinon.spy().named('preventDefault');
            wrapper.childAt(0).simulate('keyUp', {...shiftTab, preventDefault: spy});
            expect(instance.blocker.focus).to.not.have.been.called;
            expect(spy).to.not.have.been.called;
          });

          it('should focus on the bottom blocker without shift', () => {
            const wrapper = shallow(<BlockUi blocking><p>Yo</p></BlockUi>);
            const instance = wrapper.instance();
            instance.blocker = {
              focus: sinon.spy().named('focus'),
            };
            const spy = sinon.spy().named('preventDefault');
            wrapper.childAt(0).simulate('keyUp', {...tab, preventDefault: spy});
            expect(instance.blocker.focus).to.have.been.called;
            expect(spy).to.not.have.been.called;
          });
        });
      });

      describe('bottom blocker', () => {
        describe('tab down', () => {
          it('should do nothing without shift; letting the browser handle it', () => {
            const wrapper = shallow(<BlockUi blocking><p>Yo</p></BlockUi>);
            const instance = wrapper.instance();

            instance.topFocus = {
              focus: sinon.spy().named('focus'),
            };
            const spy = sinon.spy().named('preventDefault');
            wrapper.childAt(2).simulate('keyDown', {...tab, preventDefault: spy});
            expect(instance.topFocus.focus).to.not.have.been.called;
            expect(spy).to.not.have.been.called;
          });

          it('should focus on the top focus blocker with shift', () => {
            const wrapper = shallow(<BlockUi blocking><p>Yo</p></BlockUi>);
            const instance = wrapper.instance();
            instance.topFocus = {
              focus: sinon.spy().named('focus'),
            };
            const spy = sinon.spy().named('preventDefault');
            wrapper.childAt(2).simulate('keyDown', {...shiftTab, preventDefault: spy});
            expect(instance.topFocus.focus).to.have.been.called;
            expect(spy).to.have.been.called;
          });
        });

        describe('tab up', () => {
          it('should do nothing without shift; letting the browser handle it', () => {
            const wrapper = shallow(<BlockUi blocking><p>Yo</p></BlockUi>);
            const instance = wrapper.instance();

            instance.topFocus = {
              focus: sinon.spy().named('focus'),
            };
            const spy = sinon.spy().named('preventDefault');
            wrapper.childAt(2).simulate('keyUp', {...tab, preventDefault: spy});
            expect(instance.topFocus.focus).to.not.have.been.called;
            expect(spy).to.not.have.been.called;
          });

          it('should focus on the top focus blocker with shift', () => {
            const wrapper = shallow(<BlockUi blocking><p>Yo</p></BlockUi>);
            const instance = wrapper.instance();
            instance.topFocus = {
              focus: sinon.spy().named('focus'),
            };
            const spy = sinon.spy().named('preventDefault');
            wrapper.childAt(2).simulate('keyUp', {...shiftTab, preventDefault: spy});
            expect(instance.topFocus.focus).to.have.been.called;
            expect(spy).to.not.have.been.called;
          });
        });
      });
    });
  });

  describe('not blocking to blocking', () => {
    describe('focused in blocking area', () => {
      it('should store the focused element and focus on the top focus', () => {
        const wrapper = shallow(<BlockUi blocking={false}><input /></BlockUi>);
        const instance = wrapper.instance();
        instance.wrapper = {contains: sinon.stub().returns(true)};
        wrapper.find('input').simulate('click');
        instance.componentWillReceiveProps({blocking: true});
        expect(instance.focused).to.equal(document.activeElement);
        expect(instance.wrapper.contains).to.have.been.called;
      });
    });
  });

  describe('blocking to not blocking', () => {
    describe('previously focused in blocking area', () => {
      it('should restore focus', () => {
        const wrapper = shallow(<BlockUi blocking><input /></BlockUi>);
        const instance = wrapper.instance();
        const spy = sinon.spy();
        instance.focused = {focus: spy};
        instance.componentWillReceiveProps({blocking: false});
        expect(spy).to.have.been.called;
      });
    });

    describe('not previously focused in blocking area', () => {
      it('should not throw', () => {
        const wrapper = shallow(<BlockUi blocking><input /></BlockUi>);
        const instance = wrapper.instance();
        const spy = sinon.spy();
        instance.focused = null;
        expect (instance.componentWillReceiveProps.bind(instance, {blocking: false})).to.not.throw;
      });
    });
  });
});
