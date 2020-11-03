import { getEquipmentsRoutine, updateEquipmentRoutine, deleteEquipmentRoutine, createEquipmentRoutine } from './index';
import { getThunkActionCreator } from 'redux-thunk-routine';
import sessions from '../api/sessions';


export const getEquipments = getThunkActionCreator (
    getEquipmentsRoutine, async () => {
        const token = localStorage.getItem('token');
        const response = await sessions.get(`/equipments?access_token=${token}`);
        return response;
});

export const deleteEquipment = getThunkActionCreator(
    deleteEquipmentRoutine,
    async (id) => {
        const token = localStorage.getItem('token');
        const response = await sessions.delete(`/equipments/${id}?access_token=${token}`);
        return {response, id};
    }
);

export const updateEquipment = getThunkActionCreator( 
    updateEquipmentRoutine,
    async (equipment) => {
        const token = localStorage.getItem('token');
        const response = await sessions.patch(`/equipments/${equipment.id}`, { access_token: token, equipment });
        return {response, equipment};
    }
);

export const createEquipment = getThunkActionCreator( 
    createEquipmentRoutine,
    async (equipment) => {
        const token = localStorage.getItem('token');
        const response = await sessions.post(`/equipments/?access_token=${token}`, equipment);
        return response;
    }
);