import createReducer from '../createReducer';

describe('redux-utils', () => {
  const ActionTypes = {
    TEST_ACTION: 'TEST_ACTION',
  };

  const initialState = {
    foo: 'bar',
    testValue: false,
  };

  const handlers = {
    [ActionTypes.TEST_ACTION](state) {
      return {
        ...state,
        testValue: !state.testValue,
      };
    },
  };

  const reducer = createReducer(initialState, handlers);

  it('creates a working reducer from an object of handler functions', () => {
    expect(reducer(initialState, { type: ActionTypes.TEST_ACTION })).toEqual({
      foo: 'bar',
      testValue: true,
    });
  });

  it('returns the initial state if no handler exists', () => {
    expect(reducer(undefined, { type: 'NOT_A_REAL_ACTION' })).toEqual(
      initialState,
    );
  });
});
