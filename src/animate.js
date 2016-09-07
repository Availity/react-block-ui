import raf from 'raf';

export default (render, duration, easing) => {
  const start = Date.now();
  let handle;

  const loop = () => {
    var percent = (Date.now()-start)/duration;
    if (percent >= 1) {
      render(1);
    }
    else {
      handle = raf(loop);
      render(easing(percent));
    }
  };

  handle = raf(loop);

  return () => raf.cancel(handle);
};
