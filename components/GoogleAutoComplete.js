import { GoogleAutocomplete } from "react-native-google-autocomplete";
import React, { Component } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import apikey from '../apikey';

export default class GoogleAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
    <GoogleAutoComplete apiKey="AIzaSyCMUVo41s3bPNsjlKBrFPqzqUETtn-0YCc" debounce={300}>
    {({ inputValue, handleTextChange, locationResults, fetchDetails }) => (
      <React.Fragment>
        <TextInput
          style={{
            height: 40,
            width: 300,
            borderWidth: 1,
            paddingHorizontal: 16,
          }}
          value={inputValue}
          onChangeText={handleTextChange}
          placeholder="Location..."
        />
        <ScrollView style={{ maxHeight: 100 }}>
          {locationResults.map((el, i) => (
            <LocationItem
              {...el}
              fetchDetails={fetchDetails}
              key={String(i)}
            />
          ))}
        </ScrollView>
      </React.Fragment>
    )}
  </GoogleAutoComplete>
);
}
}

const styles = StyleSheet.create({
  container: {
    color: "white"
  }
});
