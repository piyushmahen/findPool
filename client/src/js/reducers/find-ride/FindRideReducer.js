import { actionTypes } from '../../actions/find-ride/FindRideActions';

const initialState = {
  source: {
    address: '',
    coordinates: {
      lat: '',
      lng: '',
      placeId: ''
    },
  },
  destination: {
    address: '',
    coordinates: {
      lat: '',
      lng: '',
      placeId: ''
    },
  },
  isLoading: false,
  errorMessage: '',
  isError: false,
  routeData: {
    clientHash: '',
    carList: [],
  },
  selectedCar: {
    id: '',
    confirm: false,
  }
};

const findRideReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SOURCE_ADDRESS:
      return { ...state, source: { ...state.source, address: action.payload }};
    case actionTypes.CHANGE_DESTINATION_ADDRESS:
      return { ...state, destination: { ...state.destination, address: action.payload }};
    case actionTypes.START_DATA_LOADING:
      return { ...state, isLoading: true };  
    case actionTypes.SELECT_CAR:
      return { ...state, selectedCar: {id: action.payload, confirm: false} };
    case actionTypes.CONFIRM_RIDE:
      return { ...state, selectedCar: {...state.selectedCar, confirm: true} };      
    case actionTypes.SELECT_DESTINATION_COORDINATES:
      return { ...state, destination: {
        ...state.destination,
          coordinates: {
            lat: action.payload.lat,
            lng: action.payload.lng,
            placeId: action.payload.placeId,
          }
        }
      };
    case actionTypes.SELECT_SOURCE_COORDINATES:
      return { ...state, source: {
        ...state.source,
        coordinates: {
          lat: action.payload.lat,
          lng: action.payload.lng,
          placeId: action.payload.placeId,
        }
      }
    };
    case actionTypes.SET_ROUTE_DATA:
      return {
        ...state,
        routeData: {
          clientHash: action.payload.clientHash,
          carList: action.payload.carList,
        },
        isLoading: false,
      }
    case actionTypes.START_LOADING:
      return { ...state, isLoading: true, isError: false };
    case actionTypes.HANDLE_REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default findRideReducer;
