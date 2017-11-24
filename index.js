exports.incremental = function(func) {
  let counter = 0;
  return function(...args) {
    return func(counter++, ...args);
  };
};

exports.unique = function(func) {
  const values = [];
  return function(...args) {

    let generated;
    let attempts = 0;
    do {
      generated = func(...args);
      if (++attempts >= 10) {
        throw new Error(`Could not generate unique value after ${attempts} attempts`);
      }
    } while (values.indexOf(generated) >= 0);

    values.push(generated);
    return generated;
  };
};
