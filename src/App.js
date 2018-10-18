import React from 'react';
import scriptLoader from 'react-async-script-loader'
import './App.css';
import Searching from './Components/Searching';

class App extends React.Component {
  state={
    locations: [],
    success: true,
    marker: [],
    map:' ',
    infoWindows: ' ',
    venueWindows: [],
    center:{ lat: 40.7413549, lng: -73.99802439999996}

  };
// I have used the same lat,lng as given in lessons for API
// to check for loading of map api
  componentWillReceiveProps({isScriptLoadSucceed}) {
    if (isScriptLoadSucceed) {
        //initialising map 
      let mapContainer=document.getElementById('map'),
      map = new window.google.maps.Map(mapContainer,{
        zoom: 18,
        center: {lat:40.7413549,lng: -73.99802439999996 }
      });
      // infowindow
      let infowindow= new window.google.maps.InfoWindow({});
      this.setState({map: map, infoWindows:infowindow});
     // using fetch api to find locations around lat,lng
     //usage of fetch api taken from docs
      fetch('https://api.foursquare.com/v2/venues/search?ll=' + this.state.center.lat + ',' + this.state.center.lng 
        + '&client_id=FLJGPIR2CQQHYU5NX4SZPC1NOOG2QPT0KLWPKVECZWVGVGM0&' +
         'client_secret=ML4F1J1OBPYAPRZVGYXYB2ZKOG2SZBRXE2TVHTV21YRCGX5C&v=20180725')
        .then(
          res => {
            if (res.status!==200) {
              alert("FourSquare API Failed");
              throw res;
            }
            return res.json()
          })
        .then( res => {
          let venues = res.response.venues;
          this.setState({locations:venues})
        })
        .then(res =>this.setMarker(map))
        .catch(error => console.log(error));
        }
        else {
          console.log('Google Maps API failed');
          this.setState({success:false})
        }
    }
  //add markers to map
setMarker = (map) => {
  let self= this;
  let locs = this.state.locations;
  //addmarker to each location
  locs.forEach(loc => {
    let marker = new window.google.maps.Marker({
      position: {lat: loc.location.lat,lng: loc.location.lng},
      map:map,
      title: loc.name
    });
    //to open info window when marker is clicked
    marker.addListener('click',function () {
      /* body... */
      self.showInfoWindow(marker,loc);
    });
    let markers = this.state.marker;
    markers.push(marker);
    this.setState({marker: markers});
  });
};
//function to show infowindow when marker is clicked 
showInfoWindow = (marker,loc) =>{
  document.getElementById('searchContainer').style.zIndex=1;
  document.getElementById('map').style.zIndex = 2;
  document.getElementById('searchButton').style.zIndex = 3;
  //close opened infowindow
  this.state.infoWindows.close();
  let markers = this.state.infoWindows.marker,
  venueWins=[];
  if (markers!==marker) {
    markers=marker;
  //animation 
  marker.setAnimation(window.google.maps.Animation.BOUNCE);
  setTimeout(function () {
    /* body... */
    marker.setAnimation(null);
  },1000);
  this.state.infoWindows.open(this.state.map,marker);
  this.showDetails(loc);
  venueWins.push(this.state.infoWindows)
  this.setState({venueWindows:venueWins})
}

};
showDetails = (loc)=> {
    //fetched data to be shown in infowindow
  let currentCity, currentCountry, currentAddress, currentState;
  loc.location.address ? currentAddress = loc.location.address : currentAddress = ' ';
  loc.location.city ? currentCity = loc.location.city : currentCity = ' ';
  loc.location.state ? currentState= loc.location.state : currentState = ' ';
  loc.location.country ? currentCountry = loc.location.country : currentCountry = ' ';

  let contentString = '<div id="venueInfo">' + 
  '<h3>' + loc.name + '</h3>' +
  '<div tabindex="0" role="contentinfo" aria-label="venue details" id="bodyContent">' +
  '<P tabindex="0">' + currentAddress + '</P>'+
  '<P tabindex="0">' + currentCity + '</P>' +
  '<P tabindex="0">' + currentState + '</P>' +
  '<P tabindex="0">' + currentCountry +'</P>' + 
  '</div>'
  + '</div>';
  this.state.infoWindows.setContent(contentString);
};
componentDidMount() {
  window.gm_authFailure = this.gm_authFailure;
}
//google-map error handling
gm_authFailure() {
  window.alert("google maps could not load")
}
showSearch = (e)=>{
  document.getElementById('searchContainer').style.zIndex = 1000;
  document.getElementById('map').style.zIndex = -1;
  document.getElementById('searchButton').style.zIndex = -1;
};

render() {
  return (
      <div className="container">

        {this.state.success ? (
            <div id="map" role="application" aria-label="map" tabIndex={0} ref={(map) => {
              this.mapArea = map;
            }}>
            </div>

          ) : (
            <div>
              Problem Loading Map
            </div>
          )}
          <Searching 
            marker={this.state.marker}
            infoWindows={this.state.infoWindows}
            showInfo={this.showInfoWindow}
            map={this.state.map}
            locations={this.state.locations}
            />
            <button tabIndex={0} id="searchButton" className="searchButton" onClick={e => this.showSearch(e)}>
            <i className="fa fa-bars fa-1x"></i>
            </button>
            </div>
      )
    }
  }
export default scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyClNMxWa-gVLUTDWNDiotgkVsxpz351pRY'])(App);
