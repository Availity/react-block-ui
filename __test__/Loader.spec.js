import React from 'react';
import { shallow } from 'enzyme';
import Loader from 'react-block-ui/Loader';

describe('Loader', function() {
  it('should render a "div"', () => {
    const wrapper = shallow(<Loader />);

    expect(wrapper.type()).to.equal('div');
  });

  it('should render with the class "loading-indicator', () => {
    const wrapper = shallow(<Loader />);

    expect(wrapper.hasClass('loading-indicator')).to.be.true;
  });

  it('should have 3 bullets', () => {
    const wrapper = shallow(<Loader />);

    expect(wrapper.find('.loading-bullet')).to.have.a.lengthOf(3);
  });
});
