import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import local from './key';
import { StyleSheet } from "react-native";
import {getSlotLabel} from './slot'

const Myappointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [userData, setUserData] = useState(''); 

    async function getData() {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("token: " + token);
            axios.get(local + '/my-appointments', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    console.log("appointments = " + res.data.data);
                    setAppointments(res.data.data);
                });
                console.log("succes : "+ appointments)
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    }    

    useEffect(() => {
        getData();
    }, []);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
        <View style={styles.container}>
            <Text style={styles.title}>Mes rendez-vous :</Text>
            {appointments.map((appointment, index) => (
                <View key={index} style={styles.appointmentContainer}>
                    <View style={styles.appointmentInfo}>
                        <Text style={styles.label}>Centre :</Text>
                        <Text style={styles.value}>{appointment.center_Name}</Text>
                    </View>
                    <View style={styles.appointmentInfo}>
                        <Text style={styles.label}>Date :</Text>
                        <Text style={styles.value}>{appointment.date}</Text>
                    </View>
                    <View style={styles.appointmentInfo}>
                        <Text style={styles.label}>Heure :</Text>
                        <Text style={styles.value}>{appointment.time_slot}</Text>
                    </View>
                </View>
            ))}
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    appointmentContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
    },
    appointmentInfo: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    value: {
        flex: 1,
    },
});

export default Myappointments;
