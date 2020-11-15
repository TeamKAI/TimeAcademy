import React from 'react';
import { select as d3Select } from 'd3-selection';
import * as d3 from 'd3';

class BarChart extends React.Component {
	componentDidMount() {
		this.renderPlot();
	}

	componentDidUpdate(prevProps, prevState) {
		this.renderPlot();
	}

	renderPlot() {
		// Get props.
		const xScale = this.props.xScale;
		const yScale = this.props.yScale;
		const xAccessor = this.props.xAccessor;
		const yAccessor = this.props.yAccessor;
		const height = this.props.height;
		const width = this.props.width;
		const data = this.props.data;
		const fill = this.props.fill;

		// Bind to dom.
		const barElements = d3Select(this.barElement)
			.selectAll(".bar")
			.data(data, d => d[xAccessor]);

		if(xScale.type === 'ordinal') {
			barElements.join(
				enter =>
					enter
						.append("rect")
						.attr("class", "bar")
						.attr("x", function(d) { return xScale(d[xAccessor]); })
						.attr("width", xScale.bandwidth())
						.attr("y", function(d) { return yScale(d[yAccessor]); })
						.attr("fill", fill)
						.attr("height", function(d) { return Math.max(height - yScale(d[yAccessor]), 0); }),
				update =>
					update
						.attr("class", "bar")
						.attr("x", function(d) { return xScale(d[xAccessor]); })
						.attr("width", xScale.bandwidth())
						.attr("y", function(d) { return yScale(d[yAccessor]); })
						.attr("fill", fill)
						.attr("height", function(d) { return Math.max(height - yScale(d[yAccessor]), 0); }),
				exit => 
					exit
						.remove()
			);
		} else {
			barElements.join(
				enter =>
					enter
						.append("rect")
						.attr("class", "bar")
						.attr("x", function (d) { return (xScale(d[xAccessor]) - width / data.length / 2) + 1; })
						.attr("width", (width / data.length) - 1)
						.attr("y", function(d) { return yScale(d[yAccessor]); })
						.attr("fill", fill)
						.attr("height", function(d) { return Math.max(height - yScale(d[yAccessor]), 0); }),
				update =>
					update
						.attr("class", "bar")
						.attr("x", function (d) { return (xScale(d[xAccessor]) - width / data.length / 2) + 1; })
						.attr("width", (width / data.length) - 1)
						.attr("y", function(d) { return yScale(d[yAccessor]); })
						.attr("fill", fill)
						.attr("height", function(d) { return Math.max(height - yScale(d[yAccessor]), 0); }),
				exit => 
					exit
						.remove()
			);			
		}
	}	

	render() {
		return (
			<g
				className='bar'
				ref={(el) => { this.barElement = el; }}
			/>
		);	
	}
}

export default BarChart;