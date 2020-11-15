import React from 'react';
import { select as d3Select } from 'd3-selection';
import * as d3 from 'd3';

class TreePlot extends React.Component {
	componentDidMount() {
		this.renderPlot();
	}

	componentDidUpdate(prevProps, prevState) {
		this.renderPlot();
	}

	renderPlot() {
		// Get props.
		const width = this.props.width;
		const height = this.props.height;
		const xAccessor = this.props.xAccessor;
		const trace = this.props.trace;
		const data = trace.data ? trace.data : {};
		const margin = this.props.margin;

		if(data === null || Object.keys(data).length === 0) {
			return;
		}

		// Build treelayout.
        var treeLayout = d3.tree().size([height - margin.left - margin.right, width - margin.bottom - margin.top]);

        // Layout + Data
        var root = d3.hierarchy(data);
        var nodes = root.descendants();
        var links = treeLayout(root).links();

       	// Bind links to dom.
		const treeLinks = d3Select(this.treeElement)
			.selectAll("line.link")
			.data(links, d => d[xAccessor]);

		treeLinks.join(
			enter =>
				enter
					.append('line')
					.attr('class', 'link')
					.attr('x1', function(d) { return d.source.y; })
					.attr('x2', function(d) { return d.target.y; })
					.attr('y1', function(d) { return d.source.x; })
					.attr('y2', function(d) { return d.target.x; }),
			update =>
				update
					.attr('x1', function(d) { return d.source.y; })
					.attr('x2', function(d) { return d.target.y; })
					.attr('y1', function(d) { return d.source.x; })
					.attr('y2', function(d) { return d.target.x; }),
			exit => 
				exit
					.remove()
		);

		// Bind nodes to dom.
		const treeNodes = d3Select(this.treeElement)
			.selectAll("g.node")
			.attr("class", function(d) { 
				return d.data.selected ? "node selected" : "node"; 
			})
			.data(nodes, d => d[xAccessor])
			.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

		var nodeEnter = treeNodes.enter().append("g")
			.attr("class", function(d) { 
				return d.data.selected ? "node selected" : "node"; 
			})
			.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
			.on("click", this.props.onClick);
			
		treeNodes.exit().remove();

		nodeEnter
			.append("circle")
			.attr('r', 6);

		nodeEnter
			.append("text")
			.attr("x", function(d) { return d.children || d._children ? 13 : -13; })
			.attr("dy", ".35em")
			.attr("y", function(d) { return d.children || d._children ? 13 : -13; })
			.attr("text-anchor", function(d, i) { return d.children ? "start" : "end"; })
			.text(function(d) {
				return d.data.name; 
			});
	}
	
	render() {
		return (
			<g
				transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}
				className='tree'
				ref={(el) => { this.treeElement = el; }}
			/>
		);
	}
}

export default TreePlot;