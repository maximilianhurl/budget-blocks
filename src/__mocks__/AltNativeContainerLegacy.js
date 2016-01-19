import React from 'react';

class AltNativeContainer extends React.Component {
    render() {
      return (<div> { this.props.children } </div>);
    }
}

module.exports = AltNativeContainer;
