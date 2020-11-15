import React from 'react';
import * as d3 from 'd3';

function LineChart(props) {
	// Get props.
	const xScale = props.xScale;
	const yScale = props.yScale;
	const xAccessor = props.xAccessor;
	const yAccessor = props.yAccessor;

	console.log(props.data);

	// Build line function.
	var line = d3.line()
		.x(function(d) { return xScale(d[xAccessor]); })
		.y(function(d) { return yScale(d[yAccessor]); });

	var linePlot = line(props.data);

	// Plot.
	return (
		<path 
			className="line" 
			d={linePlot} 
			style={{fill:'none', strokeWidth:'1.5px', stroke:props.stroke}}
		/>
	);
}

export default LineChart;