import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

import Home from './screens/Home';
import BookAppointment from './screens/Bookappointment';
import MyAppointment from './screens/Myappointments';
import Login from './screens/Login';
import Register from './screens/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// const StackNav = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Hhome" component={Home} />
//       <Stack.Screen name="BookAppointment" component={BookAppointment} />
//       <Stack.Screen name="MyAppointment" component={MyAppointment} />
//     </Stack.Navigator>
//   );
// };

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

const LoginNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!token); // Convert token to boolean
      } catch (error) {
        console.error('Error retrieving token:', error);
        setIsLoggedIn(false);
      } finally {
        SplashScreen.hide();
      }
    };
    getToken();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <DrawerNav />
      ) : (
        <LoginNav />
      )}
    </NavigationContainer>
  );
};

export default App;
