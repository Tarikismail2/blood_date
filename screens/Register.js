import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Register = () => {
    const navigation = useNavigation();

    const handleRegister = () => {
        const userData = {
            name: name,
            email: email,
            mobile: mobile,
            password: password
        };
        axios.post('http://192.168.43.8:5001/register', userData)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [name, setName] = useState("");
    const [nameVerify, setNameVerify] = useState(false);
    const [email, setEmail] = useState("");
    const [emailVerify, setEmailVerify] = useState(false);
    const [mobile, setMobile] = useState("");
    const [mobileVerify, setMobileVerify] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState(false);
    //valiation du name
    function handleName(text) {
        setName(text);
        setNameVerify(text.length > 2);
    }
    //validation de  l'adresse email
    function handleEmail(text) {
        setEmail(text);
        const emailStructure = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailStructure.test(text);
        setEmailVerify(isValidEmail);
    }

    function handleMobile(text) {
        setMobile(text);
        const isValidPhoneNumber = /^\d{10}$/.test(text);
        setMobileVerify(isValidPhoneNumber);
    }

    function handlePassword(text) {
        setPassword(text);
        setPasswordVerify(text.length > 5);
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/register_images.png')} />
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.text_header}>Register !!!</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user" color="#420475" style={styles.smallIcon} />
                        <TextInput placeholder="Name" style={styles.textInput} onChangeText={handleName} />
                        {name.length < 2 && name.length < 1 ? null : nameVerify ?
                            <Feather name="check-circle" color='#68C39F' size={20} /> :
                            <Feather name="alert-triangle" color='#FFD700' size={20} />
                        }
                    </View>

                    {name.length < 2 && name.length < 1 ? null : nameVerify ? null :
                        <Text style={{ marginLeft: 20, color: 'red' }}>The name should be more than 2 caracters</Text>}

                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
                        <TextInput placeholder="Email" style={styles.textInput} onChangeText={handleEmail} />
                        {email.length < 1 ? null : emailVerify ?
                            <Feather name="check-circle" color='#68C39F' size={20} /> :
                            <Feather name="alert-triangle" color='#FFD700' size={20} />
                        }
                    </View>

                    {email.length < 1 ? null : emailVerify ? null :
                        <Text style={{ marginLeft: 20, color: 'red' }}>The email should be in this form xyz@xyz.com</Text>}

                    <View style={styles.action}>
                        <FontAwesome name="phone" color="#420475" style={styles.smallIcon} />
                        <TextInput placeholder="Mobile" style={styles.textInput} onChangeText={handleMobile} />
                        {mobile.length < 1 ? null : mobileVerify ?
                            <Feather name="check-circle" color='#68C39F' size={20} /> :
                            <Feather name="alert-triangle" color='#FFD700' size={20} />
                        }
                    </View>

                    {mobile.length < 1 ? null : mobileVerify ? null :
                        <Text style={{ marginLeft: 20, color: 'red' }}>The mobile number should be contain 10 digits</Text>}

                    <View style={styles.action}>
                        <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                        <TextInput placeholder="Password" style={styles.textInput} onChangeText={handlePassword} />
                        {(password.length < 1 || password.length > 5) ? null : passwordVerify ?
                            <Feather name="check-circle" color='#68C39F' size={20} /> :
                            <Feather name="alert-triangle" color='#FFD700' size={20} />
                        }
                    </View>

                    {(password.length < 1 || password.length < 5) ? null : passwordVerify ? null :
                        <Text style={{ marginLeft: 20, color: 'red' }}>The password should be more than 5 caracters</Text>}

                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.inBut} onPress={handleRegister}>
                        <View>
                            <Text style={styles.textSign}>Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191', marginLeft: 80 }}>
                        ---You already have an acount---
                    </Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                        <Text style={{color:'#420475',fontWeight:'bold',fontSize:25,}} >Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Register;
