import React from 'react';

function Cell(props) {
	// First row is for the table header,
	if(props.rowIndex === 0) {
		return null;
	}

	const rowIndex = props.rowIndex - 1; // - 1 otherwise first row missed by header.

	const column = props.data.columns[props.columnIndex];
	const rowData = props.data.data[rowIndex - (props.data.startIndex ? props.data.startIndex : 0)];
	const cellData = rowData && rowData[column.name] !== null ?  rowData[column.name] : '';

	// Conditional formatting applying to the whole row.
	const rowStyles = {};
	const rowFormatCondition = props.data.formatConditions.find((formatCondition) => formatCondition.applyToRow && formatCondition.meetsCondition(rowData));
	if(rowFormatCondition) {
		rowStyles.color = rowFormatCondition.color;
		rowStyles.background = rowFormatCondition.background;		
	}

	// Conditional formatting applying to individual cells.
	const cellStyles = {};
	if(!rowFormatCondition) {
		const cellFormatCondition = props.data.formatConditions.find((formatCondition) => {
			return formatCondition.conditions.find((condition) => condition.column.name === column.name) && formatCondition.meetsCondition(rowData);
		});
		if(cellFormatCondition) {
			cellStyles.color = cellFormatCondition.color;
			cellStyles.background = cellFormatCondition.background;
		}		
	}

	return (
		<div 
			style={props.style} 
			className={`table-data-cell ${(rowIndex % 2 === 0 ? 'odd' : 'even')} ${(props.data.isSelected(props.columnIndex, rowIndex) ? 'selected' : 'un-selected')}`} 
			onClick={(event) => props.data.onClick(props.columnIndex, rowIndex, rowData, event, props.data.columns)}
		>
			<div className='row-selection' style={rowStyles}>
				<div style={cellStyles} className='cell-selection'>
					<div className='cell-content'>
						{column.type === "ColumnType.COLUMN_GROUP" 
							? column.columnGroupRules.map((columnGroupRule, index) => {
								return <span
										onClick={(event) => {
											event.stopPropagation();
											props.data.onClick(props.columnIndex, rowIndex, rowData, event, props.data.columns, columnGroupRule.colPosition)
										}}
										key={index} 
										className='cell-content'
										style={ {
											width:`${100 / column.numColumns()}%`, 
											position:'absolute', 
											height:'100%', 
											left:`${columnGroupRule.colPosition * (100 / column.numColumns())}%` } }
									>
										{columnGroupRule.data(rowData)}
									</span>
							})	
							: column.converter ? column.converter.convert(cellData) : cellData}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cell;