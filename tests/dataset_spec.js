import Dataset from '../src/models/Dataset';

let testDataset = new Dataset({
  backend: 'csv',
  url: 'localhost://data/apollo-parsed-1737-325_0.csv',
  settings: {
    delimiter: ','
  }
});

console.log(testDataset);

describe('Test dataset load is sane', () => {
 it('Should load a class', () => {
  expect(typeof Dataset).toBe('function');
 });
});

describe('Dataset instance should quack like a duck', () => {
 it('Should have proper type', () => {
  expect(testDataset.backend.__type__).toBe('csv');
 });
});
