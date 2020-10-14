import { showModalRoutine, hideModalRoutine } from '../actions';
const INITIAL_STATE = { show: 'none' }

export default (state = INITIAL_STATE , action) => {
    if(showModalRoutine.isSuccessAction(action)){
        return {...state, show: 'flex'};
    }
    if(hideModalRoutine.isSuccessAction(action)){
        return INITIAL_STATE;
    }
    return state;
};