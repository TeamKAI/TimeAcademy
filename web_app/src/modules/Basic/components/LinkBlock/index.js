/**
 *
 * LinkBlock
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {onLoadTrigger} from "../../../helpers";

const innerContainerStyle = {
    display: 'block',
    width: '100%',
    height: '100%',
};
class LinkBlock extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch)
    }
  render() {

      const { href, style } = this.props;
      return (
          <a href={href} style={style}>
            <div style={innerContainerStyle}>
                {this.props.children}
            </div>
          </a>
      );
  }
}

LinkBlock.propTypes = {
    href: PropTypes.string,
    style: PropTypes.object,
};

LinkBlock.defaultProps = {
    href: '#',
    style: {},
};

export default connect () (LinkBlock);
