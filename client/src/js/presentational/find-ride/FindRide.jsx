import React, { Component } from 'react';
import { Link } from 'react-router';
import memoize from 'lodash.memoize';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import GridList, { GridListTile } from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import PlacesAutocomplete from 'react-places-autocomplete'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import { SnackbarContent } from 'material-ui/Snackbar';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const style = {
  paper: {
    textAlign: 'center',
    width: '99%',
    minHeight: '120%',
    position: 'relative',
  },
  mainContainer: {
    textAlign: 'center',
  },
  sourcePicker: {
    position: 'absolute',
    top: '35px',
    left: '2.5%',
    width: '45%',
    background: '#fff',
    textAlign: 'left',
    padding: '15px',
    zIndex: '2',
  },
  destinationPicker: {
    position: 'absolute',
    top: '35px',
    left: '50%',
    width: '45%',
    background: '#fff',
    textAlign: 'left',
    padding: '15px',
    zIndex: '2',
  },
  map: {
    height: '350px',
    background: '#efefef',
    padding: '5px',
  },
  list: {
  },
  header: {
    color: '#d3d3d3',
  },
  paperInside: {
    padding: '15px',
    textAlign: 'center',
    color: '#d3d3d3',
  },
  paperInsideSelected: {
    padding: '15px',
    textAlign: 'center',
    color: '#d3d3d3',
    background: '#3f51b5',
  },
  icon: { fontSize: 48 },
  timeAway: {
    fontSize: '10px',
    color: '#d3d3d3',
    paddingLeft: '5px',
  },
  inColumn: {
    textAlign: 'left',
    position: 'relative',
  },
  rating: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    fontSize: '15px',
    color: 'blue',
  },
};


class FindRide extends Component {

  static propTypes = {
    source: PropTypes.object,
    destination: PropTypes.object,
    selectedCar: PropTypes.object,
    routeData: PropTypes.object,
    changeSourceAddress: PropTypes.func.isRequired,
    selectSourceAddress: PropTypes.func.isRequired,
    changeDestinationAddress: PropTypes.func.isRequired,
    selectDestinationAddress: PropTypes.func.isRequired,
    selectCar: PropTypes.func.isRequired,
    confirmRide: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
  };

  handleChangeSource = (address) => this.props.changeSourceAddress(address);
  handleChangeDestination = (address) => this.props.changeDestinationAddress(address);
  selectAddressSource = (address, placeId) => this.props.selectSourceAddress({ address, placeId });
  selectAddressDestination = (address, placeId) => this.props.selectDestinationAddress({ address, placeId });
  selectCar = (id) => () => !this.props.selectedCar.confirm && this.props.selectCar(id);
  confirmRide = () => this.props.confirmRide();

  listData = () => {
    if (this.props.isLoading) {
      return <CircularProgress size={50} />
    }
    if (this.props.routeData.carList.length === 0) {
      return (
        <h1 style={style.header}>
          Please select Source and Destination to continue.
        </h1>
      );
    }
    const car = this.props.routeData.carList.map((car) => {
      return(
        <Grid onClick={this.selectCar(car.id)} key={car.id} item xs={12} md={6}>
          <Paper style={this.props.selectedCar.id !== car.id ? style.paperInside : style.paperInsideSelected}>
            <Grid container spacing={8}>
              <Grid item xs={3}>
                 {this.props.selectedCar.id !== car.id ? <Icon style={style.icon}>person</Icon> : <Icon style={style.icon}>check circle</Icon>}
              </Grid>
              <Grid item xs={9} style={style.inColumn}>
                <Typography>
                  {car.name}
                  <span style={style.timeAway}>{car.awaySeconds/60} min(s) away</span>
                </Typography>
                <Typography>
                  Route: <b>{car.source}</b> to <b>{car.destination}</b>
                </Typography>
                <Typography>
                  Car: <b>{car.car.name} </b> &nbsp;&nbsp;Seats Available: <b>{car.seatsAvailable}</b>
                </Typography>
                {this.props.selectedCar.id !== car.id ? 
                  <span style={style.rating}>
                    {car.rating} | <Icon style={{ fontSize: '15px' }}>star</Icon>
                  </span> :
                  <a style={{ position: 'absolute', right: '10px', top: '10px', color: 'white' }} href={`tel:${car.phone}`}>
                    <Icon style={{ fontSize: '36px' }}>phone</Icon>
                  </a>
                }
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )
    });
    return car;
  }

  getSelectedLatLng = () => {
    const selectedCar = this.props.routeData.carList.find((car) => car.id === this.props.selectedCar.id);
    return selectedCar.currentLocation;
  }
 

  render(){
    const inputPropsSource = {
      value: this.props.source.address,
      onChange: this.handleChangeSource,
    }
    const inputPropsDestination = {
      value: this.props.destination.address,
      onChange: this.handleChangeDestination,
    }
    return(
      <Paper style={style.paper}>
        <Grid style={style.sourcePicker}>
          Start From:
          <PlacesAutocomplete inputProps={inputPropsSource} onSelect={this.selectAddressSource} />
        </Grid>
        <Grid style={style.destinationPicker}>
          Destination:
          <PlacesAutocomplete inputProps={inputPropsDestination} onSelect={this.selectAddressDestination} />
        </Grid>
        <Grid style={style.map}>
          {(() => {
            if(this.props.selectedCar.id && this.props.selectedCar.confirm) {
              return (
                <MyMapComponent
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC-cVSGLPxEm48U9APAiq1tO9wpcgcDkZE&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `350px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  coordinates={this.getSelectedLatLng()}
                />
              );
            }
            if(this.props.source.coordinates.placeId && this.props.destination.coordinates.placeId) {
              return (<iframe width="100%" height="350" frameBorder="0" style={{ border: '0' }}
                src={`https://www.google.com/maps/embed/v1/directions?origin=place_id:${this.props.source.coordinates.placeId}&destination=place_id:${this.props.destination.coordinates.placeId}&key=AIzaSyCzFZvhGMByNdsvzMMyzRgcXSbSMevMnvs`} allowFullScreen
              />);
            }
          })()}
        </Grid>
        <Grid justify="center" container spacing={24}>
          {this.listData()}
          {this.props.routeData.carList.length > 0 && <Button onClick={this.confirmRide} disabled={!this.props.selectedCar.id || this.props.selectedCar.confirm} variant="raised" color="primary">
            Confirm Ride
          </Button>}
          <br />
          {this.props.selectedCar.id && this.props.selectedCar.confirm && <p>Your ride is confirmed!</p> }
        </Grid>
      </Paper>
    );
  };
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.coordinates}
  >
    {props.isMarkerShown && <Marker position={props.coordinates} />}
  </GoogleMap>
))

export default FindRide;
