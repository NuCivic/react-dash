import DataHandler from '../utils/DataHandler';

function identity(componentData, dashboardData) {
  //console.log(otherParam) => 'usethis';
  return componentData;
}

DataHandler.set('identity', identity);