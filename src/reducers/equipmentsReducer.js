import { getEquipmentsRoutine, editEquipmentRoutine, deleteEquipmentRoutine, createEquipmentRoutine  } from '../actions';
const INITIAL_STATE = {
    equipmentsData: { id: null, name: ''},
    paginationData: { count: 0, limit: 25, offset: 0, total_count: 0 }
}


export default (state = INITIAL_STATE, action) => {
    if(getEquipmentsRoutine.isSuccessAction(action)){
        return ({...state, 
            equipmentsData: action.payload.data.equipments,
            paginationData: action.payload.data.pagination
        });
    }
    if(deleteEquipmentRoutine.isSuccessAction(action)){
        return {...state};
    }
    if(editEquipmentRoutine.isSuccessAction(action)){
        return {...state};
    }
    if(createEquipmentRoutine.isSuccessAction(action)){
        return {...state};
    }
    return state;
};