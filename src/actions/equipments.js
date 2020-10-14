import { getEquipmentsRoutine, editEquipmentsRoutine } from './index';
import { getThunkActionCreator } from 'redux-thunk-routine';
import sessions from '../api/sessions';
import history from '../history';


export const getEquipments = getThunkActionCreator (
    getEquipmentsRoutine, async (token) => {
    const response = await sessions.get(`/equipments?access_token=${token}`);
    return response;
});

export const editEquipments = (token, userEdit) => async (dispatch) => {
    dispatch(editEquipmentsRoutine.request(token, userEdit));
    const response = await sessions.patch(`/equipments?access_token=${token}`, 
        {
            user: 
                {   
                    first_name: userEdit.userFirstName,
                    last_name: userEdit.userLastName,
                    email: userEdit.userEmail,
                    phone: userEdit.userPhone
                } 
        });
    history.push('/signin');
    return dispatch(editEquipmentsRoutine.success(response));
};