import DataHandler from '../utils/DataHandler';

function identity(data) {
  return data;
}

DataHandler.set('identity', identity);