import animate from '../src/animate';

describe('animate', function () {
  beforeEach(() => {
    this.clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    this.clock.restore();
    global.window.requestAnimationFrame.reset();
    global.window.cancelAnimationFrame.reset();
  });

  it('should return a function', () => {
    expect(animate(() => {}, 1)).to.be.a('function');
  });


  it('should return a function cancel the animation when the returned function is called', () => {
    animate(() => {}, 1)();
    expect(global.window.cancelAnimationFrame).to.have.been.calledOnce;
  });

  it('should set the loop to run', () => {
    animate(() => {}, 1);
    expect(global.window.requestAnimationFrame).to.have.been.calledOnce;
  });

  describe('animating', () => {
    it('should call render with the result of the easing function', () => {
      const result = .5;
      const easing = sinon.stub().returns(result);
      const render = sinon.spy();
      animate(render, 10, easing);
      global.window.requestAnimationFrame.args[0][0]();
      expect(easing).to.have.been.calledBefore(render);
      expect(render).to.have.been.calledWith(result);
    });

    it('should set the loop to run again', () => {
      animate(() => {}, 10, () => .5);
      expect(global.window.requestAnimationFrame).to.have.been.calledOnce;
      global.window.requestAnimationFrame.args[0][0]();
      expect(global.window.requestAnimationFrame).to.have.been.calledTwice;
    });

    it('should not set the loop to run again when the animation is done', () => {
      const result = .5;
      const easing = sinon.stub().returns(result);
      const render = sinon.spy();
      animate(render, 10, easing);
      this.clock.tick(10);
      expect(global.window.requestAnimationFrame).to.have.been.calledOnce;
      global.window.requestAnimationFrame.args[0][0]();
      expect(global.window.requestAnimationFrame).to.have.been.calledOnce;
    });
  });
});
