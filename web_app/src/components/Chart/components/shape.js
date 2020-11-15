import React from 'react';
import { select as d3Select } from 'd3-selection';
import * as d3 from 'd3';

class ScatterChart extends React.Component {
	componentDidMount() {
		this.renderPlot();
	}

	componentDidUpdate(prevProps, prevState) {
		this.renderPlot();
	}

	renderPlot() {
		// Get props.
		const data = this.props.data;
		const xScale = this.props.xScale;
		const yScale = this.props.yScale;
		const shape = this.props.shape;
		const fill = this.props.fill ? this.props.fill : 'red';
		const strokeWidth = this.props.strokeWidth ? this.props.strokeWidth : 1;
		const stroke = this.props.stroke ? this.props.stroke : 'black';
		const size = this.props.size ? this.props.size : 0.2;
		const defaultSize = size * 100;

		// Set shape.
		var arc;
		switch(shape.toUpperCase()) {
			case 'CIRCLE': arc = d3.symbol().type(d3.symbolCircle);
			break;
			case 'CROSS' : arc = d3.symbol().type(d3.symbolCross);
			break;
			case 'DIAMOND' : arc = d3.symbol().type(d3.symbolDiamond);
			break;
			case 'SQUARE' : arc = d3.symbol().type(d3.symbolSquare);
			break;
			case 'STAR' : arc = d3.symbol().type(d3.symbolStar);
			break;
			case 'TRIANGLE' : arc = d3.symbol().type(d3.symbolTriangle);
			break;
			case 'WYE' : arc = d3.symbol().type(d3.symbolWye);
			break;
			default:
				arc = d3.symbol().type(d3.symbolCircle);
		}

		// Bind to dom.
		const shapeElement = d3Select(this.shapeElement)
			.selectAll(".dot")
			.data(data, d => d.x);

		shapeElement.join(
			enter =>
				enter
					.append("path")
					.attr('d', defaultSize * defaultSize)
					.attr('class', 'dot')
					.attr('fill', fill)
					.attr('stroke', stroke)
					.attr('stroke-width', strokeWidth)
					//.on('click', (d, i) => this.props.onClick(d, i, this.props.index))
					.attr("transform", function(d) {
						return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")";
					}),
			update =>
				update
					.attr('d', defaultSize * defaultSize)
					.attr('class', 'dot')
					.attr('fill', fill)
					.attr('stroke', stroke)
					.attr('stroke-width', strokeWidth)
					//.on('click', (d, i) => this.props.onClick(d, i, this.props.index))
					.attr("transform", function(d) {
						return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")";
					}),
			exit => 
				exit
					.remove()
		);
	}

	render() {
		return <g
			className={`shape`}
			ref={(el) => { this.shapeElement = el; }}
		/>
	}
}