import React from 'react';

function EmptyCell(props) {
	return <div className='table-data-cell' style={ {...props.style} }></div>;
}

export default EmptyCell;