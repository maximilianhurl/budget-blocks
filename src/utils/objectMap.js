import 'babel-polyfill';

//takes a dictionary and returns an array

function* interee(obj) {
  for (let key of Object.keys(obj)) {
    yield {
      'key': key,
      'obj': obj[key]
    };
  }
}

function objectMap(obj) {
  // turn interator into an array
  return [...interee(obj)];
}

export default objectMap;
