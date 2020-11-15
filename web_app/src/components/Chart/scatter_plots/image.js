import React from 'react';
import { select as d3Select } from 'd3-selection';
import * as d3 from 'd3';

class ImageChart extends React.Component {
	componentDidMount() {
		this.renderPlot();
	}

	componentDidUpdate(prevProps, prevState) {
		this.renderPlot();
	}

	renderPlot() {
		// Get props.
		const xScale = this.props.xScale;
		const xAccessor = this.props.xAccessor;
		const height = this.props.height;
		const data = this.props.data;

		// Bind to dom.
		const imageElements = d3Select(this.imageElement)
			.selectAll("text")
			.data(data, d => d[xAccessor]);

		imageElements.join(
			enter =>
				enter
					.append("text")
					.on('click', (d, i) => this.props.onClick(d, i, this.props.index))
					.attr('font-family', 'FontAwesome')
					.text( function (d) { return '\uf0e3'; })
					.attr('font-size', '16px')
					.attr('fill', 'red')
					.attr("transform", function(d) {
						return "translate(" + xScale(d[xAccessor]) + "," + (height - 50) + ")";
					}),
			update =>
				update
					.attr("transform", function(d) {
						return "translate(" + xScale(d[xAccessor]) + "," + (height - 50) + ")";
					}),
			exit => 
				exit
					.remove()
		);
	}

	render() {
		return (
			<g
				className='image'
				ref={(el) => { this.imageElement = el; }}
			/>
		);		
	}
}

export default ImageChart;
