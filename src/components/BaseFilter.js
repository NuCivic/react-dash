import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';

export default class BaseFilter extends BaseComponent {
  getFilterValue() {
    let val;

    if (this.isDisabled()) {
      return [];
    }

    if (this.props.appliedFilters && this.props.appliedFilters[this.props.field]) {
      val = this.props.appliedFilters[this.props.field].value;
    } else if (this.props.initVal) {
      val = this.props.initVal;
    } else if (this.props.options) {
      val = this.props.options[0].value;
    } else if (this.state.data && this.state.data[0]) {
      val = this.state.data[0][0].value.values;
    }

    return val;
  }

  /**
   * @@IMPLEMEMT
   */
  onFilter() {
    // noop / use this to add onFilter behavior
  }

  onChange(e) {
    this.onFilter(e);

    const filter = Object.assign({}, this.props);

    filter.value = e;
    filter.multi = this.props.multi;
    filter.actionType = this.state.actionType;

    this.emit(filter);
  }

  // Check if the filter is disabled
  // Filters can be disabled via props, or if a specified filter is present
  // in applied filters
  isDisabled() {
    let disabled = false;
    const appliedFilters = (this.props.appliedFilters)
      ? Object.keys(this.props.appliedFilters)
      : [];

    if (this.props.disabled) disabled = true;

    if (this.props.disabledBy) {
      this.props.disabledBy.forEach((field) => {
        if (appliedFilters.indexOf(field) >= 0) disabled = true;
      });
    }

    return disabled;
  }

  getData() {
    const data = this.props.data;
    return data;
  }

  /**
   * get autocomplete options
   */
  getOptions(input) {
    const data = this.getData();

    if (this.props.options) {
      return this.props.options;
    // Use component level data
    } else if (data && data[0]) {
      return this.props.data[0];
    }

    return [];
  }
}

Registry.set('BaseFilter', BaseFilter);
