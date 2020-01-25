import { EDIT_PRODUCT, SELECTED_PRODUCT } from "./types";
export const setSelectedProduct = product => dispatch => {
  dispatch({
    type: SELECTED_PRODUCT,
    payload: product
  });
};

export const editProduct = data => dispatch => {
  dispatch({
    type: EDIT_PRODUCT,
    payload: data
  });
};
