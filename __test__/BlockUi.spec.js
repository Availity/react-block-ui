import React from 'react';
import { shallow } from 'enzyme';
import BlockUi, { Loader } from 'react-block-ui';

describe('BlockUi', function() {
  describe('not blocking', () => {
    it('should render a "div" by default', () => {
      const wrapper = shallow(<BlockUi>Yo!</BlockUi>);

      expect(wrapper.type()).to.equal('div');
    });

    it('should render children', () => {
      const wrapper = shallow(<BlockUi>Yo!</BlockUi>);

      expect(wrapper.prop('children')[0]).to.equal('Yo!');
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

    it('should render children first by default', () => {
      const wrapper = shallow(<BlockUi blocking>Yo!</BlockUi>);

      expect(wrapper.childAt(0).text()).to.equal('Yo!');
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
      const container = shallow(<BlockUi blocking>Yo!</BlockUi>).childAt(1);

      expect(container.type()).to.equal('div');
      expect(container.hasClass('av-block-ui-container')).to.be.true;
    });

    it('should append "av-block-ui-overlay" div', () => {
      const overlay = shallow(<BlockUi blocking>Yo!</BlockUi>).childAt(1).childAt(0);

      expect(overlay.type()).to.equal('div');
      expect(overlay.hasClass('av-block-ui-overlay')).to.be.true;
    });

    it('should append "av-block-ui-message-container" div', () => {
      const container = shallow(<BlockUi blocking>Yo!</BlockUi>).childAt(1).childAt(1);

      expect(container.type()).to.equal('div');
      expect(container.hasClass('av-block-ui-message-container')).to.be.true;
    });

    it('should append "av-block-ui-message" div', () => {
      const message = shallow(<BlockUi blocking>Yo!</BlockUi>).childAt(1).childAt(1).childAt(0);

      expect(message.type()).to.equal('div');
      expect(message.hasClass('av-block-ui-message')).to.be.true;
    });

    describe('the loader', () => {
      it('should append the Loader', () => {
        const message = shallow(<BlockUi blocking>Yo!</BlockUi>).childAt(1).childAt(1).childAt(0).childAt(0);

        expect(message.type()).to.equal(Loader);
      });

      it('should append a custom Loader (element) if provided', () => {
        const message = shallow(<BlockUi blocking loader={<span/>}>Yo!</BlockUi>).childAt(1).childAt(1).childAt(0).childAt(0);

        expect(message.type()).to.equal('span');
      });

      it('should append a custom Loader (string) if provided', () => {
        const message = shallow(<BlockUi blocking loader="span">Yo!</BlockUi>).childAt(1).childAt(1).childAt(0).childAt(0);

        expect(message.type()).to.equal('span');
      });

      it('should append a custom Loader (component) if provided', () => {
        const message = shallow(<BlockUi blocking loader={Loader}>Yo!</BlockUi>).childAt(1).childAt(1).childAt(0).childAt(0);

        expect(message.type()).to.equal(Loader);
      });
    });

    describe('renderChildren is false', () => {
      it('should not render children', () => {
        const wrapper = shallow(<BlockUi blocking renderChildren={false}>Yo!</BlockUi>);

        expect(wrapper.text()).to.not.contain('Yo!');
      });
    });
  });
});
