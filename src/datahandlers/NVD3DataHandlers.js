import DataHandler from '../utils/DataHandler';

function identity(componentData, dashboardData) {
  return componentData;
}

DataHandler.set('identity', identity);