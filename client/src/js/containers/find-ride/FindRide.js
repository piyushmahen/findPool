import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FindRide from '../../presentational/find-ride/FindRide';
import { actionTypes, actionMethods } from '../../actions/find-ride/FindRideActions';

let mapStateToProps = (store) => ({
  source: store.FindRideReducer.source,
  destination: store.FindRideReducer.destination,
  isLoading: store.FindRideReducer.isLoading,
  isError: store.FindRideReducer.isError,
  errorMessage: store.FindRideReducer.errorMessage,
  routeData: store.FindRideReducer.routeData,
  selectedCar: store.FindRideReducer.selectedCar,
});

let mapDispatchToProps = (dispatch) => {
  const {
    changeSourceAddress,
    changeDestinationAddress,
    selectSourceAddress,
    selectDestinationAddress,
    selectCar,
    confirmRide,
  } = actionMethods;

  return bindActionCreators(
    {
      changeSourceAddress,
      changeDestinationAddress,
      selectSourceAddress,
      selectDestinationAddress,
      selectCar,
      confirmRide,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FindRide);