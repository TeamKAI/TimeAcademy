import React from 'react';
import { select as d3Select } from 'd3-selection';
import * as d3 from 'd3';

class CandleStick extends React.Component {
	componentDidMount() {
		this.renderPlot();
	}

	componentDidUpdate(prevProps, prevState) {
		this.renderPlot();
	}
	
	renderPlot() {
		// Get props.
		const { 
			xScale, 
			yScale, 
			xAccessor, 
			openAccessor, 
			highAccessor, 
			lowAccessor, 
			closeAccessor,
			data,
			stroke
		} = this.props;

		const rectangleWidth = 5;

		console.log(openAccessor);
		console.log(closeAccessor);

		// Add g element for each data point.
		let bar = d3Select(this.ohlcElement)
			.selectAll("g")
			.data(data)
			.join("g")
				.attr("class", "bar");

		// Draw the vertical lines.
		var line = d3.line()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; });

		bar
			.selectAll(".high-low-line")
			.data(d => [d])
			.join("path")
				.attr("class", "high-low-line")
				.attr('d', function (d) {
					return line([
						{ x: xScale(d[xAccessor]), y: yScale(d[highAccessor]) },
						{ x: xScale(d[xAccessor]), y: yScale(d[lowAccessor]) }
					]);
				})
				.attr("stroke", stroke)
				.attr("stroke-width", "1.5px");

		var isUpDay = function(d) {
			return d[closeAccessor] > d[openAccessor];
		}

		bar
			.selectAll("rect")
			.data(d => [d])
			.join("rect")
				.attr('x', function (d) {
					return xScale(d[xAccessor]) - rectangleWidth;
				})
				.attr('y', function (d) {
					return isUpDay(d) ? yScale(d[closeAccessor]) : yScale(d[openAccessor]);
				})
				.attr('width', rectangleWidth * 2)
				.attr('height', function (d) {
					return isUpDay(d)
						? yScale(d[openAccessor]) - yScale(d[closeAccessor])
						: yScale(d[closeAccessor]) - yScale(d[openAccessor]);
				})
				.attr("fill", stroke);
	}


	render() {
		return <g
			className={`ohlc`}
			ref={(el) => { this.ohlcElement = el; }}
		/>
	}
}

export default CandleStick;