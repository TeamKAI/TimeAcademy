/**
*
* Testcomponent
*
*/

import React, { Component } from "react";

import PropTypes from "prop-types";

const style = { color: "#bd10e0" };

class Testcomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exampleValue: ""
    };
  }

  render() {
    const { exampleValue } = this.state; // eslint-disable-line
    const { exampleProp } = this.props; // eslint-disable-line
    return <span style={style} />;
  }
}

Testcomponent.propTypes = {
  exampleProp: PropTypes.string
};
Testcomponent.defaultProps = {
  exampleProp: ""
};

export default Testcomponent;
