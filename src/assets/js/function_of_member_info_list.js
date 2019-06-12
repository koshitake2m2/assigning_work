export const arrayShuffle = function(original_array) {
  let array = original_array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const compareValues = function(key, order = "asc") {
  return function(a, b) {
    const varA = !a.hasOwnProperty(key) ? 0 : a[key];
    const varB = !b.hasOwnProperty(key) ? 0 : b[key];
    const comparison = varA > varB ? 1 : varA < varB ? -1 : 0;
    return order == "desc" ? comparison * -1 : comparison;
  };
};

export const compareDeepValues = function(key, deep_key, order = "asc") {
  return function(a, b) {
    const varA = !a.hasOwnProperty(key) ?
      0 :
      !a[key].hasOwnProperty(deep_key) ?
      0 :
      a[key][deep_key];
    const varB = !b.hasOwnProperty(key) ?
      0 :
      !b[key].hasOwnProperty(deep_key) ?
      0 :
      b[key][deep_key];
    const comparison = varA > varB ? 1 : varA < varB ? -1 : 0;
    return order == "desc" ? comparison * -1 : comparison;
  };
};