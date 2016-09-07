export const registered = [];

export const register = (fn) => {
  if(registered.indexOf(fn) < 0) {
    registered.push(fn);
  }
};

export const unregister = (fn) => {
  const index = registered.indexOf(fn);
  if(index > -1) {
    registered.splice(index, 1);
  }
};

export default store => next => action => {
  registered.forEach(cb => {
    if (typeof cb === 'function') {
      cb(action);
    }
  });

  return next(action);
}
