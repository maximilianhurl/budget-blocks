
function zeroOrNaN(value) {
  if (parseFloat(value) === 0 || isNaN(parseFloat(value))) {
    return true;
  }
  return false;
}

export default zeroOrNaN;
