import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import equipmentsReducer from './equipmentsReducer';
import errorReducer from './errorReducer';


export default combineReducers ({
    form: formReducer,
    auth: authReducer,
    equipments: equipmentsReducer,
    error: errorReducer
});