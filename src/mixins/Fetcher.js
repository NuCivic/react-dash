import { Component } from 'react';

class Fetcher extends Component {
  constructor (props) {
    super(props);
    this.state.fetcher = true
  }

  componentDidMount (props) {
    console.log('Fetcher', this);
  }
}

export default Fetcher;
