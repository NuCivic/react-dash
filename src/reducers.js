/****
 * Reducers
 ****/
export function filterParams(state = {}, action) {
  if (action.type === 'update_filter') {
    const newFilters = set({}, [action.el, action.filterId]);
    newFilters[action.el][action.filterId] = action.vals;
    console.log('update_filter', newFilters);
    return Object.assign({}, state, newFilters);
  } else {
    return state;
  }
}
