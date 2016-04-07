import Dataset from '../src/models/Dataset';

let testDataset = new Dataset({
  backend: 'csv',
  settings: {
    delimiter: ',',
    url: 'google.com'
  }
});

console.log(testDataset);

describe('Test dataset load is sane', () => {
 it('Should load a class', () => {
  expect(typeof Dataset).toBe('function');
 });
});

describe('Test async', () => {
  let a;
  beforeEach(done => {
    setTimeout(() => {
      a = 'l8r';
      done();
    }, 1250);
  });

  it('Should be l8r', done => {
    expect(a).toBe('l8r');
    done();
  });
});

/*
describe('Test vanilla fetch - make sure test server is up', () => {
  let a;
  beforeEach(done => {
    fetch('http://www.google.com')
      .then(res => {
        console.log('f1', res);
        return res.text();
      })
      .then(data => {
        a = data;
        console.log('f2', data);
        done();
      })
      .catch(e => {
        console.log('fERR', e);
        done();
      });
  });

  it('Should fetch data', done => {
    console.log('FF',a);
    expect(typeof a).toBe('string');
    done();
  });
});
*/
describe('Dataset instance should quack like a duck', () => {
 it('Should have proper type', () => {
  expect(testDataset.backend.__type__).toBe('csv');
 });
});
