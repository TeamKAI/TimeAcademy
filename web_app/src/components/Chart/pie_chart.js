import React from 'react';
import { select as d3Select } from 'd3-selection';
import * as d3 from 'd3';

class PieChart extends React.Component {
	componentDidMount() {
		this.renderPlot();
	}

	componentDidUpdate(prevProps, prevState) {
		this.renderPlot();
	}

	renderPlot() {
		// Get props.
		const yAccessor = this.props.yAccessor;
		const xAccessor = this.props.xAccessor;
		const margin = this.props.margin;
		const radius = Math.min(this.props.width - margin.left - margin.right, this.props.height - margin.bottom - margin.top) / 2;
		const data = this.props.data;
		const color = d3.scaleOrdinal()
			.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);


		// Define arc & pie functions.
		const arc = d3.arc()
			.outerRadius(radius - 10)
			.innerRadius(0);

		var pie = d3.pie()
			.sort(null)
			.value(function(d) { return d[yAccessor]; });

		// Bind to dom.
		const pieElements = d3Select(this.pieElement)
			.selectAll("path")
			.data(pie(data));

		pieElements.join(
			enter =>
				enter
					.append("path")
					.attr("d", arc)
					.style("fill", function(d) { return color(d.data[xAccessor]); }),
			update =>
				update
					.attr("d", arc)
					.style("fill", function(d) { return color(d.data[xAccessor]); }),
			exit => 
				exit
					.remove()
		);
	}

	render() {
		return (
			<g
				className='pie'
				ref={(el) => { this.pieElement = el; }}
				transform={`translate(${this.props.width / 2}, ${this.props.height / 2})`}
			/>
		);	
	}
}


export default PieChart;