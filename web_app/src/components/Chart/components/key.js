import React from 'react';
import { select as d3Select } from 'd3-selection';
import * as d3 from 'd3';

class KeyItem extends React.Component {
	constructor(props) {
		super(props);
		this.setKeyShape = this.setKeyShape.bind(this);
	}
	
	componentDidMount() { this.setKeyShape(); }

	componentDidUpdate() { this.setKeyShape(); }

	setKeyShape() {
		const trace = this.props.trace;
		if(!trace) return;

		const svg = d3Select(this.svg);
		if(trace.type.toUpperCase() === 'SCATTER') {
			var arc;
			switch(trace.shape.toUpperCase()) {
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

			svg.selectAll("*").remove();
			svg
				.append("path")
				.attr('d',arc)
				.attr("transform", "translate(7.5, 7.5)")
				.attr("fill", trace.color)
				.attr("stroke", trace.edge ? trace.edge.edgeColor : null)
				.attr("strokeWidth", trace.edge && trace.edge.edgeEnabled ? 1 : 0);
		}

		if(trace.type.toUpperCase() === 'LINE') {
			svg.selectAll("*").remove();
			svg
				.append("path")
				.attr("d", 'M0 7.5 L20 7.5')
				.attr("strokeWidth", "2")
				.attr("stroke", trace.color);
		}

		if(trace.type.toUpperCase() === 'IMAGE') {
			svg.selectAll("*").remove();
			svg
				.append("text")
				.attr('font-family', 'FontAwesome')
				.text( function (d) { return '\uf071'; })
				.attr('font-size', '16px')
				.attr('fill', 'red')
				.attr('y', '15px');			
		}
	}

	render() {
		return (
			<div className="d3-legend-item" style={{ height: "15px", lineHeight: "15px", display:"flex", margin:"2px" }}>
				<svg
					ref={(el) => { this.svg = el; }}
					className="key-svg"
					style={{width:"15px", height:"15px"}}
				/>
				<div className="key-item-text" style={{marginLeft: "2px"}}>
					{this.props.trace.key}
				</div>
			</div>
		);
	}
}

function Key(props) {
	return (
		<div style={{
			position: 'absolute',
			zIndex: 1,
			right: '30px',
			top: '15px',
			overflow: 'auto',
		}}
		className='d3-legend'>
			{props.traces.map((trace, index) => {
				return (
					<KeyItem key={index} trace={trace} />
				)
			})}
		</div>
	);
}

export default Key;