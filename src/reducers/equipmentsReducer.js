import { getEquipmentsRoutine, editEquipmentRoutine, deleteEquipmentRoutine, createEquipmentRoutine  } from '../actions';
const INITIAL_STATE = {
    equipmentsData: [],
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
        return ({...state,
            equipmentsData: state.equipmentsData.map( 
                (equipment,id) =>
                    equipment.id === action.payload ?
                    delete state.equipmentsData[id] :
                    equipment
            ),
            paginationData: {
                count: state.paginationData.count - 1,
                total_count: state.paginationData.total_count - 1
            }
        });
    }
    if(editEquipmentRoutine.isSuccessAction(action)){
        return ({...state, 
            equipmentsData: state.equipmentsData.map( 
                equipment => 
                    equipment.id === action.payload.id ? 
                    {...equipment, name: action.payload.name} : 
                    equipment 
            ) 
        });
    }
    if(createEquipmentRoutine.isSuccessAction(action)){
        state.equipmentsData.push(action.payload.data.equipment);
        return ({...state, 
            paginationData: {
                count: state.paginationData.count + 1,
                total_count: state.paginationData.total_count + 1
            }
        });
    }
    return state;
};