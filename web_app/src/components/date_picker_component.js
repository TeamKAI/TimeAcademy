import React from 'react';
import { Field } from 'redux-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const renderDateTimePicker = ({ input: { onChange, value } }) => 
	<DatePicker
		onChange={onChange}
		selected={!value ? null : new Date(value)}
	/>

function DatePickerComponent(props) {
	return (
		<Field
			name={props.name}
			component={renderDateTimePicker}
		/>
	);
}

export default DatePickerComponent;