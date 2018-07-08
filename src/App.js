import React, { Component } from 'react'
import ReactDom from 'react-dom'
import './App.css'
import GoogleMap from './components/GoogleMap'
import Listings from './components/Listings'

class App extends Component {
  constructor(props) {
    super(props);

    this.filterPubs = this.filterPubs.bind(this);
    this.setFilteringTerm = this.setFilteringTerm.bind(this);
    this.setNewPubsState = this.setNewPubsState.bind(this);
  }

  state = {
    filteringTerm: "",
    allPubs: [
      ["The Back Page", 53.358512, -6.273072, 1],
      ["The WhitWorth", 53.364690, -6.271398, 2],
      ["The Barge", 53.330602, -6.260620, 3],
      ["The Bar With No Name", 53.341897, -6.264176, 4],
      ["Library Bar", 53.343095, -6.263909, 5],
      ["The Workman's Club", 53.345346, -6.266407, 6],
      ["Wigwam", 53.347829, -6.262295, 7],
      ["The Church", 53.348630, -6.266713, 8],
      ["4 Dame Lane", 53.343802, -6.262859, 9],
      ["The Pavilion Bar", 53.342717, -6.252905, 10]
    ],
    pubs: [],
    allMarkers: [],
    markers: [],
    map: null,
  }

  /***************************************************************************/
  /**************************** CUSTOM METHODS *******************************/
  /***************************************************************************/

  // METHODS TO INITIALIZE MAP & MARKERS
  // getGoogleMaps, initMap, setMarkersInitially
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
          center: { lat: 53.347163, lng: -6.259282 },
          zoom: 13,
          styles: styles
      })

      this.setState({ map: map })
    }
  }

  setMarkersInitially(map, pubs) {
    let markers = [];

    let shape = {
      // Shapes define the clickable region of the icon. The type defines an HTML
      // <area> element 'poly' which traces out a polygon as a series of X,Y points.
      // The final coordinate closes the poly by connecting to the first coordinate.
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };
    let customIcon = {
      // adjusted from https://raw.githubusercontent.com/scottdejonge/map-icons/master/src/icons/postal-code.svg

      path: "M25 0c-8.284 0-15 6.656-15 14.866 0 8.211 15 35.135 15 35.135s15-26.924 15-35.135c0-8.21-6.716-14.866-15-14.866zm-.049 19.312c-2.557 0-4.629-2.055-4.629-4.588 0-2.535 2.072-4.589 4.629-4.589 2.559 0 4.631 2.054 4.631 4.589 0 2.533-2.072 4.588-4.631 4.588z",
      fillColor: '#f59237',
      fillOpacity: 1,
      scale: 0.8,
      strokeColor: '#963535',
      strokeWeight: 1,
      size: new window.google.maps.Size(20, 32),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(0, 32)
    }

    for (let i = 0; i < pubs.length; i++) {
      let pub = pubs[i];
        let marker = new window.google.maps.Marker({
          position: {lat: pub[1], lng: pub[2]},
          map: map,
          icon: customIcon,
          shape: shape,
          animation: window.google.maps.Animation.DROP,
          title: pub[0],
          zIndex: pub[3]
        });

        markers.push(marker)
    }

    this.setState({
      allMarkers: markers,
      markers: markers
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
          />
        <GoogleMap
          ref="map"
          markerData={ this.state.pubs }/>
      </div>
    );
  }
}

export default App;
