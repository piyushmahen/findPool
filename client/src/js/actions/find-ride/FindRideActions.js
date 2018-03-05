import { geocodeByPlaceId } from 'react-places-autocomplete'
import findRideFetchApi from '../../services/find-ride/FindRideServices';
import { history } from '../../Routes';

const actionTypes = {
  CHANGE_SOURCE_ADDRESS: 'FindRide/CHANGE_SOURCE_ADDRESS',
  CHANGE_DESTINATION_ADDRESS: 'FindRide/CHANGE_DESTINATION_ADDRESS',
  SELECT_SOURCE_COORDINATES: 'FindRide/SELECT_SOURCE_COORDINATES',
  SELECT_DESTINATION_COORDINATES: 'FindRide/SELECT_DESTINATION_COORDINATES',
  START_DATA_LOADING: 'FindRide/START_DATA_LOADING',
  SET_ROUTE_DATA: 'FindRide/SET_ROUTE_DATA',
  SELECT_CAR: 'FindRide/SELECT_CAR',
  CONFIRM_RIDE: 'FindRide/CONFIRM_RIDE',
};

const actionMethods = {
  changeSourceAddress: (payload) => ({ type: actionTypes.CHANGE_SOURCE_ADDRESS, payload }),
  startDataLoading: () => ({ type: actionTypes.START_DATA_LOADING }),
  changeDestinationAddress: (payload) => ({ type: actionTypes.CHANGE_DESTINATION_ADDRESS, payload }),
  selectSourceCoordinates: (payload) => ({ type: actionTypes.SELECT_SOURCE_COORDINATES, payload }),
  selectDestinationCoordinates: (payload) => ({ type: actionTypes.SELECT_DESTINATION_COORDINATES, payload }),
  setRouteData: (payload) => ({ type: actionTypes.SET_ROUTE_DATA, payload }),
  selectCar: (payload) => ({ type: actionTypes.SELECT_CAR, payload }),
  confirmRide: () => ({ type: actionTypes.CONFIRM_RIDE }),
  getDataFromServer:  (payload) =>  (dispatch, getState) => {
    const { source, destination } = getState().FindRideReducer;
    if(source.coordinates.placeId && destination.coordinates.placeId) {
      dispatch(actionMethods.startDataLoading());
      findRideFetchApi({source: source.address, destination: destination.address})
      .then((data) => {
        dispatch(actionMethods.setRouteData(data));
      });
    }
  },
  selectSourceAddress:  (payload) =>  (dispatch, getState) => {
    dispatch(actionMethods.changeSourceAddress(payload.address));
    geocodeByPlaceId(payload.placeId)
    .then(results => {
      const coordinates = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
        placeId: payload.placeId,
      };
      dispatch(actionMethods.selectSourceCoordinates(coordinates));
      dispatch(actionMethods.getDataFromServer());
    });
  },
  selectDestinationAddress: (payload) => (dispatch, getState) => {
    dispatch(actionMethods.changeDestinationAddress(payload.address));
    geocodeByPlaceId(payload.placeId)
    .then(results => {
      const coordinates = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
        placeId: payload.placeId,
      };
      dispatch(actionMethods.selectDestinationCoordinates(coordinates));
      dispatch(actionMethods.getDataFromServer());
    });
  },
};

export { actionTypes, actionMethods };
