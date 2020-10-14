const editReducer = (state = {}, action) => {
    switch (action.type) {
      case 'DISPLAY_EDIT_WINDOW':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default editReducer;