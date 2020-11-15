import React from 'react';

import Cell from './cell.js'
import Select from '../../widgets/select.js';
import BackgroundCell from './background_cell.js';

function AlertCaseCell(props) {
	// First row is for the table header,
	if(props.rowIndex === 0) {
		return null;
	}

	const priorities = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];

	const rowIndex = props.rowIndex - 1; // - 1 otherwise first row missed by header.

	const column = props.data.columns[props.columnIndex];
	const rowData = props.data.data[rowIndex - props.data.startIndex];

	if(!rowData) {
		return <EmptyCell />
	}

	if(props.columnIndex === props.data.dragIndex) {
		return <BackgroundCell style={props.style} />
	}

	const cellData = rowData && rowData[column.name] ?  rowData[column.name] : '';
	const alertId = props.alert ? rowData['alert_id'] : rowData['case_id'];

	function color(value, container) {
		const index = container.indexOf(value);
		return index > -1 ? percentageToHsl((index * 20) / 100, 0, 120) : 'default';
	}

	function percentageToHsl(percentage, hue0, hue1) {
		var hue = ((100 - percentage) * (hue1 - hue0)) + hue0;
		return 'hsl(' + hue.toString() + ', 100%, 50%)';	
	}

	if(column.name === 'alert_status' || column.name === 'case_status') {
		const statuses = props.policies.flatternPolicyValues('AlertStatuses');
		return (
			<SelectCell
				background={color(cellData, statuses)}
				color={'black'}
				style={props.style} 
				data={statuses.map(val => ({ value: val, text: val}))}
				value={cellData} 
				onChange={(value) => props.onStatusUpdate(value, alertId)}
			/>);
	} else 	if(column.name === 'alert_priority' || column.name === 'case_priority') {
		return (
			<SelectCell
				background={color(cellData, priorities)}
				color={'black'}
				style={props.style}
				data={priorities.map(val => ({ value: val, text: val}))} 
				value={cellData} 
				onChange={(value) => props.onPriorityUpdate(value, alertId)}
			/>);
	} else if(column.name === 'alert_classification' || column.name === 'case_classification') {
		const classifications = props.policies.flatternPolicyValues('AlertClassifications');
		return (
			<SelectCell
				background={color(cellData, classifications)}
				color={'black'}
				style={props.style}
				data={classifications.map(val => ({ value: val, text: val}))}
				value={cellData}
				onChange={(value) => props.onClassificationUpdate(value, alertId)}
			/>);
	} else if(column.name === 'alert_assign_group' || column.name === 'case_assign_group') {
		return (
			<SelectCell 
				style={props.style} 
				data={props.groups.map(group => ({ value: group.name, text: group.name}))}
				value={cellData} 
				onChange={(value) => props.onAssignGroupUpdate(value, alertId)}
			/>);
	} else if(column.name === 'assignee' || column.name === 'case_assignee_name') {
		return (
			<SelectCell 
				style={props.style} 
				data={props.users.map(user => ({ value: user.user_id, text: user.username}))}
				value={props.alert ? rowData['alert_assignee'] : rowData['case_assignee']}
				onChange={(value) => props.onAssigneeUpdate(parseInt(value), alertId)}
			/>);		
	} else if(column.name === 'view_alert') {
		return (
			<div className='table-data-cell' style={ {...props.style} }>
				<button onClick={() => props.viewAlert(rowData)}>View Alert</button>
			</div>
		);
	}

	return Cell(props);
}

function EmptyCell(props) {
	return <div className='table-data-cell' style={ {...props.style} }></div>;
}

function SelectCell(props) {
	return (
		<div className='table-data-cell' style={ {...props.style} }>
			<Select
				style={ {background:props.background, color:props.color} }
				options={props.data}
				value={props.value}
				handleChange={props.onChange}
			/>
		</div>
	);
}

export default AlertCaseCell;