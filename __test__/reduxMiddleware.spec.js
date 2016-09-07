import middleware, { register, unregister, registered } from '../src/reduxMiddleware';

describe('reduxMiddleware', function () {
  beforeEach(() => {
    registered.splice(0, registered.length);
  });
  describe('the middleware', () => {
    it('should return a function', () => {
      expect(middleware()).to.be.a('function');
    });

    describe('the returned function', () => {
      it('should return a function', () => {
        expect(middleware()()).to.be.a('function');
      });

      describe('the returned function', () => {
        it('should return the result of the next action', () => {
          const store = {};
          const returnValue = {};
          const next = sinon.stub().returns(returnValue);
          const action = {};
          const result = middleware(store)(next)(action);
          expect(next).to.have.been.calledWith(action);
          expect(result).to.equal(returnValue);
        });

        it('should call all of the registered callbacks with action', () => {
          registered.push(sinon.spy(), sinon.spy(), sinon.spy());
          const store = {};
          const next = () => {};
          const action = {};
          middleware(store)(next)(action);
          expect(registered.pop()).to.have.been.calledWith(action);
          expect(registered.pop()).to.have.been.calledWith(action);
          expect(registered.pop()).to.have.been.calledWith(action);
        });

        it('should not throw is the registered callback is not a function', () => {
          registered.push([]);
          const store = {};
          const next = () => {};
          const action = {};
          expect(middleware(store)(next).bind(middleware, action)).to.not.throw();
        });
      });
    });
  });

  describe('register', () => {
    it('should add the function to the registered array', () => {
      const fn = () => {};
      expect(registered).to.not.include(fn);
      register(fn);
      expect(registered).to.include(fn);
    });

    it('should not add the function to the registered array if it is already there', () => {
      const fn = () => {};
      expect(registered).to.not.include(fn);
      register(fn);
      expect(registered).to.include(fn).and.have.a.lengthOf(1);
      register(fn);
      expect(registered).to.include(fn).and.have.a.lengthOf(1);
    });
  });

  describe('unregister', () => {
    it('should remove the function to the registered array', () => {
      const fn = () => {};
      registered.push(fn);
      expect(registered).to.include(fn);
      unregister(fn);
      expect(registered).to.not.include(fn);
    });

    it('should not throw if the function does not exist in the array', () => {
      const fn = () => {};
      expect(registered).to.not.include(fn);
      expect(unregister.bind(unregister, fn)).to.not.throw();
      expect(registered).to.not.include(fn);
    });
  });
});
