import { createThunkRoutine } from 'redux-thunk-routine';

export const showErrorRoutine = createThunkRoutine('SHOW_ERROR');
export const hideErrorRoutine = createThunkRoutine('HIDE_ERROR');
export const logInRoutine = createThunkRoutine('LOG_IN');
export const logOutRoutine = createThunkRoutine('LOG_OUT');
export const getEquipmentsRoutine = createThunkRoutine('GET_EQUIPMENTS');
export const editEquipmentRoutine = createThunkRoutine('EDIT_EQUIPMENT');
export const deleteEquipmentRoutine = createThunkRoutine('DELETE_EQUIPMENT');
export const createEquipmentRoutine = createThunkRoutine('CREATE_EQUIPMENT');