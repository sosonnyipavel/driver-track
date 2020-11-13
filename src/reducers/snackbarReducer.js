import { showErrorRoutine, hideSnackbarRoutine, showSuccessRoutine } from '../actions';

const INITIAL_STATE = {
    errorMessage: '',
    setError: false,
    setSuccess: false
};

export default (state = INITIAL_STATE, action) => {
    if(showErrorRoutine.isSuccessAction(action)){
        if(action.payload.response){
            if (action.payload.response.status === 401) {
                localStorage.removeItem('token');
                return {...state, 
                    errorMessage: 'Missing or wrong token',
                    setError: true
                };
            } 
            else {
                return {...state, 
                    errorMessage: action.payload.response.data.error.message,
                    setError: true
                };
            }
        } else {
            return {...state, 
                errorMessage: action.payload.message,
                setError: true
            };
        }
    }
    if(showSuccessRoutine.isSuccessAction(action)){
        return {...state, setSuccess: true };
    } 
    if(hideSnackbarRoutine.isSuccessAction(action)){
        return INITIAL_STATE;
    } 
    return state;
};