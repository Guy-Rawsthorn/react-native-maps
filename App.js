import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import mapStyle from "./mapStyle.json";
import GoogleAutoComplete from "./components/GoogleAutoComplete";

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
];

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
      },

      markers: [
        {
          title: "Coordinate 1",
          image: Images[0],
          coordinates: {
            latitude: 37.785839,
            longitude: -122.406409,
            longitudeDelta: 50,
            latitudeDelta: 50
          }
        },
        {
          title: "Coordinate 2",
          image: Images[1],
          coordinates: {
            latitude: 37.785876,
            longitude: -122.406423,
            longitudeDelta: 50,
            latitudeDelta: 50
          }
        },
        {
          title: "Coordinate 3",
          image: Images[2],
          coordinates: {
            latitude: 37.785876,
            longitude: -122.406434,
            longitudeDelta: 50,
            latitudeDelta: 50
          }
        },
        {
          title: "Coordinate 4",
          image: Images[3],
          coordinates: {
            latitude: 37.785812,
            longitude: -122.406445,
            longitudeDelta: 50,
            latitudeDelta: 50
          }
        }
      ]
    };
  }

  computeMapDelta(lat, lon, distance) {
    let oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    let latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
    let longitudeDelta =
      distance /
      (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));
    return (coords = {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta
    });
  }

  openSearchModal() {
    console.log('bla')
    // RNGooglePlaces.openAutocompleteModal()
    //   .then(place => {
    //     console.log("=======", place);
    //     // place represents user's selection from the
    //     // suggestions and it is a simplified Google Place object.
    //   })
    //   .catch(error => console.log(error.message)); // error is a Javascript Error object
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    console.log("Your Position is...");
    navigator.geolocation.watchPosition(
      position => {
        coords = this.computeMapDelta(
          position.coords.latitude,
          position.coords.longitude,
          position.coords.accuracy
        );
        console.log(coords)
        this.setState({
          region:{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: coords.latitudeDelta,
            longitudeDelta: coords.longitudeDelta
          }
        });
      },
      err => console.log(err)
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
}

marker() {
  console.log(this.state)
  return {
    latitude: this.state.region.latitude,
    longitude: this.state.region.longitude
  };
}

onRegionChange(region) {
  this.setState({
      region: region,
    });
}

  render() {
    return (
      <View style={styles.container}>
        {this.state.region.latitude ? (
          <MapView.Animated
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            initialRegion={
              this.state.region
            }
            // onRegionChange={this.onRegionChange.bind(this)}
          >
            <MapView.Marker
              coordinate={this.marker()}
              title="You"
              description="You are here!"
              // pinColor="red"
            >
              <View style={styles.radius}>
                <View style={styles.marker} />
              </View>
            </MapView.Marker>

            <Callout>
            <View style={styles.calloutView}>
                <Button
                  style={styles.calloutSearch}
                  title={"Search"}
                  onPress={() => this.openSearchModal()}
                />
              </View>
            </Callout>

            {this.state.markers.map(marker => (
              <MapView.Marker
                draggable
                pinColor={"black"}
                key={marker.title}
                coordinate={marker.coordinates}
                title={marker.title}
              />
            ))}
          </MapView.Animated>
        ) : (
          <Text>No Coordinates found!</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 122, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 20 / 2,
    overflow: "hidden",
    backgroundColor: "#007AFF"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  calloutView: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: 40
  },
  calloutSearch: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0
  }
});
