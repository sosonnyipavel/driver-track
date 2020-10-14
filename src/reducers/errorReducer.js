import { showErrorRoutine } from '../actions';

const INITIAL_STATE = {
    errorMessage: null
};

export default (state = INITIAL_STATE, action) => {
    if(showErrorRoutine.isSuccessAction(action)){
        if (action.payload.status === 401) {
            localStorage.removeItem('token');
            return {...state, errorMessage: 'Missing or wrong token'};
        } else {
            return {...state, errorMessage: action.payload.message};
        }
    } 
    return INITIAL_STATE;
};