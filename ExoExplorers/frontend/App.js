import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, Button, Dimensions, Image, Linking } from 'react-native';


const window = Dimensions.get('window');

const calcFontSize = (percent) => (window.height * percent) / 100;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: window.width,
    padding: 16,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: window.width,
    padding: 16,
    backgroundColor: '#c7c395',
  },
  header: {
    fontSize: calcFontSize(3),
    marginBottom: calcFontSize(4),
    color: '#007bff', // Blue color
    textAlign: 'center'
  },
  input: {
    width: '90%',
    height: calcFontSize(5),
    borderColor: '#007bff', // Blue color
    borderWidth: 2,
    marginBottom: calcFontSize(3),
    paddingLeft: 8,
    fontSize: calcFontSize(2),
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#007bff', // Blue color
    padding: 10,
    borderRadius: 10,
    marginTop: calcFontSize(3),
    marginBottom: calcFontSize(100),
  },
  buttonText: {
    color: 'white',
    fontSize: calcFontSize(4),
  },
  result: {
    fontSize: calcFontSize(4),
    marginTop: calcFontSize(4),
    fontWeight: 'bold',
    color: '#007bff', // Blue color
    textAlign: 'center',
  },
  tips: {
    fontSize: calcFontSize(2),
    marginTop: calcFontSize(3),
    fontWeight: 'bold',
    color: '#007bff', // Blue color
    textAlign: 'center',
    marginBottom: calcFontSize(3),
  },
  ecoImage: {
    width: calcFontSize(15),
    height: calcFontSize(15),
    marginBottom: calcFontSize(3),
  },
  videoContainer: {
    marginTop: calcFontSize(3),
    width: '90%',
    aspectRatio: 16 / 9,
  },
  highFootprint: {
    color: 'red',
  },
  moderateFootprint: {
    color: 'orange',
  },
  lowFootprint: {
    color: 'green',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  modalHeader: {
    fontSize: calcFontSize(3),
    marginBottom: calcFontSize(2),
    color: '#007bff', // Blue color
    textAlign: 'center',
  },
  modalText: {
    fontSize: calcFontSize(2),
    textAlign: 'center',
    marginBottom: calcFontSize(3),
  },
});

const ModalContent = ({ onClose }) => {
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>
      A kilogram of CO2 equivalent (kg CO2e) is like a measurement tool that helps us understand
        how much pollution an activity creates. If you see a small number, like 14.10 kg CO2e, that's
        very low and good for the planet. But if the number is big, like 400, it means the activity
        creates a lot of pollution, and we should try to do things differently to help the Earth.
      </Text>
      <Button title="Close" onPress={onClose} style={styles.button} />
    </View>
  );
};

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transportation, setTransportation] = useState('');
  const [energy, setEnergy] = useState('');
  const [diet, setDiet] = useState('');
  const [airTravel, setAirTravel] = useState('');
  const [bikingWalking, setBikingWalking] = useState('');
  const [treePlanting, setTreePlanting] = useState('');
  const [gardening, setGardening] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [tips, setTips] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const youtubeVideos = [
    {
      title: 'What is Carbon Footprint?',
      url: 'https://www.youtube.com/watch?v=DKDq1RMHscQ',
    },
    {
      title: 'simpleshow explains the Carbon Footprint',
      url: 'https://www.youtube.com/watch?v=8q7_aV8eLUE',
    },
    // Add more videos as needed
  ];

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const calculateCarbonFootprint = () => {
    if (
      !transportation ||
      !energy ||
      !diet ||
      !airTravel ||
      !bikingWalking ||
      !treePlanting ||
      !gardening
    ) {
      setErrorMessage('Be sure to fill in all the fields before calculating!');
      return;
    }
    const transportationEmissions = parseFloat(transportation) * 0.80467; // 1 mile = 1.60934 km
    const energyEmissions = parseFloat(energy) * 2;
    const dietEmissions = parseFloat(diet) * 1.5;
    const airTravelEmissions = parseFloat(airTravel) * 10;
    const bikingWalkingEmissions = parseFloat(bikingWalking) * 0.2;
    const treePlantingEmissions = parseFloat(treePlanting) * -0.5;
    const gardeningEmissions = parseFloat(gardening) * 0.1;
    const totalFootprint =
      transportationEmissions +
      energyEmissions +
      dietEmissions +
      airTravelEmissions +
      bikingWalkingEmissions +
      treePlantingEmissions +
      gardeningEmissions;

    setCarbonFootprint(totalFootprint.toFixed(2));
    setErrorMessage('');

    let newTips = [];
    if (totalFootprint < 120) {
      newTips.push("Great job! Your carbon footprint is very low. Keep up the eco-friendly habits!");
    } else if (totalFootprint < 200) {
      newTips.push("Good effort! There's still room for improvement. Consider reducing energy consumption and driving less.");
    } else {
      newTips.push("It looks like there's room for improvement. Consider reducing your energy consumption, driving less, and adopting a more plant-based diet.");
    }
    setTips(newTips);

    if (carbonFootprint !== null) {
      openModal();
    }
  };

  const openYouTubeVideo = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} height={5000}>
      <View style={styles.container}>
      <Image source={require('../assets/EcoExplorersLogo.png')} style={styles.ecoImage} />
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
        placeholder="Number of veggie meals per week"
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
      <Button title="Calculate" onPress={calculateCarbonFootprint} style={styles.button} />

      {errorMessage ? (
          <Text style={{ color: 'red', fontSize: calcFontSize(2), marginTop: calcFontSize(2) }}>
            {errorMessage}
          </Text>
        ) : null}

      {carbonFootprint !== null && (
          <View>
            <Text style={[styles.result, getFootprintColorStyle(carbonFootprint)]}>
              Your Carbon Footprint: {carbonFootprint} kg CO2e
              <Button title="What does kg CO2e mean?" onPress={openModal} style={styles.button} />
              {isModalVisible && <ModalContent onClose={closeModal} />}
            </Text>
            {tips.length > 0 && (
              <View>
                {tips.map((tip, index) => (
                  <Text key={index} style={styles.tips}>
                    {tip}
                  </Text>
                ))}
              </View>
            )}

            {youtubeVideos.length > 0 && (
              <View>
                <Text style={styles.header}>YouTube Videos for Tips:</Text>
                {youtubeVideos.map((video, index) => (
                  <Button
                    key={index}
                    title={video.title} 
                    onPress={() => openYouTubeVideo(video.url)} 
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
  function getFootprintColorStyle(value) {
    if (value >= 200) {
      return styles.highFootprint;
    } else if (value >= 120) {
      return styles.moderateFootprint;
    } else {
      return styles.lowFootprint;
    }
  }
}