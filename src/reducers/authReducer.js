import { logInRoutine, logOutRoutine } from '../actions';
const INITIAL_STATE = {id: null};

export default (state = INITIAL_STATE, action) => {

    if(logInRoutine.isSuccessAction(action)){
        return {...state, id: action.payload.data.session.id};
    }
    if(logOutRoutine.isSuccessAction(action)){
        return {...state, id: null};
    }
    return INITIAL_STATE;
};