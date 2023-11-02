import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const calcFontSize = (percent) => (window.height * percent) / 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: window.width,
    height: window.height,
    padding: 16,
  },
  header: {
    fontSize: calcFontSize(4),
    marginBottom: calcFontSize(2),
  },
  input: {
    width: '90%',
    height: calcFontSize(5),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: calcFontSize(2),
    paddingLeft: 8,
  },
  result: {
    fontSize: calcFontSize(3),
    marginTop: calcFontSize(2),
    fontWeight: 'bold',
  }
});

export default function App() {
  const [transportation, setTransportation] = useState('');
  const [energy, setEnergy] = useState('');
  const [diet, setDiet] = useState('');
  const [airTravel, setAirTravel] = useState('');
  const [bikingWalking, setBikingWalking] = useState('');
  const [treePlanting, setTreePlanting] = useState('');
  const [gardening, setGardening] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState(null);

  const calculateCarbonFootprint = () => {
    // Calculate the carbon footprint based on user input.
    const transportationEmissions = parseFloat(transportation) * 0.80467; // 1 mile = 1.60934 km
    const energyEmissions = parseFloat(energy) * 2;
    const dietEmissions = parseFloat(diet) * 1.5;
    const airTravelEmissions = parseFloat(airTravel) * 10;
    const bikingWalkingEmissions = parseFloat(bikingWalking) * 0.2;
    const treePlantingEmissions = parseFloat(treePlanting) * -0.5;
    const gardeningEmissions = parseFloat(gardening) * 0.1;
    const totalFootprint = transportationEmissions + energyEmissions + dietEmissions + airTravelEmissions + bikingWalkingEmissions + treePlantingEmissions + gardeningEmissions;

    setCarbonFootprint(totalFootprint.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>EcoExplorers</Text>
      <TextInput
        style={styles.input}
        placeholder="Kilometers driven per week"
        onChangeText={(text) => setTransportation(text)}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Hours of TV per day"
        onChangeText={(text) => setEnergy(text)}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Number of burgers per week"
        onChangeText={(text) => setDiet(text)}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Number of flights per year"
        onChangeText={(text) => setAirTravel(text)}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Hours of biking and walking per week"
        onChangeText={(text) => setBikingWalking(text)}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Number of trees planted"
        onChangeText={(text) => setTreePlanting(text)}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Hours spent gardening per week"
        onChangeText={(text) => setGardening(text)}
        keyboardType="default"
      />
      <Button title="Calculate" onPress={calculateCarbonFootprint} />
      {carbonFootprint !== null && (
        <Text style={[styles.result]}>
          Your Carbon Footprint: {carbonFootprint} kg CO2e
        </Text>
      )}
    </View>
  );
}
