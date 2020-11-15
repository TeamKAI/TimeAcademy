import React from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { axiosInstance } from 'api/app/restApi.js'
import Bound from 'api/utils/bound.js';
import { copyToClipboard } from 'api/utils/functions.js';

import Cell from './cell.js';
import CellHeader from './cell_header.js';

// import { ws } from '../../index.js'; - TODO add back

const FETCHING = "FETCHING";
const FETCHING_FAILED = "FETCHING_FAILED";
const FETCHING_COMPLETED = "FETCHING_COMPLETED";

const ColumnContext = React.createContext();

const innerElementType = React.forwardRef(({ children, ...rest }, ref) => {
	var left = 0;
	return (
		<ColumnContext.Consumer>
		{({ columns, onColResizeStart, onColResizeEnd, onColResize, onColDragStart, onColDragEnd, onColDrag, 
			onSortUp, onSortDown, onApplyFilter, whereFields, onRemoveFilter, orderPairs, getCurrColIndex, onShowAdvancedFilters, dragIndex,
			getDistinctValues, uncheckedConditionGroup, table }) => (
			<div ref={ref} {...rest} className='table-context'>
				{columns.map((column, index) => {
					var header = <CellHeader
						index={index}
						key={index}
						style={{ top: '0px', width: column.width, height: '46px', position:'' }}
						column={column}
						onColResizeStart={onColResizeStart}
						onColResizeEnd={onColResizeEnd}
						onColResize={onColResize}
						onColDragStart={onColDragStart}
						onColDragEnd={onColDragEnd}
						onColDrag={onColDrag}
						onSortUp={onSortUp}
						onSortDown={onSortDown}
						onApplyFilter={onApplyFilter}
						whereFields={whereFields}
						onShowAdvancedFilters={onShowAdvancedFilters}
						onRemoveFilter={onRemoveFilter}
						orderPairs={orderPairs}
						left={left}
						dragIndex={dragIndex}
						getDistinctValues={getDistinctValues}
						uncheckedConditionGroup={uncheckedConditionGroup}
						table={table}
					/>
					if(getCurrColIndex && index >= getCurrColIndex()) {
						left = left + column.width;
					}
					return header;
				})}
				{children}
			</div>
		)}
		</ColumnContext.Consumer>
)});

class DataTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			rowSelectionBounds: new Bound(-1, -1),
			columnSelectionBounds: new Bound(-1, -1),
			pivotSelectionBounds: null,
			lastSelectionBounds: null,
			dragColumn: null,
			dragIndex: null,
		}
		
		this.resizeLineRef = React.createRef();
		this.dragColRef = React.createRef();
		this.parentRef = React.createRef();
		this.gridRef = React.createRef();
		this.paginatedTableRef = React.createRef();

		this.isSelected = this.isSelected.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);

		this.onColResizeStart = this.onColResizeStart.bind(this);
		this.onColResizeEnd = this.onColResizeEnd.bind(this);
		this.onColResize = this.onColResize.bind(this);
		this.onColDragStart = this.onColDragStart.bind(this);
		this.onColDragEnd = this.onColDragEnd.bind(this);
		this.onColDrag = this.onColDrag.bind(this);

		this.onItemsRendered = this.onItemsRendered.bind(this);
		this.getCurrColIndex = this.getCurrColIndex.bind(this);

		this.scrollLeft = 0;
		this.onScroll = this.onScroll.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.columns !== this.props.columns) {
			if(this.gridRef && this.gridRef.current) {
				this.gridRef.current.resetAfterColumnIndex(0, true);
			}
		}
	}

	onScroll({scrollLeft}) {
		this.scrollLeft = scrollLeft;
	}

	onItemsRendered(currRowIndex, currColIndex) {
		this.currRowIndex = currRowIndex;
		this.currColIndex = currColIndex;
	}

	handleKeyPress(event) {
		const keyCode = event.which || event.keyCode;

		// ctrl+c for copy
		if(event.ctrlKey && keyCode === 67) {
			// Selection bounds.
			const lowerRow = this.state.rowSelectionBounds.lower;
			const upperRow = this.state.rowSelectionBounds.upper;
			const lowerCol = this.state.columnSelectionBounds.lower;
			const upperCol = this.state.columnSelectionBounds.upper;

			const columns = this.props.columns;
			const rowSelection = this.props.rowSelection;
			
			var csvContent = '';
			function getCell(data, col) {
				if(col.type === 'ColumnType.COLUMN_GROUP') {
					var cellData = [];
					for(var i = 0; i <= col.numColumns(); ++i) {
						var colRules = col.columnGroupRules.filter((colRule) => colRule.colPosition === i && colRule.data(data) !== '');
						if(colRules.length === 0) {
							cellData.push('');
						} else {
							cellData.push(colRules.map((colRule) => colRule.data(data)));
						}
					}
					return cellData;
				} else {
					var cellData = data[col.name];
					return col.converter ? col.converter.convert(cellData) : cellData;
				}
			}

			function addRow(rowMap) {
				var rowList = [];
				if(rowSelection) {
					rowList = columns.map((col) => getCell(rowMap, col));
				} else {
					for(var i = lowerCol; i <= upperCol; ++i) {
						rowList.push(getCell(rowMap, columns[i]));
					}
				}

				csvContent += rowList.join(",") + "\r\n";
			}

			if(this.props.paginated) {
				const data =  this.paginatedTableRef.current.state.data;
				const startIndex = this.paginatedTableRef.current.loadingRequestRow;

				for(var i = lowerRow; i <= upperRow; ++i) {
					const translatedRow = i - startIndex;
					if(translatedRow < 0) {
						continue;
					}
					
					addRow(data[translatedRow]);
				}
			} else {

			}

			copyToClipboard(csvContent);
		}

		// Escape key to clear select.
		if(keyCode === 27) {
			this.currColIndex = 0;
			this.currRowIndex = 0;

			this.setState({
				rowSelectionBounds: new Bound(-1, -1),
				columnSelectionBounds: new Bound(-1, -1),
				pivotSelectionBounds: null,
				lastSelectionBounds: null,
			});
		}

		// Pagedown
		if((event.metaKey && keyCode === 40) || keyCode === 34) {
			const newRowIndex = this.currRowIndex + Math.round(this.height / 19) - 3;
			this.gridRef.current.scrollToItem({
				align: "start",
				rowIndex: newRowIndex,
			});
			return;		
		}

		// Pageup
		if((event.metaKey && keyCode === 38) || keyCode === 33) {
				const newRowIndex = this.currRowIndex - Math.round(this.height / 19) + 2;
				this.gridRef.current.scrollToItem({
					align: "start",
					rowIndex: newRowIndex,
				});	
			return;		
		}

		// 40 = down
		if(keyCode === 40) {
			var newBounds;
			if(!event.shiftKey) {
				newBounds = this.getSelectionBounds(this.lastSelectionBounds.col, this.pivotSelectionBounds.row + 1, event.shiftKey);
				this.lastSelectionBounds.row = newBounds.rowSelectionBounds.upper;
				this.pivotSelectionBounds.row = newBounds.rowSelectionBounds.upper;
			} else if(this.lastSelectionBounds.row >= this.pivotSelectionBounds.row) {
				newBounds = this.getSelectionBounds(this.lastSelectionBounds.col, this.lastSelectionBounds.row + 1, event.shiftKey);
				this.lastSelectionBounds.row = newBounds.rowSelectionBounds.upper;
			} else {
				newBounds = this.getSelectionBounds(this.lastSelectionBounds.col, this.lastSelectionBounds.row + 1, event.shiftKey);
				this.lastSelectionBounds.row = newBounds.rowSelectionBounds.lower;
			}

			this.setState(
				newBounds
			);

			// Scroll down if go off page.
			if(((newBounds.rowSelectionBounds.upper - (this.currRowIndex - 1) + 2) * 19) > this.height) {
				this.gridRef.current.scrollToItem({
					align: "start",
					rowIndex: this.currRowIndex,
				});
			}
		}

		// 38 = up
		if(keyCode === 38) {
			var newBounds;
			if(!event.shiftKey) {
				newBounds = this.getSelectionBounds(this.lastSelectionBounds.col, this.pivotSelectionBounds.row - 1, event.shiftKey);
				this.lastSelectionBounds.row = newBounds.rowSelectionBounds.upper;
				this.pivotSelectionBounds.row = newBounds.rowSelectionBounds.upper;
			} else if(this.lastSelectionBounds.row <= this.pivotSelectionBounds.row) {
				newBounds = this.getSelectionBounds(this.lastSelectionBounds.col, this.lastSelectionBounds.row - 1, event.shiftKey);
				this.lastSelectionBounds.row = newBounds.rowSelectionBounds.lower;
			} else {
				newBounds = this.getSelectionBounds(this.lastSelectionBounds.col, this.lastSelectionBounds.row - 1, event.shiftKey);
				this.lastSelectionBounds.row = newBounds.rowSelectionBounds.upper;
			}

			this.setState(
				newBounds
			);

			// Scroll up if go off page.
			if(newBounds.rowSelectionBounds.lower < (this.currRowIndex - 1)) {
				this.gridRef.current.scrollToItem({
					align: "start",
					rowIndex: newBounds.rowSelectionBounds.lower,
				});
			}
		}

		// 37 = left
		if(keyCode === 37) {
			var newBounds;
			if(!event.shiftKey) {
				newBounds = this.getSelectionBounds(this.pivotSelectionBounds.col - 1, this.lastSelectionBounds.row, event.shiftKey);
				this.lastSelectionBounds.col = newBounds.columnSelectionBounds.upper;
				this.pivotSelectionBounds.col = newBounds.columnSelectionBounds.upper;
			} else if(this.lastSelectionBounds.col <= this.pivotSelectionBounds.col) {
				newBounds = this.getSelectionBounds(this.lastSelectionBounds.col - 1, this.lastSelectionBounds.row, event.shiftKey);
				this.lastSelectionBounds.col = newBounds.columnSelectionBounds.lower;
			} else {
				newBounds = this.getSelectionBounds(this.lastSelectionBounds.col - 1, this.lastSelectionBounds.row, event.shiftKey);
				this.lastSelectionBounds.col = newBounds.columnSelectionBounds.upper;
			}

			this.setState(
				newBounds
			);

			// Scroll left if go off page.
			if(newBounds.columnSelectionBounds.lower < this.currColIndex) {
				this.gridRef.current.scrollToItem({
					align: "start",
					columnIndex: newBounds.columnSelectionBounds.lower,
				});
			}
		}


		// 39 = right
		if(keyCode === 39) {
			var newBounds;
			if(!event.shiftKey) {
				newBounds = this.getSelectionBounds(this.pivotSelectionBounds.col + 1, this.lastSelectionBounds.row, event.shiftKey);
				this.lastSelectionBounds.col = newBounds.columnSelectionBounds.upper;
				this.pivotSelectionBounds.col = newBounds.columnSelectionBounds.upper;
			} else if(this.lastSelectionBounds.col >= this.pivotSelectionBounds.col) {
				newBounds = this.getSelectionBounds(this.lastSelectionBounds.col + 1, this.lastSelectionBounds.row, event.shiftKey);
				this.lastSelectionBounds.col = newBounds.columnSelectionBounds.upper;
			} else {
				newBounds = this.getSelectionBounds(this.lastSelectionBounds.col + 1, this.lastSelectionBounds.row, event.shiftKey);
				this.lastSelectionBounds.col = newBounds.columnSelectionBounds.lower;
			}

			this.setState(
				newBounds
			);

			const columnBounds = this.getColumnBounds(this.props.columns[newBounds.columnSelectionBounds.lower], this.currColIndex);
			if(columnBounds.upper > this.width) {
				this.gridRef.current.scrollToItem({
					align: "start",
					columnIndex: this.currColIndex + 1,
				});
			}
		}

		if(this.props.onKeyPress) {
			this.props.onKeyPress(event);
		}
	}

	getSelectionBounds(columnIndex, rowIndex, shiftKey) {
		var newLowerRow = rowIndex;
		var newUpperRow = rowIndex;
		var newLowerCol = columnIndex;
		var newUpperCol = columnIndex;

		if(!shiftKey || !this.pivotSelectionBounds) {
			this.pivotSelectionBounds = {'row':rowIndex, 'col':columnIndex};
		} else if(shiftKey) {
			newLowerRow = Math.min(this.pivotSelectionBounds.row, rowIndex);
			newUpperRow = Math.max(this.pivotSelectionBounds.row, rowIndex);
			newLowerCol = Math.min(this.pivotSelectionBounds.col, columnIndex);
			newUpperCol = Math.max(this.pivotSelectionBounds.col, columnIndex);
		}

		return {
			'rowSelectionBounds': new Bound(Math.max(newLowerRow, 0), Math.max(newUpperRow, 0)), 
			'columnSelectionBounds': new Bound(Math.min(Math.max(newLowerCol, 0), this.props.columns.length - 1), Math.min(Math.max(newUpperCol, 0), this.props.columns.length - 1))};
	}

	handleClick(columnIndex, rowIndex, data, event, columns, subIndex) {
		this.lastSelectionBounds = {'row':rowIndex, 'col':columnIndex};
		this.setState(
			this.getSelectionBounds(columnIndex, rowIndex, event.shiftKey)
		, () => {
			if(this.props.handleClick) {
				this.props.handleClick(columnIndex, rowIndex, data, event, columns, subIndex);
			}
		});
	}

	isSelected(columnIndex, rowIndex) {
		return this.props.rowSelection ? this.state.rowSelectionBounds.contains(rowIndex) : this.state.rowSelectionBounds.contains(rowIndex) && this.state.columnSelectionBounds.contains(columnIndex);
	}

	getTotalColumnWidth() {
		const columns = this.props.columns;
		var width = 0;
		for(var i = 0; i < columns.length; ++i) {
			width += columns[i].width;
		}
		return width;
	}

	getAllColumnBounds() {
		const columns = this.props.columns;
		const bounds = [];
		var left = 0;
		for(var i = 0; i < columns.length; ++i) {
			var column = columns[i];
			bounds.push(new Bound(left, left += column.width));
		}
		return bounds;
	}

	getColumnBounds(column, startIndex) {
		const columns = this.props.columns;
		var left = 0;
		for(var i = startIndex ? startIndex : 0; i < columns.indexOf(column); ++i) {
			left += columns[i].width;
		}

		return new Bound(left, left + column.width);
	}

	relativeCoords(event) {
		var bounds = this.parentRef.current.getBoundingClientRect();
		var x =  event.clientX - bounds.left;
		var y = event.clientY - bounds.top;
		return {x: x, y: y};
	}
	
	onColDragStart(event, column) {		
		event.preventDefault();
		this.columnBounds = this.getColumnBounds(column);
		this.deltaX = 0;
		
		this.setState({
			dragColumn:column,
			dragIndex: this.props.columns.indexOf(column),
		}, () => {
			const mouseMoveFunction = function(e) {
				this.onColDrag(e, column);
			}.bind(this);

			var mouseUpFunction;
			mouseUpFunction = function(e) {
				window.removeEventListener("mousemove", mouseMoveFunction);
				window.removeEventListener("mouseup", mouseUpFunction);
				this.onColDragEnd(e, column);
			}.bind(this);

			window.addEventListener("mouseup", mouseUpFunction);
			window.addEventListener("mousemove", mouseMoveFunction);

			this.dragColRef.current.style.left = `${this.columnBounds.lower + this.deltaX - this.scrollLeft}px`;
			this.dragColRef.current.style.display = 'block';			
		});
	}

	onColDrag(event, column) {
		event.preventDefault();
		var newLeft = this.columnBounds.lower + this.deltaX + event.movementX;
		if(newLeft >= 0 && newLeft <= this.getTotalColumnWidth() - column.width) {
			this.dragColRef.current.style.left = `${this.columnBounds.lower + (this.deltaX += event.movementX) - this.scrollLeft}px`;
			
			const columnBounds = this.getAllColumnBounds();
			const bound = columnBounds.find((bound) => bound.contains(this.columnBounds.lower + this.deltaX));
			const index = columnBounds.indexOf(bound);

			var passedMiddle = 
				(this.state.dragIndex < index && bound.depth(this.columnBounds.lower + this.deltaX) > 0.5)
				|| (this.state.dragIndex > index && bound.depth(this.columnBounds.lower + this.deltaX) < 0.5);

			if(this.state.dragIndex !== index && this.props.onColMove 
				&& passedMiddle) {
				this.setState({
					dragIndex:index,
				}, () => {
					this.props.onColMove(this.props.columns.indexOf(column), index);
				})
			}	
		}	
	}

	onColDragEnd(event, column) {
		event.preventDefault();
		this.setState({
			dragColumn:null,
			dragIndex:null,
		}, () => {
			this.dragColRef.current.style.display = 'none';
		});
	}

	onColResizeStart(event) {
		var coords = this.relativeCoords(event);
		this.resizeLineRef.current.style.left = `${coords.x}px`;
		this.resizeLineRef.current.style.display = 'block';
	}

	onColResize(event, delta) {
		event.preventDefault();
		var coords = this.relativeCoords(event);
		this.resizeLineRef.current.style.left = `${coords.x}px`;
	}

	onColResizeEnd(event, delta, column) {
		this.resizeLineRef.current.style.display = 'none';
		if(this.props.onColResize && column) {
			this.props.onColResize(this.props.columns.indexOf(column), column.width + delta.x);
		}
	}

	getCurrColIndex() {
		return this.currColIndex;
	}

	render() {
		return(
			<div onKeyDown={this.handleKeyPress} tabIndex="0" className='full-size' style={{overflow:'hidden', outline:'none'}} ref={this.parentRef}>
				<AutoSizer>
					{({height, width}) => {
						const commonProps = {
							columnWidth: (index) => {
								var width = this.props.columns[index].width;
								return (!width || isNaN(width)) ? 150.0 : width;
							},
							rowHeight: index => this.props.rowHeight ? this.props.rowHeight : 46,
							width: width,
							columnCount: this.props.columns.length,
							whereFields: this.props.whereFields,
							orderPairs: this.props.orderPairs,
						};

						const commonGridProps = {
							height: height,
						};

						this.height = height;
						this.width = width;

						return (
							<ColumnContext.Provider value={{ 
								columns: this.props.columns, 
								onColResizeStart:this.onColResizeStart,
								onColResizeEnd:this.onColResizeEnd,
								onColResize:this.onColResize,
								onColDragStart:this.onColDragStart,
								onColDragEnd:this.onColDragEnd,
								onColDrag:this.onColDrag,
								onSortUp:this.props.onSortUp,
								onSortDown:this.props.onSortDown,
								onApplyFilter:this.props.onApplyFilter,
								onShowAdvancedFilters:this.props.onShowAdvancedFilters,
								whereFields:this.props.whereFields,	
								onRemoveFilter:this.props.onRemoveFilter,
								orderPairs:this.props.orderPairs,
								getCurrColIndex:this.getCurrColIndex,
								dragIndex:this.state.dragIndex,
								getDistinctValues: this.props.getDistinctValues,
								uncheckedConditionGroup: this.props.uncheckedConditionGroup,
								table: this.props.table,
							}}>
								{this.props.paginated && 
									<InfiniteTableBody
										{...commonProps}
										{...commonGridProps}
										onItemsRendered={this.onItemsRendered}
										dataId={this.props.dataId}
										searchPacket={this.props.searchPacket}
										columns={this.props.columns}
										formatConditions={this.props.formatConditions ? this.props.formatConditions : []}
										onClick={this.handleClick}
										isSelected={this.isSelected}
										forwardRef={this.dragColRef}
										dragColumn={this.state.dragColumn}
										gridRef={this.gridRef}
										ref={this.paginatedTableRef}
										keepColIndex={this.props.keepColIndex}
										keepRowIndex={this.props.keepRowIndex}
										dragIndex={this.state.dragIndex}
										onScroll={this.onScroll}
									>
									{this.props.children ? this.props.children : Cell}
									</InfiniteTableBody>
								}
								{!this.props.paginated && 
									<Grid
										ref={this.gridRef}
										{...commonProps}
										{...commonGridProps}
										onScroll={this.onScroll}
										innerElementType={innerElementType}
										onItemsRendered={this.onItemsRendered}
										rowCount={this.props.data ? this.props.data.length + 1 : 1}
										itemData={{
											isSelected:this.isSelected,
											data:this.props.data,
											columns:this.props.columns,
											formatConditions:this.props.formatConditions ? this.props.formatConditions : [],
											onClick:this.handleClick,
										}}
									>
									{this.props.children ? this.props.children : Cell}
									</Grid>
								}
								<div ref={this.resizeLineRef} className='table-drag-line'></div>
								{!this.props.paginated && <div ref={this.dragColRef} className='draggable-table-column'></div>}
							</ColumnContext.Provider>
						);
					}}
				</AutoSizer>
			</div>
		);
	}
}

