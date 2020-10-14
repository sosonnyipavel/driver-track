import { createThunkRoutine } from 'redux-thunk-routine';

export const showErrorRoutine = createThunkRoutine('SHOW_ERROR');
export const showModalRoutine = createThunkRoutine('SHOW_MODAL');
export const hideModalRoutine = createThunkRoutine('HIDE_MODAL');
export const logInRoutine = createThunkRoutine('LOG_IN');
export const logOutRoutine = createThunkRoutine('LOG_OUT');
export const getEquipmentsRoutine = createThunkRoutine('GET_EQUIPMENTS');
export const editEquipmentsRoutine = createThunkRoutine('EDIT_EQUIPMENTS');