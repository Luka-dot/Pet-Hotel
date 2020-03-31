import { FETCH_LOGIN } from '../actions/types';

const INITIAL_STATE = {      
    isLogged: false
}

export default function(state = INITIAL_STATE, action) {
    console.log(action.type)
  switch (action.type) {
    case FETCH_LOGIN :
        if (action.payload.status === 200) {
      return state.isLogged = true
        } else {
        return state;
        
    }
    default:
        return state;
  }
  
}
