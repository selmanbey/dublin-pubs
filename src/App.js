import React, { Component } from 'react'
import ReactDom from 'react-dom'
import './App.css'
import GoogleMap from './components/GoogleMap'
import Listings from './components/Listings'

// consts imports
import googleMapStyles from './consts/googleMapStyles'
import allPubs from './consts/allPubs'


class App extends Component {
  constructor(props) {
    super(props);

    this.filterPubs = this.filterPubs.bind(this);
    this.setFilteringTerm = this.setFilteringTerm.bind(this);
    this.setNewPubsState = this.setNewPubsState.bind(this);
  }

  state = {
    filteringTerm: "",
    allPubs: allPubs,
    pubs: [],
    allMarkers: [],
    markers: [],
    map: null,
  }

  /***************************************************************************/
  /**************************** CUSTOM METHODS *******************************/
  /***************************************************************************/

  // METHODS TO INITIALIZE MAP & MARKERS
  // getGoogleMaps, initMap, setMarkersInitially, addEventListenersToMarker
  getGoogleMaps() {
    if(!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise( (resolve) => {

        // Adds a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          resolve("Success!")
        }

        let script = document.createElement("script");
        let API =  "AIzaSyBMgRqXbrWtEyfOJp9qRLy-vwDN6KPHbHM";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        script.setAttribute("defer", "defer");
        document.body.appendChild(script);
      })
    }

    return this.googleMapsPromise;
  }

  initMap() {
    if(!this.state.map) {

      let googleMapDomNode = ReactDom.findDOMNode(this.refs.map)

      let styles = [
          {
              "featureType": "administrative",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#3c3c3c"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.province",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.province",
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.province",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.locality",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "visibility": "simplified"
                  },
                  {
                      "saturation": "5"
                  },
                  {
                      "lightness": "-39"
                  },
                  {
                      "gamma": "2.50"
                  },
                  {
                      "weight": "0.01"
                  },
                  {
                      "hue": "#00ffd9"
                  }
              ]
          },
          {
              "featureType": "administrative.neighborhood",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative.land_parcel",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "visibility": "off"
                  },
                  {
                      "saturation": "5"
                  }
              ]
          },
          {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#f2f2f2"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "landscape.man_made",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "landscape.man_made",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "landscape.man_made",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "saturation": "19"
                  }
              ]
          },
          {
              "featureType": "landscape.natural.landcover",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "landscape.natural.landcover",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.attraction",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "poi.attraction",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "saturation": "2"
                  }
              ]
          },
          {
              "featureType": "poi.attraction",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.attraction",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "saturation": "-2"
                  }
              ]
          },
          {
              "featureType": "poi.attraction",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.business",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "poi.business",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.government",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.government",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "saturation": "41"
                  },
                  {
                      "gamma": "1.09"
                  },
                  {
                      "lightness": "6"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "saturation": "-94"
                  },
                  {
                      "lightness": "50"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "transit.station.rail",
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit.station.rail",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#9dd2ec"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          }
      ]

      let map = new window.google.maps.Map(googleMapDomNode, {
          center: { lat: 53.349162, lng: -6.289282 },
          zoom: 13.8,
          styles: googleMapStyles
      })

      this.setState({ map: map })
    }
  }

  setMarkersInitially(map, pubs) {
    let markers = [];

    let customIcon = {
      // adjusted from https://raw.githubusercontent.com/scottdejonge/map-icons/master/src/icons/postal-code.svg

      path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
      fillColor: '#f59237',
      fillOpacity: 1,
      scale: 0.8,
      strokeColor: '#963535',
      strokeWeight: 1,
      size: new window.google.maps.Size(20, 32),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(0, 32),
    }

    for (let i = 0; i < pubs.length; i++) {
        let pub = pubs[i];

        let marker = new window.google.maps.Marker({
          position: {lat: pub[1], lng: pub[2]},
          map: map,
          icon: customIcon,
          animation: window.google.maps.Animation.DROP,
          title: pub[0],
          zIndex: pub[3]
        });

        let infoWindow = new window.google.maps.InfoWindow({
          content: pub[0]
        })

        this.addEventListenersToMarker(map, marker, infoWindow)

        markers.push(marker)
    }

    this.setState({
      allMarkers: markers,
      markers: markers
    })
  }

  addEventListenersToMarker(map, marker, infoWindow) {
    marker.addListener("mouseover", () => {
      infoWindow.open(map, marker)
    })

    marker.addListener("mouseout", () => {
      infoWindow.close()
    })

    marker.addListener("click", () => {
    })
  }

  // METHODS TO ADJUST STATE WHEN FILTER IS USED
  // filterPubs, setNewPubsState, setFilteringTerm
  setFilteringTerm(term) {
    this.setState({ filteringTerm: term }, () => {
      this.setNewPubsState();
      this.setNewMarkersState();
    })
  }

  filterPubs(allPubs, filteringTerm) {
      let cleanfilteringTerm = filteringTerm.trim().toLowerCase()

      let filteredPubs = allPubs.filter( (pub) => {
        return pub[0].toLowerCase().includes(cleanfilteringTerm)
      })

      return filteredPubs
  }

  filterMarkers(allMarkers, filteringTerm) {
    let cleanfilteringTerm = filteringTerm.trim().toLowerCase()

    let filteredMarkers = allMarkers.filter( (marker) => {
      return marker.title.toLowerCase().includes(cleanfilteringTerm)
    })

    return filteredMarkers
  }

  setNewPubsState() {
    let filteredPubs = this.filterPubs(this.state.allPubs, this.state.filteringTerm);
    this.setState({ pubs: filteredPubs })
  }

  setNewMarkersState() {
    this.clearAllMarkers();
    let filteredMarkers = this.filterMarkers(this.state.allMarkers, this.state.filteringTerm)
    this.setState({ markers: filteredMarkers }, this.setMapOnMarkers(this.state.markers))
  }

  // METHODS TO MANUALLY ADJUST VIEW ACCORDING TO STATE CHANGES
  // clearAllMarkers, setMapOnMarkers
  clearAllMarkers() {
    for(let marker of this.state.allMarkers) {
      marker.setMap(null)
    }
  }

  setMapOnMarkers(markers) {
    for(let marker of markers) {
      marker.setAnimation(window.google.maps.Animation.DROP)
      marker.setMap(this.state.map)
    }
  }


  /***************************************************************************/
  /*************************** LIFECYCLE HOOKS *******************************/
  /***************************************************************************/

  componentWillMount() {
    console.log(allPubs)
    console.log(googleMapStyles)
    if (!this.state.filteringTerm) {
      this.setState({ pubs: this.state.allPubs})
    } else {
      this.setNewPubsState();
    }
  }

  componentDidMount() {
    if(!this.googleMapsPromise) {
      this.getGoogleMaps().then( () => {
        this.initMap();
        this.setMarkersInitially(this.state.map, this.state.pubs);
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Listings
            sendSearchTerm= { this.setFilteringTerm }
            filteredPubs= { this.state.pubs }
            filteredMarkers= { this.state.markers }
          />
        <GoogleMap
          ref="map"
          markerData={ this.state.pubs }/>
      </div>
    );
  }
}

export default App;
