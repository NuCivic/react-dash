import {Table as FixedTable, Column, Cell} from 'fixed-data-table';
import Registry from '../utils/Registry';
import React, {Component} from 'react';
import {getProp} from '../utils/utils';
import Card from './Card';
import BaseComponent from './BaseComponent';
import Loader from './Loader';
import DataTable from './DataTable';
import { partialRight } from 'lodash';

export default class GoalTable extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      gridWidth: 1,
      gridHeight: 1
    }
  }
  
  onResize() {
    const { offsetWidth, offsetHeight } = this.refs.table;
    this.setState({
      gridWidth: offsetWidth,
      gridHeight: offsetHeight
    });
  }

  getGoalHeaders() {
    let headers = ['<strong>Points Available</strong>', '<strong>Points Earned</strong>'];
    headers.unshift('Description value goes her bruh');
    return headers;
  }
  
  render() {
    const { gridWidth, gridHeight } = this.state;
    let data = this.props.data[0] || [];
    let headers = Object.keys(data[0] || {});
    let props = Object.assign({}, this.props);
    let tableDefaultProps = getProp('settings.table', this.props);
    let columnDefaultProps = getProp('settings.columns', this.props);
    let cellsDefaultProps = getProp('settings.cells', this.props);
    let content;
    
    console.log('>>>>>', props);

    let col0 =
      <Column
        header={
          <Cell>
            <strong className="goal-name">{this.props.goalName}</strong>
            <span className="goal-desc">{this.props.description}</span>
          </Cell>
        }
        key={this.state.key + '_col0'}
        columnKey={0}
        flexGrow={1}
        {...columnDefaultProps}
        cell={_props => {
          console.log("PORPS", _props);
          return <Cell {..._props} {...cellsDefaultProps}>
            <strong>
              {props.goalLevels[_props.rowIndex].goal}
            </strong>
            <span>
              {props.goalLevels[_props.rowIndex].description}
            </span>
          </Cell>
        }}
      />

    let col1 =
      <Column
        header={
          <Cell>
            <strong>Points Available</strong>
          </Cell>
        }
        key={this.state.key + '_col1'}
        columnKey={1}
        flexGrow={1}
        {...columnDefaultProps}
        cell={_props => {
          console.log("_PORPS", _props);
          return <Cell {..._props} {...cellsDefaultProps}>
              <strong>
                {props.goalLevels[_props.rowIndex].points}
              </strong>
            </Cell>
        }}
      />

    let columns=[col0, col1];

    // Return the renderable elements
    return (
      <Card key={'card_'+this.state.key} {...this.state.cardVariables}>
        <div ref="table">
          <Loader isFetching={this.state.isFetching}>
            <div className="table-container">
              <FixedTable {...tableDefaultProps} rowsCount={props.goalLevels.length} width={gridWidth}>
                {columns}
              </FixedTable>
            </div>
          </Loader>
        </div>
      </Card>
    );
  }
}

Registry.set('GoalTable', GoalTable);
