import { getEquipmentsRoutine, updateEquipmentRoutine, deleteEquipmentRoutine, createEquipmentRoutine } from './index';
import { getThunkActionCreator } from 'redux-thunk-routine';
import sessions from '../api/sessions';


export const getEquipments = getThunkActionCreator (
    getEquipmentsRoutine, async ({ limit = 10, offset = 0, orders = { 'name': 'asc' }  }) => {
        const token = localStorage.getItem('token');
        return await sessions.get(`/equipments`,
            {
                params: {
                    access_token: token,
                    limit,
                    offset,
                    orders
                }
            }
        );
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
        return await sessions.post(`/equipments/?access_token=${token}`, equipment);
    }
);