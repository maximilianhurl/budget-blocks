import React from 'react';

class Icon extends React.Component {
    render() {
      return (<div> { this.props.children } </div>);
    }
}

module.exports = Icon;
