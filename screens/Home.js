import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import local from './key';
import BookAppointment from './Bookappointment';
import MyAppointment from './Myappointments';
import Login from './Login';

const Tab = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    axios.post(local + '/userdata', { token: token })
      .then(res => {
        console.log("valeur1 = " + res.data.data);
        setUserData(res.data.data);
        console.log(res.data.data);
      });
  }

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Récupérer le token
  
      const response = await axios.post(local+'/logout', null, {
        headers: { Authorization: `Bearer ${token}` }, // Inclure le token dans les en-têtes
      });
  
      if (response.status === 200) {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('isLoggedIn');

        navigation.navigate("Login");
      } else {
        console.error('Erreur lors de la déconnexion:', response.data);
        Alert.alert('Erreur lors de la déconnexion. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      Alert.alert('Erreur lors de la déconnexion. Veuillez réessayer.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background_image.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue sur BloodDonor</Text>
        <Text style={styles.subtitle}>
          L'application qui vous permet de sauver des vies en donnant du sang
        </Text>
        <Button
          title="Commencer"
          onPress={() => navigation.navigate('BookAppointment')}
        />
        <Button title="Déconnexion" onPress={handleLogout} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
  },
});

    const TabNavigator = () => {
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
    
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Prendre un RDV') {
                iconName = 'book';
              } else if (route.name === 'Mes RDV') {
                iconName = 'event';
              }
                  return <MaterialIcons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Prendre un RDV" component={BookAppointment} />
          <Tab.Screen name="Mes RDV" component={MyAppointment} />
        </Tab.Navigator>
      );
    };
    
    export default TabNavigator;
