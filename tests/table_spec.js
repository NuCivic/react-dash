import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Registry} from '../src/ReactDashboard';
import Table from '../src/components/Table';

let settings = 
                {
                  type: 'GATable',
                  header: 'TABLE AAA',
                  key: '1a', // arbitrary unique key for react rendering
                  fetchData: {
                    type:'backend',
                    backend: 'csv',
                    url: 'http://demo.getdkan.com/node/9/download',
                  },
                  cardStyle: 'table',
                  settings: {
                    table: {
                      rowHeight: 40,
                      width: 800,
                      maxHeight: 300,
                      headerHeight:40
                    },
                    columns: {
                      flexGrow: 1,
                      width: 150,
                      overrides: {
                        a1: {
                          flexGrow: 0.5
                        }
                      }
                    },
                    cells: {
                      height: 40,
                      width: 500,
                      overrides: {
                        1: {
                          height: 40
                        }
                      }
                    }
                  }
                };

describe('Instantiate Chart component', () => {
  it('Component should render as React DOM node', () => {
    let component = React.createElement(Registry.get('Table'), settings);
    console.log(component.state);
    let node = TestUtils.renderIntoDocument(component);
    console.log(node.state.queryObj);
    expect(node.props.header).toBe('TABLE AAA');
  });
});

// @@TODO Sanity check Table in DOM
