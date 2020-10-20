const editReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SONG_TO_EDIT':
        return action.payload;
      case 'UPDATE_SONG_TO_EDIT':
        return {...state, ...action.payload};
      default:
        return state;
    }
  }
  
  export default editReducer;