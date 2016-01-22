/*eslint no-unused-vars: 0 */

export function alert(title, message, buttons) {
  //mock to make sure tests dont blow up due to react native dynamic loading
  if (buttons && buttons.length) {
    buttons[0].onPress();
  }
}

module.exports = alert;
