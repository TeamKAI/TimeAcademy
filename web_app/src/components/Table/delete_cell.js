import React from 'react';

import Cell from './cell.js'

function DeleteCell(props) {
	// First row is for the table header,
	if(props.rowIndex === 0) {
		return null;
	}

	const rowIndex = props.rowIndex - 1; // - 1 otherwise first row missed by header.

	const column = props.data.columns[props.columnIndex];
	const rowData = props.data.data[rowIndex - (props.data.startIndex ? props.data.startIndex : 0)];
	const cellData = rowData && rowData[column.name] ?  rowData[column.name] : '';

	if(column.name === 'delete') {
		return (
		<div 
			style={props.style} 
			className={`table-data-cell ${(rowIndex % 2 === 0 ? 'odd' : 'even')} ${(props.data.isSelected(props.columnIndex, rowIndex) ? 'selected' : 'un-selected')}`} 
			onClick={(event) => props.onDelete(props.columnIndex, rowIndex, rowData, event)}
		>
			<div className='row-selection'>
				<div className='cell-selection'>
					<div className='cell-content delete'>
						Delete
					</div>
				</div>
			</div>
		</div>
		);

	}

	return Cell(props);
}

export default DeleteCell;