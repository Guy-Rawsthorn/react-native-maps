export default function findCurrentLocation(lat, lon, distance) {
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