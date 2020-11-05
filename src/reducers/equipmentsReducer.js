import { getEquipmentsRoutine, updateEquipmentRoutine, deleteEquipmentRoutine, createEquipmentRoutine  } from '../actions';
const INITIAL_STATE = {
    equipmentsData: [],
    paginationData: { count: 0, limit: 10, offset: 0, total_count: 0, orders: [] }
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
            equipmentsData: state.equipmentsData.filter( 
                equipment => {
                    return equipment.id !== action.payload.id
                }
            ),
            paginationData: {
                count: state.paginationData.count - 1,
                total_count: state.paginationData.total_count - 1
            }
        });
    }
    if(updateEquipmentRoutine.isSuccessAction(action)){
        return ({...state, 
            equipmentsData: state.equipmentsData.map( 
                equipment => 
                    equipment.id === action.payload.equipment.id ? 
                    {...equipment, name: action.payload.equipment.name} : 
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