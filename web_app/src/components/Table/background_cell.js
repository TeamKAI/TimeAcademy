import React from 'react';

function BackgroundCell(props) {
	return <div className={`table-data-cell background ${props.className}`} style={ {...props.style} }></div>;
}

export default BackgroundCell;