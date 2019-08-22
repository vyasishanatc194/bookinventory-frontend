import * as actionType from '../actions/actionTypes';

const initialState={
    bookList: [],
    category: [],
    loading: false
}

const setBooksData = (state, action) => {
    return {
        ...state,
        bookList: action.book,
    }
}

const setCategory = (state, action) => {
    return {
        ...state,
        category: action.category,
    }
}

const loaderStart = (state, action) => {
    return {
      ...state,
      loading: true
    };
  };
  
  const loaderStop = (state, action) => {
    return {
      ...state,
      loading: false
    };
  };



const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionType.SET_BOOKS_DATA:
            return setBooksData(state, action);
        case actionType.SET_CATEGORY_DATA:
            return setCategory(state, action);
        case actionType.LOADER_START:
            return loaderStart(state, action);
        case actionType.LOADER_STOP:
            return loaderStop(state, action);
        default:
            return state
    }
}

export default reducer;