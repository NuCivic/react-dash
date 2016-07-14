/****
 * Actions
 ****/

/*
 * Update App Filters
 * Replace filters for Component/Filter with passed filter values
 * Replace global filters with passed filter values
 *
 * @param filter.el {string} elementID/filterID or 'global'
 * @param filter.filterId {string} id of el's filter
 * @param filter.vals {} values to assign to scope filter
 */
export function updateFilter(filter) {
  console.log('filter act called', filter);
  // @@TODO when filters are update we should update the
  return {
    type: 'update_filter',
    el: filter.el,
    filterId: filter.filterId,
    vals: filter.vals
  }
}
