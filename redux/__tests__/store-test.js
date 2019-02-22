import store from '../store';

// Mock I18n
jest.mock('../../utils/i18n', () => ({}));

describe('redux setup', () => {
  it('exports a store with the necessary functions', () => {
    const exports = Object.keys(store);
    const result = ['dispatch', 'subscribe', 'getState', 'replaceReducer'];

    expect(exports).toEqual(result);
  });
});
