const songReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SONGS':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default songReducer;