// Login.js
import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/login_images.jpg')} />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.text_header}>Login !!!</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
          <TextInput placeholder="Email" style={styles.textInput} />
        </View>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
          <TextInput placeholder="Password" style={styles.textInput} />
        </View>
        <View
          style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 8, marginRight: 10 }}
        >
          <Text style={{ color: '#420475', fontWeight: '700' }}>
            Forget Password
          </Text>
        </View>
      </View>
      <View style= {{marginBottom :30,justifyContent:'center',alignItems:'center'}}>
      <View style={styles.button}>
        <TouchableOpacity style={styles.inBut}>
          <View>
            <Text style={styles.textSign}>Log in</Text>
          </View>
        </TouchableOpacity>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191' }}>---Or log in with---</Text>
        </View>
      </View>
      <View style={styles.bottomButton}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TouchableOpacity style={styles.inBut2}>
            <FontAwesome name="user-circle-o" color="white" style={styles.smallIcons2} />
          </TouchableOpacity>
          <Text style={styles.inBut2}>Guest</Text>
        </View>
      </View>
      <View style={styles.bottomButton}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TouchableOpacity style={styles.inBut2} onPress={navigateToRegister}>
            <FontAwesome name="user-plus" color="white" style={styles.smallIcons2} />
          </TouchableOpacity>
          <Text style={styles.bottomButton}>Sign Up</Text>
        </View>
      </View>
      <View style={styles.bottomButton}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TouchableOpacity style={styles.inBut2}>
            <FontAwesome name="google" color="white" style={styles.smallIcons2} />
          </TouchableOpacity>
          <Text style={styles.bottomButton}>Google</Text>
        </View>
      </View>
      <View style={styles.bottomButton}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TouchableOpacity style={styles.inBut2}>
            <FontAwesome name="facebook-f" color="white" style={styles.smallIcons2} />
          </TouchableOpacity>
          <Text style={styles.bottomButton}>Facebook</Text>
        </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
