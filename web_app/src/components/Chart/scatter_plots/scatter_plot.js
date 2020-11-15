import React from 'react';
import * as d3 from 'd3';
import { select as d3Select } from 'd3-selection';

import uuidv1 from "uuid";
//import dateFns from "date-fns";

import Axis from './axis.js';
import Grid from './grid.js';
import LineChart from './linechart.js';
import ScatterChart from './scatterchart.js';
import ImageChart from './image.js';
import BarChart from './bar_chart.js';
import PieChart from '../pie_chart.js';
import OHLC from './ohlc.js';
import CandleStick from './candle_stick.js';

import Key from '../components/key.js';

class ScatterPlot extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			brushMinX: null,
			brushMaxX: null,
			brushMinY: null,
			brushMaxY: null,
		}

		this.yScale = d3.scaleLinear();
		this.uuid = `_${uuidv1()}`;

		this.onMouseDown = this.onMouseDown.bind(this);
	}

	componentDidMount() {
		const svg = this.props.svg;

		// Listen for mousedown events.
		svg.on('mousedown', this.onMouseDown);

		// Listen for key press.
		document.addEventListener("keyup", this.keyUp.bind(this));
	}

	keyUp(event) {
		const keyCode = event.which || event.keyCode;
		if(keyCode === 27) {
			this.setState({
				brushMinX: null,
				brushMaxX: null,
				brushMinY: null,
				brushMaxY: null,
			}, () => {
				this.props.onKeyUp(event);
			})
		}
	}

	onMouseDown() {
		const svg = this.props.svg;
		const xScale = this.xScale;
		const yScale = this.yScale;

		if(d3.event.button === 2 || d3.event.ctrlKey) {
			var m = d3.mouse(d3.event.currentTarget);
			var originX = m[0];
			var originY = m[1];
			
			const brush = d3Select(this.brush);
			svg.on("mousemove", () => {
				m = d3.mouse(d3.event.currentTarget);

				var x = Math.min(originX, m[0]);
				var y = Math.min(originY, m[1]);
				var height = Math.max(originY - m[1], m[1] - originY);
				var width = Math.max(originX - m[0], m[0] - originX);	

				brush
					.attr("x", x)
					.attr("y", y)
					.attr("height", height)
					.attr("width", width);
			});				
		
			svg.on('mouseup', () => {
				svg.on("mousemove", null);
				svg.on('mouseup', null);

				const brushCoordinates = brush.node().getBBox();

				this.setState({
					brushMinX: Math.min(xScale.invert(brushCoordinates.x), xScale.invert(brushCoordinates.x + brushCoordinates.width)),
					brushMaxX: Math.max(xScale.invert(brushCoordinates.x), xScale.invert(brushCoordinates.x + brushCoordinates.width)),
					brushMinY: Math.min(yScale.invert(brushCoordinates.y), yScale.invert(brushCoordinates.y + brushCoordinates.height)),
					brushMaxY: Math.max(yScale.invert(brushCoordinates.y), yScale.invert(brushCoordinates.y + brushCoordinates.height)),
				}, () => {
					this.zoom.transform(this.props.svg, d3.zoomIdentity);
				});
			
				brush
					.attr("height", 0)
					.attr("width", 0);
			});
		}		
	}

	render() {
		// Get layout data & traces.
		const layout = this.props.layout;
		const traces = this.props.traces;

		// Get height/width dimensions.
		const height = this.props.height;
		const width = this.props.width;

		// Get margins.
		const marginTop = this.props.margin.top;
		const marginRight = this.props.margin.right;
		const marginBottom = this.props.margin.bottom;
		const marginLeft = this.props.margin.left;
		
		// Set x & y scales - TODO - improve logic to set correct scale based on data input.
		var xScale;
		const barChart = traces.find((trace) => trace.type.toUpperCase() === 'BAR');
		var minX = this.state.brushMinX ? this.state.brushMinX : d3.min(traces, function(trace) {
			return d3.min(trace.data, function(d) {
				return d[trace.xAxis]
			})
		})
		if(!minX) {
			//minX = dateFns.subDays(dateFns.parse(dateFns.format(new Date(), 'MM/DD/YYYY')), 1); 
		}

		var maxX = this.state.brushMaxX 
			? this.state.brushMaxX : d3.max(traces, function(trace) {
				return d3.max(trace.data, function(d) {
					return d[trace.xAxis]
				})
		})
		if(!maxX) { 
			//maxX = dateFns.parse(dateFns.format(new Date(), 'MM/DD/YYYY')); 
		}

		if(typeof minX === 'string' && barChart) {
			this.xScale = d3.scaleBand();
			xScale = this.xScale
				.range([marginLeft, width - marginRight])
				.padding(0.1)
				.domain(barChart.data.map(function (d) { return d[barChart.xAxis]}));
			xScale.type = 'ordinal';			
		} else {
			this.xScale = (typeof minX === 'number') ? d3.scaleLinear() : d3.scaleTime();
			xScale = this.xScale
				.domain([minX, maxX])
				.range([marginLeft, width - marginRight]);				
		}

		// Get min / max y ranges & set scales - TODO: cache ranges for better performance.
		var minY = this.state.brushMinY ? this.state.brushMinY : d3.min(traces, function(trace) {
			if(trace.type.toUpperCase() !== 'IMAGE') {
				return d3.min(trace.data, function(d) {
					return d[trace.yAxis]
				})				
			}
		})
		if(!minY || barChart) { minY = 0; }

		var maxY = this.state.brushMaxY ? this.state.brushMaxY : d3.max(traces, function(trace) {
			if(trace.type.toUpperCase() !== 'IMAGE') {
				return d3.max(trace.data, function(d) {
					return d[trace.yAxis]
				})
			}
		})
		if(!maxY) { maxY = 1; }

		const yScale = this.yScale
			.domain([minY, maxY])
			.range([height - marginBottom, marginTop]);

		// Set zoom.
		const zoomTransform = this.props.zoomTransform;
		if(zoomTransform) {
			if(!barChart) {
				xScale.domain(zoomTransform.rescaleX(xScale).domain());
			}
			yScale.domain(zoomTransform.rescaleY(yScale).domain());
		}

		// Set grid & axis props.
		const xProps = {
			orient: 'Bottom',
			scale: xScale,
			translate: `translate(0, ${height - marginBottom})`,
			tickSize: height - marginTop - marginBottom,
			rotate: barChart != null,
		}

		const yProps = {
			orient: 'Left',
			scale: yScale,
			translate: `translate(${marginLeft}, 0)`,
			tickSize: width - marginLeft - marginRight,
		}
		
		return (
			<g>
				{layout.hasXGrid !== false && <Grid {...yProps} color={layout.gridColor} />}
				{layout.hasYGrid !== false && <Grid {...xProps} color={layout.gridColor} />}
				{layout.hasXAxis !== false && <Axis {...xProps} color={layout.axisColor} />}
				{layout.hasYAxis !== false && <Axis {...yProps} color={layout.axisColor} />}

				<defs>
		            <clipPath id={this.uuid}>
		                <rect x={marginLeft} y={marginTop} width={width - marginLeft - marginRight} height={height - marginTop - marginBottom}/>
		            </clipPath>
		        </defs>
				
				<g clipPath={`url(#${this.uuid})`}>
					{traces.map((trace, index) => {
						const type = trace.type.toUpperCase();
						switch(type) {
							case 'LINE': 
								return <LineChart
									size={trace.size}
									shape={trace.shape}
									stroke={trace.color}
									data={trace.data}
									xScale={xScale}
									yScale={yScale}
									xAccessor={trace.xAxis}
									yAccessor={trace.yAxis}
									key={index}
									index={index}
									size={trace.size ? trace.size : 0.5}
								/>
							case 'SCATTER':
								if(trace.shape.toUpperCase() === "OHLC") {
									return <OHLC
										size={trace.size}
										shape={trace.shape}
										fill={trace.color}
										strokeWidth={trace.edge && trace.edge.edgeEnabled ? (trace.edge.edgeThickness ? trace.edge.edgeThickness : 1) : 0}
										stroke={trace.color}
										data={trace.data}
										xScale={xScale}
										yScale={yScale}
										xAccessor={trace.xAxis}
										openAccessor={trace.yAxis}
										highAccessor={trace.axis3}
										lowAccessor={trace.axis4}
										closeAccessor={trace.axis5}
										key={index}
										index={index}
										onClick={this.props.onClick}
										size={trace.size ? trace.size : 0.5}
										maxInterpol={trace.interpol ? trace.interpol.maxInterpol : null}
										minInterpol={trace.interpol ? trace.interpol.minInterpol : null}
										qAccessor={trace.interpol ? trace.interpol.quantityColumn : null}
										formatConditions={trace.format_conditions}
									/>									
								}

								if(trace.shape.toUpperCase() === "CANDLESTICK") {
									return <CandleStick
										size={trace.size}
										shape={trace.shape}
										fill={trace.color}
										strokeWidth={trace.edge && trace.edge.edgeEnabled ? (trace.edge.edgeThickness ? trace.edge.edgeThickness : 1) : 0}
										stroke={trace.color}
										data={trace.data}
										xScale={xScale}
										yScale={yScale}
										xAccessor={trace.xAxis}
										openAccessor={trace.yAxis}
										highAccessor={trace.axis3}
										lowAccessor={trace.axis4}
										closeAccessor={trace.axis5}
										key={index}
										index={index}
										onClick={this.props.onClick}
										size={trace.size ? trace.size : 0.5}
										maxInterpol={trace.interpol ? trace.interpol.maxInterpol : null}
										minInterpol={trace.interpol ? trace.interpol.minInterpol : null}
										qAccessor={trace.interpol ? trace.interpol.quantityColumn : null}
										formatConditions={trace.format_conditions}
									/>
								}

								return <ScatterChart
									size={trace.size}
									shape={trace.shape}
									fill={trace.color}
									strokeWidth={trace.edge && trace.edge.edgeEnabled ? (trace.edge.edgeThickness ? trace.edge.edgeThickness : 1) : 0}
									stroke={trace.edge ? trace.edge.edgeColor : null}
									data={trace.data}
									xScale={xScale}
									yScale={yScale}
									xAccessor={trace.xAxis}
									yAccessor={trace.yAxis}
									key={index}
									index={index}
									onClick={this.props.onClick}
									size={trace.size ? trace.size : 0.5}
									maxInterpol={trace.interpol ? trace.interpol.maxInterpol : null}
									minInterpol={trace.interpol ? trace.interpol.minInterpol : null}
									qAccessor={trace.interpol ? trace.interpol.quantityColumn : null}
									formatConditions={trace.format_conditions}
								/>
							case 'IMAGE':
								return <ImageChart
									data={trace.data}
									xScale={xScale}
									xAccessor={trace.xAxis}
									height={this.props.height}
									key={index}
									index={index}
									onClick={this.props.onClick}
								/>
							case 'BAR':
								return <BarChart
									data={trace.data}
									xScale={xScale}
									yScale={yScale}
									xAccessor={trace.xAxis}
									yAccessor={trace.yAxis}
									height={this.props.height}
									width={this.props.width}
									key={index}
									index={index}
									onClick={this.props.onClick}
									fill={trace.color}
								/>
							case 'PIE':
								return <PieChart
									margin={this.props.margin}
									data={trace.data}
									xAccessor={trace.xAxis}
									yAccessor={trace.yAxis}
									height={this.props.height}
									width={this.props.width}
									key={index}
									index={index}
									onClick={this.props.onClick}
									hasLegend={layout.hasLegend}
								/>
							default:
								return <g key={index} />
						}
					})}
				</g>
				<rect
					className="brush"
					style={{
						fill: "white",
						stroke: "black",
						strokeWidth: 2,
						opacity: 0.5,
					}}
					ref={(el) => { this.brush = el; }}
				/>
			</g>
		)
	}
}

export default ScatterPlot;