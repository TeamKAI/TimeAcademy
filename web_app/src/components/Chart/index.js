import React from 'react';
import * as d3 from 'd3';
import { select as d3Select } from 'd3-selection';

import ScatterPlot from './scatter_plots/scatter_plot.js';
import Key from './components/key.js';
import Tooltip from './components/tooltip.js';
import TreePlot from './tree_plot.js';

class Chart extends React.Component {
	constructor(props) {
		super(props);
		
		const layout = props.layout;
		this.state = {
			zoomTransform: null,
			margin: layout && layout.margin ? layout.margin : {top: 10, right:25,  bottom:25, left: 45},
			toolTipData: null,
		}

		this.onClick = this.onClick.bind(this);
		this.keyUp = this.keyUp.bind(this);

		// Initialize zoom.
		this.zoom = d3.zoom().on("zoom", this.zoomFunction.bind(this));
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.toolTipData !== prevProps.toolTipData) {
			this.setState({
				toolTipData: this.props.toolTipData,
			})
		}
	}

	componentDidMount() {
		const svg = d3Select(this.svg);

		// Bind zoom.
		svg.call(this.zoom);

		// Remove default right click contextmenu.
		svg.on('contextmenu', () => {
			d3.event.preventDefault();
		});
	}

	zoomFunction() {
		this.setState({
			zoomTransform: d3.event.transform,
		})
	}

	onClick(d, i, index) {
		d3.event.stopImmediatePropagation();
		if(this.props.onClick) {
			this.props.onClick(d, d3.event.pageX, d3.event.pageY, index);
		} else {
			this.setState({
				toolTipData:{
					pageX: d3.event.pageX,
					pageY: d3.event.pageY,
					data: d,
				}				
			})
		}
	}

	keyUp(event) {
		const keyCode = event.which || event.keyCode;
		if(keyCode === 27) {
			this.zoom.transform(d3Select(this.svg), d3.zoomIdentity);
			this.setState({
				toolTipData: null,
			})
		}
	}

	render() {
		// Get layout & tooltip data & traces.
		const layout = this.props.layout;
		const toolTipData = this.state.toolTipData;
		const traces = this.props.traces ? this.props.traces : [];

		const treePlot = traces.find((trace) => trace.type.toUpperCase() === 'TREE');

		// Get height/width dimensions.
		const height = this.props.height;
		const width = this.props.width;

		// Get margins.
		const margin = this.state.margin;
		const marginTop = margin.top;
		const marginRight = margin.right;
		const marginBottom = margin.bottom;
		const marginLeft = margin.left;

		return (
			<div style={{width: '100%', height: '100%', position:'absolute', x: 0, y: 0}}>
				{layout.hasLegend !== false && <Key traces={traces} />}
				<svg 
					width={width} 
					height={height}
					ref={(el) => { this.svg = el; }}
					style={{background:layout.paper_bg}}
				>
				{treePlot
					? <TreePlot
						trace={treePlot}
						layout={layout}
						height={height}
						width={width}
						margin={margin}
						zoomTransform={this.state.zoomTransform}
						svg={d3Select(this.svg)}
						onKeyUp={this.keyUp}
						onClick={this.onClick}
					  />
					: <ScatterPlot
						layout={layout}
						traces={traces}
						height={height}
						width={width}
						margin={margin}
						zoomTransform={this.state.zoomTransform}
						svg={d3Select(this.svg)}
						onKeyUp={this.keyUp}
						onClick={this.onClick}
					/>
				}
				</svg>
				{(toolTipData && layout.toolTipsEnabled !== false) 
					&& <Tooltip 
							data={toolTipData.data} 
							pageX={toolTipData.pageX} 
							pageY={toolTipData.pageY} 
							deconstruct={() => this.setState({
								toolTipData: null,
							})}
						/>}
			</div>
		);
	}
}

export default Chart;