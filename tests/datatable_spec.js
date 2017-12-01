import React, { Component } from 'react';
import {DataTable} from 'datatables.net-responsive-bs';


const settingsMock = {
  header: 'Test Header'
};



describe('DataTables component', () => {
  class mock extends Component {}

  var comp = new mock(settingsMock);
  
  it('Should have props', () => {

    expect(comp.props.header).toEqual('Test Header');
  });

});




