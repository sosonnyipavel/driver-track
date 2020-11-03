import { createThunkRoutine } from 'redux-thunk-routine';

export const showErrorRoutine = createThunkRoutine('SHOW_ERROR');
export const showSuccessRoutine = createThunkRoutine('SHOW_SUCCESS');
export const hideSnackbarRoutine = createThunkRoutine('HIDE_SNACKBAR');
export const logInRoutine = createThunkRoutine('LOG_IN');
export const logOutRoutine = createThunkRoutine('LOG_OUT');
export const getEquipmentsRoutine = createThunkRoutine('GET_EQUIPMENTS');
export const updateEquipmentRoutine = createThunkRoutine('UPDATE_EQUIPMENT');
export const deleteEquipmentRoutine = createThunkRoutine('DELETE_EQUIPMENT');
export const createEquipmentRoutine = createThunkRoutine('CREATE_EQUIPMENT');