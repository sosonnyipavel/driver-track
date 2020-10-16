import { getEquipmentsRoutine, editEquipmentsRoutine, deleteEquipmentsRoutine, addEquipmentsRoutine } from './index';
import { getThunkActionCreator } from 'redux-thunk-routine';
import sessions from '../api/sessions';
import history from '../history';


export const getEquipments = getThunkActionCreator (
    getEquipmentsRoutine, async (token) => {
    const response = await sessions.get(`/equipments?access_token=${token}`);
    return response;
});

export const deleteEquipments = (id, token) => async (dispatch) => {
    dispatch(deleteEquipmentsRoutine.request(id, token));
    const response = await sessions.delete(`/equipments/${id}?access_token=${token}`);
    history.push('/signin');
    return dispatch(deleteEquipmentsRoutine.success(response));
};


export const editEquipments = (id, token, equipment) => async (dispatch) => {
    dispatch(editEquipmentsRoutine.request(id, token, equipment));
    const response = await sessions.patch(`/equipments/${id}?access_token=${token}`, 
        {
            equipment: 
                {   
                    name: equipment.name
                } 
        });
    history.push('/signin');
    return dispatch(editEquipmentsRoutine.success(response));
};

export const addEquipmets = (token, equipment) => async (dispatch) => {
    dispatch(addEquipmentsRoutine.request(token, equipment));
    const response = await sessions.post(`/equipments/?access_token=${token}`, 
        {
            equipment: 
                {   
                    name: equipment.name
                } 
        });
    history.push('/signin');
    return dispatch(addEquipmentsRoutine.success(response));
};