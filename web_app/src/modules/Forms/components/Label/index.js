import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Label extends PureComponent { // eslint-disable-line react/prefer-stateless-function

    render() {
        const { style } = this.props;
        return (
            <label style={{ ...style }}>
                {this.props.children}
            </label>
        );
    }
}

Label.propTypes = {
    style: PropTypes.object,
};
Label.defaultProps = {
    style: {},
};

export default Label;
