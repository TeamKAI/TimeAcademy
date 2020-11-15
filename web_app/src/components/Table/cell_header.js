import React from 'react';
import Draggable from "react-draggable";
import uuidv1 from "uuid";

import BackgroundCell from './background_cell.js';

import { TableField, Condition, ConditionGroup } from 'api/utils/wherefields.js';

import { PortalWithState } from 'react-portal';

class CellHeader extends React.Component {
	constructor(props) {
		super(props);

		this.onApplyFilter = this.onApplyFilter.bind(this);
		this.onRemoveFilter = this.onRemoveFilter.bind(this);
		this.onShowAdvancedFilters = this.onShowAdvancedFilters.bind(this);

		this.uuid = `_${uuidv1()}`;
	}

	onApplyFilter(column, value, uncheckedItems) {		
		if(this.props.onApplyFilter) {
			this.props.onApplyFilter(column, value, uncheckedItems);
		}
	}

	onRemoveFilter(column) {			
		if(this.props.onRemoveFilter) {
			this.props.onRemoveFilter(column);
		}
	}

	onSortUp(column) {
		if(this.props.onSortUp) {
			this.props.onSortUp(column);
		}
	}

	onSortDown(column) {
		if(this.props.onSortDown) {
			this.props.onSortDown(column);
		}
	}

	onShowAdvancedFilters() {
		if(this.props.onShowAdvancedFilters) {
			this.props.onShowAdvancedFilters();
		}
	}

	position() {
		const parent = document.querySelector(`#${this.uuid}`);
		return parent 
			? {
				x: this.props.left + this.props.column.width > 150 ? (parent.getBoundingClientRect().x + parent.getBoundingClientRect().width) - 150 : parent.getBoundingClientRect().x, 
				y: parent.getBoundingClientRect().y + parent.getBoundingClientRect().height
			} 
			: {x:0, y:0};
	}

	render() {
		const column = this.props.column;

		if(this.props.dragIndex === this.props.index) {
			return <BackgroundCell style={this.props.style} className='table-header'/>
		}
		
		var isFiltered = false;
		if(this.props.whereFields) {
			var whereFields = this.props.whereFields.flattern();
			if(column.type === 'ColumnType.COLUMN_GROUP') {
				column.columnGroupRules.forEach((colRule) => {
					isFiltered = isFiltered || whereFields.some((condition) => condition.baseField.name === colRule.columnToPlace.name);
				});
			} else {
				isFiltered = whereFields.some((condition) => condition.baseField.name === column.name);
			}
		}

		var orderPair;
		if(this.props.orderPairs) {
			if(column.type === 'ColumnType.COLUMN_GROUP') {
				column.columnGroupRules.forEach((colRule) => {
					orderPair = orderPair ? orderPair : this.props.orderPairs.find((orderPair) => orderPair.field.name === colRule.columnToPlace.name);
				});
			} else {
				orderPair = this.props.orderPairs.find((orderPair) => orderPair.field.name === column.name);
			}
		}

		var unCheckedItems = [];
		if(this.props.uncheckedConditionGroup) {
			if(column.type === 'ColumnType.COLUMN_GROUP') {
				this.props.uncheckedConditionGroup.conditions.forEach((conditionGroup) => {
					if(conditionGroup.conditions[0].type === 'ConditionGroup') {
						conditionGroup = conditionGroup.conditions[0];
					}

					var filters = [];
					column.columnGroupRules.forEach((colRule) => {
						var filterName = colRule.columnToPlace.name;
						if(!filters.includes(filterName)) {
							filters.push(filterName);
							if(conditionGroup.conditions[0].baseField.name === colRule.columnToPlace.name) {
								unCheckedItems.push(conditionGroup);
							}
						}
					});
				});
			} else {
				this.props.uncheckedConditionGroup.conditions.forEach((conditionGroup) => {
					if(conditionGroup.conditions[0].type === 'ConditionGroup') {
						conditionGroup = conditionGroup.conditions[0];
					}
					if(conditionGroup.conditions[0].baseField.name === column.name) {
						unCheckedItems.push(conditionGroup);
					}
				});
			}
		}

		return (
			<div style={this.props.style} className='table-header' id={this.uuid}>
				
				<div>
					<div className='cell-content'>
						{column.displayName}
					</div>
					
					{column.isFilterable && 
						<PortalWithState closeOnOutsideClick closeOnEsc>
							{({ openPortal, closePortal, isOpen, portal }) => (
								<React.Fragment>
									<div onClick={openPortal}>
										<span className='filter-arrow'>
											<i className={isFiltered ? "mdi mdi-filter" : "fa fa-caret-down"}></i>
										</span>
									</div>
									{portal(
										<QuickFilter
											x={this.position().x}
											y={this.position().y}
											table={this.props.table}
											uncheckedConditions={unCheckedItems}
											getDistinctValues={this.props.getDistinctValues}
											column={column}
											isFiltered={isFiltered}
											
											onSortUp={() => {
												this.onSortUp(column);
												closePortal();
											}}
											onSortDown={() => {
												this.onSortDown(column);
												closePortal();
											}}
											onApplyFilter={(value, unCheckedItems) => {
												this.onApplyFilter(column, value, unCheckedItems);
												closePortal();
											}}
											onRemoveFilter={() => {
												this.onRemoveFilter(column);
												closePortal();
											}}
											onShowAdvancedFilters={() => {
												this.onShowAdvancedFilters();
												closePortal();
											}}
										/>
									)}
								</React.Fragment>
							)}
						</PortalWithState>
					}

					{orderPair && <div><span className='sort-arrow'><i className={orderPair.modifier === 'ASC' ? "mdi mdi-arrow-up" : "mdi mdi-arrow-down"}></i></span></div>}
				
				</div>
				
				<span className="DragHandleTop" onMouseDown={(event) => this.props.onColDragStart(event, column)}>
				</span>
				
				<Draggable
					axis="x"
					handle=".DragHandleIcon"
					defaultPosition={{x: 0, y: 0}}
					position={{x: 0, y: 0}}
					scale={1}
					onStart={this.props.onColResizeStart}
					onDrag={this.props.onColResize}
					onStop={(event, delta) => this.props.onColResizeEnd(event, delta, column)}
				>
					<span className="DragHandleIcon"></span>
				</Draggable>
			
			</div>
		);
	}
}

class QuickFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue:'',
			uncheckedItems:this.props.uncheckedConditions ? this.props.uncheckedConditions : [],
			distinctValues:[],
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.getHeight = this.getHeight.bind(this);
		this.onCheckToggle = this.onCheckToggle.bind(this);
		this.getFilterTableHeight = this.getFilterTableHeight.bind(this);
		this.createConditionGroup = this.createConditionGroup.bind(this);
		this.isChecked = this.isChecked.bind(this);
	}

	componentDidMount() {
		if(this.props.getDistinctValues) {

			// Add checkboxes for items that have been unchecked.
			this.addUncheckedConditions = function (distinctValues) {
				if(this.props.uncheckedConditions) {
					this.props.uncheckedConditions.forEach((conditionGroup) => {
						if(!distinctValues.some((item) => item === conditionGroup.conditions[0].conditionObject)) {
							distinctValues.push(conditionGroup.conditions[0].conditionObject);
						}
					})
				}			
			}

			// Have just 1 condition for null and empty string.
			this.addEmptyCondition = function (distinctValues) {
				var containsEmpty = false;
				var vals = distinctValues.filter((val) => {
					var remove = val !== '' && val !== null;
					containsEmpty = remove || containsEmpty;
					return remove;
				});

				if(containsEmpty) {
					vals.push('');
				}

				return vals;
			}
			
			// Column group requires values from multiple places.
			if(this.props.column.type === 'ColumnType.COLUMN_GROUP') {
				var i = 0;
				var values = [];
				this.props.column.columnGroupRules.forEach((colRule) => {
					this.props.getDistinctValues(colRule.columnToPlace, (distinctValues) => {
						distinctValues.forEach((val) => {
							if(!values.includes(val)) {
								values.push(val);
							}
						});

						i = i + 1;
						if(i === this.props.column.columnGroupRules.length) {
							this.addUncheckedConditions(values);
							values = this.addEmptyCondition(values);
							this.setState({
								distinctValues: values.sort(),
							});
						}
					});
				});
			} else {
				// Single column.
				this.props.getDistinctValues(this.props.column, (distinctValues) => {
					this.addUncheckedConditions(distinctValues);
					distinctValues = this.addEmptyCondition(distinctValues);
					this.setState({
						distinctValues:distinctValues.sort(),
					})
				});				
			}
		}
	}

	createConditionGroup(name, column) {
		var conditionGroup = new ConditionGroup(true);
		if(name.trim() === "") {
			conditionGroup.addCondition(new Condition('NotEqualObjectCondition', new TableField(this.props.table, column.name), "", true));
			conditionGroup.addCondition(new Condition('NotEqualObjectCondition', new TableField(this.props.table, column.name), null, true));
		} else {
			conditionGroup.addCondition(new Condition('NotEqualObjectCondition', new TableField(this.props.table, column.name), name, false));
			conditionGroup.addCondition(new Condition('EqualObjectCondition', new TableField(this.props.table, column.name), null, false));
		}

		return conditionGroup;
	}

	isChecked(value) {
		return !this.state.uncheckedItems.some((conditionGroup) => {
			if(conditionGroup.conditions[0].type === 'ConditionGroup') {
				conditionGroup = conditionGroup.conditions[0];
			}
			return conditionGroup.conditions[0].conditionObject === value;
		});
	}

	onCheckToggle(name) {		
		const unChecked = !this.isChecked(name);
		if(unChecked) {
			this.setState(prevState => ({
				uncheckedItems:prevState.uncheckedItems.filter((conditionGroup) => {
					if(conditionGroup.conditions[0].type === 'ConditionGroup') {
						conditionGroup = conditionGroup.conditions[0];
					}
					return conditionGroup.conditions[0].conditionObject !== name;
				})
			}));
		} else {
			var newConditionGroups = [];
			if(this.props.column.type === 'ColumnType.COLUMN_GROUP') {
				var appliedFilters = [];
				if(name === '') {
					// filter out when only when all columns are simultaneously null / empty strings
					var conditionGroup = new ConditionGroup(true);
					newConditionGroups.push(conditionGroup);
					this.props.column.columnGroupRules.forEach((colRule) => {
						var column = colRule.columnToPlace;
						var filterName = column.name;
						if(!appliedFilters.includes(filterName)) {
							appliedFilters.push(filterName);
							var emptyConditionGroup = new ConditionGroup(false);
							emptyConditionGroup.addCondition(new Condition('NotEqualObjectCondition', new TableField(this.props.table, filterName), "", true));
							emptyConditionGroup.addCondition(new Condition('NotEqualObjectCondition', new TableField(this.props.table, filterName), null, true));
							conditionGroup.addCondition(emptyConditionGroup);
						}
					});
				} else {
					this.props.column.columnGroupRules.forEach((colRule) => {
						var filterName = colRule.columnToPlace.name;
						if(!appliedFilters.includes(filterName)) {
							appliedFilters.push(filterName);
							newConditionGroups.push(this.createConditionGroup(name, colRule.columnToPlace));
						}
					});
				}
			} else {
				newConditionGroups.push(this.createConditionGroup(name, this.props.column));
			}

			this.setState(prevState => ({
				uncheckedItems:[...prevState.uncheckedItems, ...newConditionGroups]
			}));
		}
	}

	handleInputChange(event) {
		this.setState({
			inputValue: event.target.value,
		});
	}

	onKeyDown(event) {
		if (event.key === 'Enter' && this.props.onApplyFilter) {
			this.props.onApplyFilter(this.state.inputValue, this.state.uncheckedItems);
		}
	}

	getHeight() {
		const padding = 4;
		const top = 81;
		const buttonRow = 27;

		return this.getFilterTableHeight() + top + (padding * 2) + buttonRow;
	}

	getFilterTableHeight() {
		const rowHeight = 27;
		const numRows = Math.min(this.state.distinctValues.length, 4);
		const seperator = 1;
		const seperatorMargin = 2;

		return (numRows * rowHeight) + (this.state.distinctValues.length > 0 ? (seperator + seperatorMargin) : 0) ;
	}

	render() {
		return (
			<div className='quick-filter' style={{
				height:this.getHeight(),
				left:`${this.props.x}px`, 
				top:`${this.props.y}px`,
			}}>
				<div className='top-to-bottom' style={{padding:'4px'}}>
					<div className='widget'>
						<div className='top-to-bottom'>
							<div className='row'>
								<div className='left-to-right'>
									<input 
										className='widget' 
										placeholder='Filter...' 
										onChange={this.handleInputChange}
										value={this.state.inputValue}
										onKeyDown={this.onKeyDown}
									/>
									<div 
										className='menu-icon widget'
										onClick={this.props.onSortDown}
									>
										<i className="mdi mdi-sort-descending"></i>
									</div>
									<div 
										className='menu-icon widget'
										onClick={this.props.onSortUp}
									>
										<i className="mdi mdi-sort-ascending"></i>
									</div>
								</div>
							</div>
							<div className='row' onClick={this.props.onRemoveFilter}>
								<div className='left-to-right'>
									<div className='widget'>Remove Filters</div>
								</div>
							</div>
							<div className='row' onClick={this.props.onShowAdvancedFilters}>
								<div className='left-to-right'>
									<div className='widget'>More Filters</div>
								</div>
							</div>
							<div className='row'>
								<div className='left-to-right'>
									<button 
										style={{lineHeight:"13px"}}
										onClick={() =>this.props.onApplyFilter(this.state.inputValue, this.state.uncheckedItems)}
									>
									Submit
									</button>
								</div>
							</div>
						</div>
					</div>
					{this.state.distinctValues.length > 0 && 
						<div className='widget' style={{flex:`0 0 ${this.getFilterTableHeight()}px`}}>
							<div className='top-to-bottom'>
								<div className='widget pseudo-border' style={{
									flex:'0 0 1px',
									margin:'1px 0px',
									width:'100%'
								}}></div>
								<div className='widget'>
									<div className='top-to-bottom' style={{
										overflowY:'auto',
										overflowX:'hidden',
									}}>
										<table style={{
											tableLayout:'fixed',
											width: '100%',
    										borderCollapse: 'collapse',
										}}>
											<tbody>
												{this.state.distinctValues.map((value, i) => {
													return (
														<tr key={i} style={{position:'relative'}}>
															<td style={{
																overflow:'hidden',
																width:'90%',
																textOverflow:'ellipsis',
															}}>{value}</td>
															<td style={{
																width: '10%',
																padding:'0px 2px'
															}}>
																<input 
																	type='checkbox' 
																	style={{height:'11px', width: '11px'}}
																	checked={this.isChecked(value)}
																	onChange={() => this.onCheckToggle(value)}
																/>								
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					}
				</div>
			</div>
		);
	}
}

export default CellHeader;