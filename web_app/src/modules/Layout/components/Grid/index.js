import React, { PureComponent, Children} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Grid } from 'react-flexbox-grid';
import {checkForOnClick, onClickTrigger,onLoadTrigger} from "../../../helpers";


class GridContainer extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch)
    }

    render() {
        const { style, fluid, actions,dispatch } = this.props;
        return (
            <Grid fluid={fluid} style={style} onClick={checkForOnClick(actions,dispatch) ?
                () => onClickTrigger(actions,dispatch) : null}>
                {this.props.children}
            </Grid>
        );

    }
}

GridContainer.propTypes = {
    style: PropTypes.object,
    fluid: PropTypes.bool,
};
GridContainer.defaultProps = {
    fluid: true,
};
const mapStateToProps = function(state){
    return {
        store: state.reducer,
    }
}

export default connect (mapStateToProps, null) (GridContainer);

