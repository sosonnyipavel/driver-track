import { getEquipmentsRoutine, editEquipmentsRoutine  } from '../actions';
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
    if(editEquipmentsRoutine.isSuccessAction(action)){
        return {...state};
    }
    return INITIAL_STATE;
};