import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const userData = { email: email, password: password };
        axios.post('http://192.168.43.8:5001/login', userData)
            .then((res) => {
                if (res.data.status === 'ok') {
                    const redirectTo = res.data.redirectTo;
                    // Naviguer vers la page spécifiée
                    navigation.navigate(redirectTo);
                } else {
                    console.log(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/login_images.jpg')} />
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.text_header}>Login !!!</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
                        <TextInput placeholder="Email" style={styles.textInput} onChangeText={setEmail} />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                        <TextInput placeholder="Password" style={styles.textInput} secureTextEntry={true} onChangeText={setPassword} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <View
                            style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 8, marginRight: 10 }}
                        >
                            <Text style={{ color: '#420475', fontWeight: '700' }}>
                                Forget Password
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.inBut} onPress={handleLogin}>
                            <View>
                                <Text style={styles.textSign}>Log in</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ padding: 15 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191' }}>
                                ---You still don't have any acount---
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={{ color: '#420475', fontWeight: 'bold', fontSize: 25, }} >Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Login;
