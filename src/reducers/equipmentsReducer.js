import { getEquipmentsRoutine, updateEquipmentRoutine, deleteEquipmentRoutine, createEquipmentRoutine  } from '../actions';
const INITIAL_STATE = {
    equipmentsData: [],
    paginationData: { count: 0, limit: 10, offset: 0, total_count: 0 }
}

const sortAB = (a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
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
                count: state.paginationData.count, 
                limit: state.paginationData.limit, 
                offset: state.paginationData.offset,
                total_count: state.paginationData.total_count - 1
            }
        });
    }
    if(updateEquipmentRoutine.isSuccessAction(action)){
        return ({...state, 
            equipmentsData: state.equipmentsData
            .map( 
                equipment => 
                    equipment.id === action.payload.equipment.id ? 
                    {...equipment, name: action.payload.equipment.name} : 
                    equipment 
            )
            .sort( (a, b) => sortAB(a, b) ) 
        });
    }
    if(createEquipmentRoutine.isSuccessAction(action)){
        //Вот здесь меня смущает немного. Правильно ли я делаю? Я же получается сначала меняю текущий стейт. А потом его сортирую.
        state.equipmentsData.splice(state.equipmentsData.length - 1, 1, action.payload.data.equipment);
        return ({...state,
            equipmentsData: state.equipmentsData.sort( (a, b) => sortAB(a, b) ),
            paginationData: {
                count: state.paginationData.count, 
                limit: state.paginationData.limit, 
                offset: state.paginationData.offset,
                total_count: state.paginationData.total_count + 1
            }
        });
    }
    return state;
};