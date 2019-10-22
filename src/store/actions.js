/*
 * action types
 */
export const ADD_INVOICE = 'ADD_INVOICE';
export const DELETE_INVOICE = 'DELETE_INVOICE';
export const UPDATE_INVOICE = 'UPDATE_INVOICE';

/*
 * action creators
 */

let nextInvoiceId = 0;

export const addInvoice = content => {
  return { 
    type: ADD_INVOICE, 
    payload: {
      id: ++nextInvoiceId,
      content
    } 
  };
}

export const deleteInvoice = id => {
  return { 
    type: DELETE_INVOICE, 
    payload: {
      id
    } 
  };
}

export const updateInvoice = (id, content) => {
  return { 
    type: UPDATE_INVOICE, 
    payload: {
      id,
      content
    } 
  };
}
