import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import EventDispatcher from '../dispatcher/EventDispatcher';
import StateHandler from '../utils/StateHandler';
import { makeKey } from '../utils/utils';

const CARD_VARS = ['header', 'footer', 'iconClass', 'cardStyle', 'cardClasses', 'subheader', 'topmatter', 'subheader2', 'topmatter2', 'footerHeader', 'footerSubheader', 'bottommatter', 'footerSubheader2', 'bottommatter2'];

export default class BaseComponent extends Component {
  propTypes: {
    queryObj: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.makeKey = makeKey;
    this.state = {
      data: [],
      dataset: null,
      queryObj: Object.assign({ from: 0 }, this.props.queryObj), // dataset query
      isFetching: false,
    };
  }

  /**
   * LIFECYCLE
   **/
  componentWillMount() {
    // Register to all the actions
    EventDispatcher.register(this.onAction.bind(this));
  }

  componentDidMount() {
    // resize magic
    const componentWidth = findDOMNode(this).getBoundingClientRect().width;
    const newState = this.executeStateHandlers();

    newState.componentWidth = componentWidth;
    newState.cardVariables = this.getCardVariables();

    this.setState(newState);
    this.addResizeListener();
    this.onResize();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.props.data, prevProps.data)) {
      const newState = this.executeStateHandlers();
      newState.cardVariables = this.getCardVariables();
      this.setState(newState);
      this.onResize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeHandler);
  }

  onResize() {
    /* IMPLEMENT */
  }

  onAction() {
    /* IMPLEMENT */
  }

  getGlobalData() {
    return this.props.globalData || [];
  }

  /**
   * if we have card variables set on the state,
   * return them otherwise use props or undefined
   */
  getCardVariables() {
    const cardVars = {};

    CARD_VARS.forEach((v) => {
      cardVars[v] = this.state[v] || this.props[v];
    });

    return cardVars;
  }

  /**
   * If stateHandlers are defined on the component call them and return the result
   *
   * @returns {obj} object with calculated state paramaters
   */
  executeStateHandlers() {
    let newState = {};

    if (this.props.stateHandlers && this.props.stateHandlers.length > 0) {
      const handledState = StateHandler.handle(
        this.props.stateHandlers,
        this.props.data,
        this.state.dashboardData,
      );

      newState = Object.assign(newState, handledState);
    }

    return newState;
  }

  emit(payload) {
    EventDispatcher.dispatch(payload);
  }

  addResizeListener() {
    this._resizeHandler = (e) => {
      const componentWidth = findDOMNode(this).getBoundingClientRect().width;

      this.setState({ componentWidth });
      this.onResize(e);
    };

    window.addEventListener('resize', this._resizeHandler);
  }
}
