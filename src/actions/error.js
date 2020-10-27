import { showErrorRoutine, hideErrorRoutine } from './index';
import { getThunkActionCreator } from 'redux-thunk-routine';

export const showError = getThunkActionCreator(
    showErrorRoutine,
    async (error) => {
        return error;
    }
);

export const hideError = getThunkActionCreator(
    hideErrorRoutine,
    async () => {
        return null;
    }
);