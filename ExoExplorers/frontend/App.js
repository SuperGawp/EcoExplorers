import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [transportMode, setTransportMode] = useState('');
  const [distance, setDistance] = useState('');
  const [energySource, setEnergySource] = useState('');
  const [energyConsumption, setEnergyConsumption] = useState('');
  const [totalEmissions, setTotalEmissions] = useState(null);

  const calculateEmissions = () => {
    // Implement the logic to calculate emissions here and update totalEmissions state.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ExoExplorers</Text>
      <TextInput
        style={styles.input}
        placeholder="Transportation Mode"
        value={transportMode}
        onChangeText={setTransportMode}
      />
      {/* Add input fields for distance, energy source, and energy consumption */}
      <Button title="Calculate Emissions" onPress={calculateEmissions} />
      <Text style={styles.resultText}>Total Emissions: {totalEmissions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16, // Adjust padding for iPhone layout
  },
  title: {
    fontSize: 20,
    marginBottom: 20, // Adjust spacing for iPhone layout
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 12, // Adjust spacing for iPhone layout
    width: '100%', // Ensure input field takes the full width
  },
  resultText: {
    fontSize: 18,
    marginTop: 20, // Adjust spacing for iPhone layout
  },
});
