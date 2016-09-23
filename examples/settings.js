import {timeFormat as d3_timeFormat} from 'd3-time-format';
import colorbrewer from 'colorbrewer';
import d3 from 'd3';

export var settings = {
  title: 'UCR Offense Data',
  queries: {
    arrests_avg: {
      avg: "count"
    },
    arrests_sum: {
      sum: "count",
      fields: "count"
    },
    arrests_max: {
      max: "count"
    },
    arrests_min: {
      min: "count"
    },
    by_age: {
      groupBy: "adult_or_juvenil",
      sum: "count",
      fields: "adult_or_juvenil"
    },
    by_category: {
      groupBy: "category",
      sum: "count",
      fields: "category"
    },
    by_month: {
      groupBy: "month",
      sum: "count",
      fields: "month"
    },
    by_description: {
      groupBy: "description",
      sum: "count",
      fields: "description"
    },
    by_county: {
      groupBy: "county",
      sum: "count",
      fields: "county",
      limit: [0, 100]
    }
  }
}