class InfiniteTableBody extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rowCount:0,
			data:[],
			fetchStatus:FETCHING_COMPLETED,
		}

		this.currColIndex = 0;
		this.currRowIndex = 0;
		this.loadingRequestRow = 0;
		this.isJumping = false;

		this.onItemsRendered = this.onItemsRendered.bind(this);
	}

	loadMoreItems(startIndex, withSearch) {
		if(this.props.dataId) {
			this.loadingRequestRow = startIndex;
			this.setState({
				fetchStatus:FETCHING,
			}, () => {
				axiosInstance
					.post('app/v1/data', {
						row:startIndex, 
						data_id:this.props.dataId,
					})
					.then(response => {
						this.setState({
							data: response.data.data.result,
							rowCount:response.data.data.num_rows,
							fetchStatus:FETCHING_COMPLETED,
						});
					})
					.catch(error => {
						this.setState({
							fetchStatus:FETCHING_FAILED,
						});
					});
				});
		}
	}

	searchItems() {
		this.setToZero();
		this.isJumping = true;

		// Jump.
		this.setState({
			fetchStatus:FETCHING,
		}, () => {
			axiosInstance
				.post("/v1/data/search", {
					'data_id': this.props.dataId, 
					'search_details': this.props.searchPacket
				})
				.then(response => {
					const dataIndex = response.data.data.data_index;
					const setIndex = response.data.data.set_index;
					const zeroIndex = dataIndex - setIndex;
					
					this.loadingRequestRow = zeroIndex;
					this.currRowIndex = zeroIndex + setIndex;

					this.setState({
						data: response.data.data.result,
						rowCount:response.data.data.num_rows,
						fetchStatus:FETCHING_COMPLETED,
					}, () => {
						this.props.gridRef.current.scrollToItem({
							align: this.props.searchPacket.align ? this.props.searchPacket.align : 'bottom',
							columnIndex: 0,
							rowIndex: zeroIndex + setIndex + 1,
						});
						this.isJumping = false;
					});
				})
				.catch(error => {
					this.setState({
						fetchStatus:FETCHING_FAILED,
					});
				});
			});
	}

	setToZero() {
		// Reset table to row/col 0.
		this.isJumping = true;
		this.loadingRequestRow = 0;
		this.currRowIndex = 0;
		this.props.gridRef.current.scrollToItem({
			align: "start",
			columnIndex: 0,
			rowIndex: 0,
		});
		this.isJumping = false;
	}

	setRowToZero() {
		// Reset table to row 0.
		this.isJumping = true;
		this.loadingRequestRow = 0;
		this.currRowIndex = 0;
		this.props.gridRef.current.scrollToItem({
			align: "start",
			rowIndex: 0,
		});
		this.isJumping = false;		
	}

	setColToZero() {
		// Reset table to col 0.
		this.isJumping = true;
		this.props.gridRef.current.scrollToItem({
			align: "start",
			colIndex: 0,
		});
		this.isJumping = false;		
	}

	componentDidUnMount() {
		// ws.send(JSON.stringify({'type':'terminate_pagination', "message":this.props.dataId}));
	}

	componentDidUpdate(prevProps, prevState) {
		// Terminate derived tables.
		if(prevProps.dataId !== this.props.dataId && prevProps.dataId) {
			// ws.send(JSON.stringify({'type':'terminate_pagination', "message":prevProps.dataId}));
		}

		if(prevProps.searchPacket !== this.props.searchPacket && this.props.dataId) {
			this.searchItems();
		}
		else if(prevProps.dataId !== this.props.dataId) {
			if(!this.props.keepRowIndex && !this.props.keepColIndex) {
				this.setToZero();
				this.loadMoreItems(0);
			} else if(!this.props.keepRowIndex && this.props.keepColIndex) {
				this.setRowToZero();
				this.loadMoreItems(0);
			} else if(this.props.keepRowIndex && !this.props.keepColIndex) {
				this.setColToZero();
				this.loadMoreItems(this.loadingRequestRow);
			} else {
				this.loadMoreItems(this.loadingRequestRow);
			}
		}
	}

	onItemsRendered(gridData) {	
		if(this.isJumping) {
			return;
		}

		const rowIndex = gridData.visibleRowStartIndex + 1;
		const rowCount = this.state.rowCount;

		this.currColIndex = gridData.visibleColumnStartIndex;

		this.props.onItemsRendered(rowIndex, this.currColIndex);

		// Scroll up.
		if(this.currRowIndex < rowIndex) {
			// If there are less than 200 rows in front of the user then make a new request.
			var upperBound = this.loadingRequestRow + 500;
			var numRowsInFront = upperBound - rowIndex;
			if(numRowsInFront >= 200 || this.loadingRequestRow === (rowCount - 500)) {
				return;
			}

			// New request aims to keep 100 rows behind the user and 400 in front.
			var loadingRequestRow = Math.max(Math.min(rowIndex - 100, (rowCount - 500)), 0);
			this.loadMoreItems(loadingRequestRow);			
		}
		else { // Scroll down.
			// If there are less than 200 rows behind the user then make a new request.
			var lowerBound = this.loadingRequestRow;
			var numRowsBehind = rowIndex - lowerBound;
			if(numRowsBehind >= 200 || this.loadingRequestRow === 0) {
				return;
			}

			// New request aims to keep 400 rows behind the user and 100 in front.
			var loadingRequestRow = Math.max(rowIndex - 400, 0);
			this.loadMoreItems(loadingRequestRow);
		}

		this.currRowIndex = rowIndex;
	}

	render() {		
		return (
			<div>
				<Grid
					ref={this.props.gridRef}
					{...this.props}
					onItemsRendered={this.onItemsRendered}
					rowCount={this.state.rowCount + 1} // + 1 for the header.
					innerElementType={innerElementType}
					onScroll={this.props.onScroll}
					itemData={{
						data:this.state.data,
						columns:this.props.columns,
						formatConditions:this.props.formatConditions ? this.props.formatConditions : [],
						onClick:this.props.onClick,
						startIndex:this.loadingRequestRow,
						isSelected:this.props.isSelected,
						dragIndex:this.props.dragIndex,
					}}
				>
				{this.props.children}
				</Grid>
				
				<div ref={this.props.forwardRef} className='draggable-table-column' style={ {width:this.props.dragColumn ? `${this.props.dragColumn.width}px` : '0px'} }>
					{this.props.dragColumn &&
						<ColumnContext.Provider value={{ 
								columns: [this.props.dragColumn], 
								onColResizeStart: () => '',
								onColResizeEnd: () => '',
								onColResize: () => '',
								onColDragStart: () => '',
								onColDragEnd: () => '',
								onColDrag: () => '',
								onSortUp: () => '',
								onSortDown: () => '',
								onApplyFilter: () => '',
								onRemoveFilter:() => '',
								onShowAdvancedFilters:() => '',
								orderPairs:this.props.orderPairs,
								whereFields:this.props.whereFields,
								dragIndex:null,
								getCurrColIndex:this.getCurrColIndex,
								getDistinctValues: () => '',
							}}>
								<Grid
									width={this.props.dragColumn.width}
									rowCount={50}
									innerElementType={innerElementType}
									columnCount={1}
									rowHeight={index => this.props.rowHeight ? this.props.rowHeight : 46}
									columnWidth={index => this.props.dragColumn.width}
									height={this.state.data.length * 19}
									itemData={{
										data:this.state.data,
										columns:[this.props.dragColumn],
										formatConditions:this.props.formatConditions ? this.props.formatConditions : [],
										onClick:this.props.onClick,
										startIndex:this.loadingRequestRow,
										isSelected:this.props.isSelected,
									}}
								>
								{Cell}
								</Grid>
						</ColumnContext.Provider>
					}
				</div>
				
			</div>
		);
	}
}						

export default DataTable;