import { showModalRoutine, hideModalRoutine } from './index';
import { getThunkActionCreator } from 'redux-thunk-routine';

export const showModal = getThunkActionCreator(
    showModalRoutine,
    async (modal) => {
        return await modal;
    }
);
export const hideModal = getThunkActionCreator(
    hideModalRoutine,
    async () => {
        return await true;
    }
);