import { showErrorRoutine } from './index';
import { getThunkActionCreator } from 'redux-thunk-routine';

export const showError = getThunkActionCreator(
    showErrorRoutine,
    async (error) => {
        return await error;
    }
);