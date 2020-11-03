import { showErrorRoutine, hideSnackbarRoutine, showSuccessRoutine } from './index';
import { getThunkActionCreator } from 'redux-thunk-routine';

export const showError = getThunkActionCreator(
    showErrorRoutine,
    async (error) => {
        return error;
    }
);

export const showSuccess = getThunkActionCreator(
    showSuccessRoutine,
    async () => {
        return;
    }
);

export const hideSnackbar = getThunkActionCreator(
    hideSnackbarRoutine,
    async () => {
        return;
    }
);