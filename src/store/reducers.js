import {
  ADD_INVOICE,
  DELETE_INVOICE,
  UPDATE_INVOICE
} from './actions';

// const testData = {
//   id:0,
//   content: {
//     name: 'Test',
//     email: 'test@example.com',
//     dueDate: '2019-10-20',
//     items: [],
//     total: parseFloat(0.00).toFixed(2)
//   }
// };

const initialState = {
  invoices: [],
};

export default function invoices (state = initialState, action) {
  switch (action.type) {
    case ADD_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.payload]
      };
    case UPDATE_INVOICE:
      const updateState = {...state};
      const idxToUpdate = state.invoices.findIndex((item) => (parseInt(item.id) === parseInt(action.payload.id)));
      updateState.invoices[idxToUpdate] = action.payload;
      return updateState;
    case DELETE_INVOICE:
      const deleteState = {...state};
      const idxToDelete = state.invoices.findIndex((item) => (item.id.toString() === action.payload.id.toString()));
      deleteState.invoices.splice(idxToDelete, 1);
      return deleteState;
    default:
      return state;
  }
};
