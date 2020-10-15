import { getEquipmentsRoutine, editEquipmentsRoutine, deleteEquipmentsRoutine  } from '../actions';
const INITIAL_STATE = {
    equipmentsData: null,
    paginationData: null
}


export default (state = INITIAL_STATE, action) => {
    if(getEquipmentsRoutine.isSuccessAction(action)){
        return ({...state, 
            equipmentsData: action.payload.data.equipments,
            paginationData: action.payload.data.pagination
        });
    }
    if(deleteEquipmentsRoutine.isSuccessAction(action)){
        return {...state};
    }
    if(editEquipmentsRoutine.isSuccessAction(action)){
        return {...state};
    }
    return state;
};