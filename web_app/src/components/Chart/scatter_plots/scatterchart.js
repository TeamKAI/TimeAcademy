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
		const xScale = this.props.xScale;
		const yScale = this.props.yScale;
		const xAccessor = this.props.xAccessor;
		const yAccessor = this.props.yAccessor;
		const data = this.props.data;
		const shape = this.props.shape;
		const fill = this.props.fill ? this.props.fill : 'red';
		const strokeWidth = this.props.strokeWidth;
		const stroke = this.props.stroke;
		const size = this.props.size;
		const defaultSize = size * 100;
		const minInterpol = this.props.minInterpol;
		const maxInterpol = this.props.maxInterpol;
		const qAccessor = this.props.qAccessor;
		const formatConditions = this.props.formatConditions;

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

		// Get interpolation scale.
		var interpolScale;
		if(minInterpol && maxInterpol && qAccessor) {
			var minScale = d3.min(data, function(d) { return d[qAccessor] });
			var maxScale = d3.max(data, function(d) { return d[qAccessor] });
			interpolScale = d3.scaleSqrt()
				.domain([minScale, maxScale])
				.range([minInterpol, maxInterpol]);
		}

		// Get conditional formatting.
		var cellFormatter = function(d) {
			var cellFormatter;
			var meets = false;
			
			formatConditions.forEach((formatCondition) => {
				cellFormatter = formatCondition;
				meets = formatCondition.meetsCondition(d);
				if(!meets) return {meetsCondition: meets, cellFormatter: cellFormatter};
			});

			return {meetsCondition: meets, cellFormatter: cellFormatter};
		}
		
		
		// Bind to dom.
		const scatterElements = d3Select(this.scatterElement)
			.selectAll(".dot")
			.data(data, d => d[xAccessor]);

		scatterElements.join(
			enter =>
				enter
					.append("path")
					.attr('d', arc.size((d, i) => {
						if(interpolScale) {
							const interpolSize = interpolScale(d[qAccessor]);
							return (interpolSize * interpolSize) * size;
						}
						return defaultSize * defaultSize;
					}))
					.attr('class', 'dot')
					.attr('fill', (d) => {
						const formatter = cellFormatter(d);
						return formatter.meetsCondition && formatter.cellFormatter && formatter.cellFormatter.background ? formatter.cellFormatter.background : fill;
					})
					.attr('stroke', (d) => {
						const formatter = cellFormatter(d);
						return formatter.meetsCondition && formatter.cellFormatter && formatter.cellFormatter.passEdgeColor ? formatter.cellFormatter.passEdgeColor : stroke;
					})
					.attr('stroke-width', (d) => {
						const formatter = cellFormatter(d);
						return formatter.meetsCondition && formatter.cellFormatter && formatter.cellFormatter.passEdgeThickness ? formatter.cellFormatter.passEdgeThickness : strokeWidth
					})
					.on('click', (d, i) => this.props.onClick(d, i, this.props.index))
					.attr("transform", function(d) {
						return "translate(" + xScale(d[xAccessor]) + "," + yScale(d[yAccessor]) + ")";
					})
					.attr('opacity', (d) => {
						const formatter = cellFormatter(d);
						return !formatter.meetsCondition && formatter.cellFormatter && formatter.cellFormatter.failOpacity ? formatter.cellFormatter.failOpacity : 'default';
					}),
			update =>
				update
					.attr('d', arc.size((d, i) => {
						if(interpolScale) {
							const interpolSize = interpolScale(d[qAccessor]);
							return (interpolSize * interpolSize) * size;
						}
						return defaultSize * defaultSize;
					}))
					.attr('fill', fill)
					.attr('stroke', (d) => {
						const formatter = cellFormatter(d);
						return formatter.meetsCondition && formatter.cellFormatter && formatter.cellFormatter.passEdgeColor ? formatter.cellFormatter.passEdgeColor : stroke;
					})
					.attr('stroke-width', (d) => {
						const formatter = cellFormatter(d);
						return formatter.meetsCondition && formatter.cellFormatter && formatter.cellFormatter.passEdgeThickness ? formatter.cellFormatter.passEdgeThickness : strokeWidth;
					})
					.attr("transform", function(d) {
						return "translate(" + xScale(d[xAccessor]) + "," + yScale(d[yAccessor]) + ")";
					})
					.attr('opacity', (d) => {
						const formatter = cellFormatter(d);
						return !formatter.meetsCondition && formatter.cellFormatter && formatter.cellFormatter.failOpacity ? formatter.cellFormatter.failOpacity : 'default';
					}),
			exit => 
				exit
					.remove()
		);
	}
	
	render() {
		return <g
			className={`scatter`}
			ref={(el) => { this.scatterElement = el; }}
		/>
	}	
}

export default ScatterChart;