import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../../reducers/rootReducer';
import initialState from '../../reducers/initialState';
import * as documentActions from '../../actions/documentActions';
import * as userActions from '../../actions/userActions';

describe('Store', () => {
  it('should return a list of all documents.', () => {
    const store = createStore(rootReducer, initialState);

    const documents = [
      { title: 'title3' },
      { title: 'titl5' },
    ];

    const action = documentActions.getDocumentSuccess(documents);
    store.dispatch(action);

    const actual = store.getState().documents;
    const expected = documents;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('object');
  });

  it('Should handle creating documents', () => {
    const store = createStore(rootReducer, initialState);
    const document = {
      title: 'x titlt',
      content: 'x content',
      access: 'public',
    };

    const action = documentActions.createDocumentSuccess(document);
    store.dispatch(action);

    const actual = store.getState().documents[0];
    const expected = document;

    expect(actual).toEqual(expected);
  });

  it('Should handle updating documents', () => {
    const store = createStore(rootReducer, initialState);
    const documents = [
      { id: '1', title: 'kool kat' },
      { id: '2', title: 'slimey' },
    ];

    const document = { id: '1', title: 'kool' };

    const action = documentActions.updateDocumentSuccess(document);
    store.dispatch(action);

    const actual = store.getState().documents;
    const expected = [
      { id: '1', title: 'kool' },
    ];

    expect(actual).toEqual(expected);
  });
});
