import Context from '../src/Context';

export default class AppContext extends Context {
  constructor(component) {
    super(component);
  }

  getData(data) {
    return this.component.state.data;
  }

  getRandomMetric() {
    return Math.floor(Math.random() * 1000);
  }

  getCSVData(data) {
    console.log(data)
  }

  onAutocompleteChange(value) {
    // console.log(value)
  }

  getTableData() {
    return [
      {
        a1: 'a2',
        b1: 'b2',
        c1: 'c2',
      },
      {
        a1: 'a3',
        b1: 'b3',
        c1: 'c3',
      }
    ];
  }
}
