import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { getContent } from "../../../helpers";

class Image extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        let { style, children, src, store, className } = this.props;

        src = getContent(src, store);

        return (
            <img
                className={className}
                style={style}
                src={src}
            />
        );
    }
}

Image.propTypes = {
    style: PropTypes.object,
   
};
Image.defaultProps = {
    style: {},
   
};

const mapStateToProps = function(state){
    return {
        store: state.reducer,
    }
}

export default connect (mapStateToProps, null) (Image);