
function minFloat(value) {
  var floatValue = parseFloat(value);

  if (isNaN(floatValue)) {
    return 0;
  }

  return floatValue;
}

export default minFloat;
