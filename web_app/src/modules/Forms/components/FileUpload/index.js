import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {checkForOnClick, onClickTrigger, onLoadTrigger} from "../../../helpers";

class FileUpload extends PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.state = { file: '' };
        this.hiddenFileInput = React.createRef();
    }

    handleChange = (event) => {

        const { dispatch, actions } = this.props;
        const formData = new FormData();
        formData.append('uploadfile', event.target.files[0]);
        dispatch({
            type: "change_input",
            payload: {name: event.target.name, value: formData}
        });
        this.setState({ file: event.target.files[0] });

        // TODO - change to onChange trigger.
        if(checkForOnClick(actions, dispatch)) {
            onClickTrigger(actions, dispatch);
        }
    }

    render() {
        const { style, children, className } = this.props;

        if(children && React.Children.toArray(children).length > 0) {
            return (
                 <div className={className} onClick={() => this.hiddenFileInput.current.click()} style={style}>
                    {children}
                    <input
                        ref={this.hiddenFileInput}
                        style={{display:"none"}}
                        name={this.props.name} 
                        onChange={this.handleChange} 
                        type="file" 
                    />
                </div>
            );
        }

        return (
             <input
                ref={this.hiddenFileInput}
                name={this.props.name} 
                onChange={this.handleChange} 
                type="file" 
            />
        );
    }
}

FileUpload.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
};
FileUpload.defaultProps = {
    style: {},
    name: '',
};

export default connect () (FileUpload);