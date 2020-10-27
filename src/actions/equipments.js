import { getEquipmentsRoutine, editEquipmentRoutine, deleteEquipmentRoutine, createEquipmentRoutine } from './index';
import { getThunkActionCreator } from 'redux-thunk-routine';
import sessions from '../api/sessions';


export const getEquipments = getThunkActionCreator (
    getEquipmentsRoutine, async (token) => {
        return await sessions.get(`/equipments?access_token=${token}`);
});

export const deleteEquipment = getThunkActionCreator(
    deleteEquipmentRoutine,
    async (id) => {
        const token = localStorage.getItem('token');
        return await sessions.delete(`/equipments/${id}?access_token=${token}`);
    }
);


export const editEquipment = getThunkActionCreator( 
    editEquipmentRoutine,
    async (equipment) => {
        const token = localStorage.getItem('token');
        return await sessions.patch(`/equipments/${equipment.id}?access_token=${token}`, equipment.name)
    }
);

export const createEquipment = getThunkActionCreator( 
    createEquipmentRoutine,
    async (equipment) => {
        const token = localStorage.getItem('token');
        return await sessions.post(`/equipments/?access_token=${token}`, equipment);
    }
);