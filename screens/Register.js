// Register.js
import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
    return (
        <View>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/register_images.png')} />
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.text_header}>Register !!!</Text>
                <View style={styles.action}>
                    <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                    <TextInput placeholder="Name" style={styles.textInput} />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
                    <TextInput placeholder="Email" style={styles.textInput} />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                    <TextInput placeholder="Mobile" style={styles.textInput} />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                    <TextInput placeholder="Password" style={styles.textInput} />
                </View>
            </View>
            <View style={styles.button}>
                <TouchableOpacity style={styles.inBut}>
                    <View>
                        <Text style={styles.textSign}>Register</Text>
                    </View>
                </TouchableOpacity>
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
                    <TouchableOpacity style={styles.inBut2} onPress={() => { Navigation.navigate('Login') }}>
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
    )
}

export default Register;
