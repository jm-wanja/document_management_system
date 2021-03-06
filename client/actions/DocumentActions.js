/**
 * @desc Handles all actions relating to Documents on the App
 */
import axios from 'axios';
import * as types from './ActionTypes';


export function passSuccessMessage(successMessage) {
  return { type: types.SUCCESS_MESSAGE, successMessage };
}

export function passFailureMessage(errorMessage) {
  return { type: types.ERROR_MESSAGE, errorMessage };
}

export function searchDocumentsSuccess(paginatedDocuments) {
  return { type: types.SEARCH_DOCUMENTS_SUCCESS, paginatedDocuments };
}

export function getDocumentSuccess(documents) {
  return { type: types.GET_ALL_DOCUMENTS_SUCCESS, documents };
}

export function getPaginateDocumentSuccess(paginatedDocuments) {
  return { type: types.GET_PAGINATE_DOCUMENTS_SUCCESS, paginatedDocuments };
}

export function getOneDocumentSuccess(document) {
  return { type: types.GET_ONE_DOCUMENT_SUCCESS, document };
}

export function getUserDocumentSuccess(documents) {
  return { type: types.GET_USER_DOCUMENTS_SUCCESS, documents };
}

export function deleteDocumentSuccess(documentId) {
  return { type: types.DELETE_DOCUMENT_SUCCESS, documentId };
}

export function createDocumentSuccess(document) {
  return { type: types.CREATE_DOCUMENT_SUCCESS, document };
}

export function updateDocumentSuccess(document) {
  return { type: types.UPDATE_DOCUMENT_SUCCESS, document };
}

/**
 * @desc search for documents via GET /api/search/documents/
 *
 * @export
 * @param {any} queryString - The query to be searched for
 * @returns {any} the documents to be fetched.
 */
export function search(title) {
  return dispatch => axios.get(`/api/search/documents/?q=${title}`)
  .then((response) => {
    dispatch(searchDocumentsSuccess(response.data));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error));
  });
}

/**
 * @desc fetch all public and role documents via GET /api/documents/
 *
 * @export
 * @param {number} offset - The offset for pagination
 * @returns {any} the documents to be fetched.
 */
export function getAllDocuments(documents) {
  return dispatch => axios.get('/api/documents', documents)
    .then((response) => {
      dispatch(getDocumentSuccess(response.data));
    })
    .catch((error) => {
      dispatch(passFailureMessage(error.response));
    });
}

export function paginateDocuments(limit, offset) {
  return dispatch => axios.get(`/api/documents/?limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch(getPaginateDocumentSuccess(response.data));
    })
    .catch((error) => {
      dispatch(passFailureMessage(error.response));
    });
}

/**
 * @desc fetch all documents for a user via GET /api/users/:id/documents/
 *
 * @export
 * @param {number} id - The ID of the user
 * @returns {any} the document to be fetched.
 */
export function getUserDocuments(id) {
  return dispatch => axios.get(`api/users/${id}/documents`)
  .then((response) => {
    dispatch(getUserDocumentSuccess(response.data));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
  });
}

/**
 * @desc fetch a document via GET /api/documents/:id
 *
 * @export
 * @param {number} id - The ID of the document to be obtained
 * @returns {object} the document to be fetched.
 */
export function getOneDocument(id) {
  return dispatch => axios.get(`/api/documents/${id}`)
  .then((response) => {
    dispatch(getOneDocumentSuccess(response.data));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error));
  });
}

/**
 * @desc create document via POST /api/documents
 *
 * @export
 * @param {any} document - The document to be created
 * @returns {object} fetches all documents
 */
export function createDocument(document) {
  return dispatch => axios.post('api/documents', document)
  .then((response) => {
    dispatch(passSuccessMessage(response.data.message));
    dispatch(createDocumentSuccess(response.data.document));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
  });
}

/**
 * @desc update document via PUT /api/documents/:id
 *
 * @export
 * @param {number} id - The ID of the document to be updated
 * @param {any} document - The updated content of the document
 * @returns {object} documents
 */
export function updateDocument(id, document) {
  return dispatch => axios.put(`/api/documents/${id}`, document)
  .then((response) => {
    dispatch(updateDocumentSuccess(response.data.document));
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
  });
}

/**
 * @desc delete document via DELETE /api/documents/:id
 *
 * @export
 * @param {number} id - The ID of the document to be deleted
 * @returns {object} documents
 */
export function deleteDocument(id) {
  return dispatch => axios.delete(`/api/documents/${id}`)
  .then((response) => {
    dispatch(deleteDocumentSuccess(id));
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
  });
}

