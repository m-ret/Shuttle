/**
 * Creates a reducer from an object containing action-handling functions.
 *
 * Example handler object:

    import { ACTION_NAME } from './constants';

    const handlers = {
      [ACTION_NAME](state, action) {
        // make any necessary changes to the state
        return {
          ...state,
          action.payload.someValue,
        },
      },
    };

 *
 * @param  {String}   initialState default state if none exists already
 * @param  {Object}   handlers     object of functions
 * @return {Function}              reducer for use with Redux’s combineReducers
 */
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (action && Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

export default createReducer;
