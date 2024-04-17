import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import local from './key';
import axios from 'axios';
import { StyleSheet } from 'react-native';

const Bookappointment = () => {
    const [selectedCenter, setSelectedCenter] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [userData, setUserData] = useState('');

    async function getData() {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        axios.post(local + '/userdata', { token: token })
            .then(res => {
                console.log("valeur 1 = " + res.data.data);
                setUserData(res.data.data);
                console.log(res.data.data);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const handleAppointmentBooking = async () => {
        if (!selectedCenter || !selectedTimeSlot || !selectedDate) {
            Alert.alert('Veuillez choisir un centre de santé, une date et un créneau horaire.');
            return;
        }
        try {
            const isAvailable = await checkAvailability(selectedCenter, selectedTimeSlot, selectedDate);
            console.log(isAvailable);
            if (!isAvailable) {
                Alert.alert('Ce creneau horaire est déjà réservé. Veuillez choisir un autre créneau.');
                return;
            }
            const response = await axios.post(local + '/book-appointment', {
                userId: userData.id,
                centerName: selectedCenter,
                timeSlot: selectedTimeSlot,
                date: selectedDate,
            });
            Alert.alert(response.data.message);
        } catch (error) {
            console.error('Error during appointment booking:', error);
            Alert.alert('Une erreur lors de la prise de rendez-vous. Veuillez réessayer.');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
            <View style={styles.container}>
                <Text style={styles.title}>Choisissez une date :</Text>
                <Calendar
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    markedDates={{ [selectedDate]: { selected: true, marked: true } }}
                    style={styles.calendar}
                />
                <Text style={styles.title}>Choisissez un centre de santé :</Text>
                <Picker
                    selectedValue={selectedCenter}
                    onValueChange={(itemValue) => setSelectedCenter(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Centre de santé 1" value="center1" />
                    <Picker.Item label="Centre de santé 2" value="center2" />
                    <Picker.Item label="Centre de santé 3" value="center3" />
                    <Picker.Item label="Centre de santé 4" value="center4" />
                    <Picker.Item label="Centre de santé 5" value="center5" />
                    <Picker.Item label="Centre de santé 6" value="center6" />
                </Picker>
                <Text style={styles.title}>Choisissez un créneau horaire :</Text>
                <Picker
                    selectedValue={selectedTimeSlot}
                    onValueChange={(itemValue) => setSelectedTimeSlot(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="9:00 - 10:00" value="slot1" />
                    <Picker.Item label="10:00 - 11:00" value="slot2" />
                    <Picker.Item label="11:00 - 12:00" value="slot3" />
                    <Picker.Item label="15:00 - 16:00" value="slot4" />
                    <Picker.Item label="16:00 - 17:00" value="slot5" />
                    <Picker.Item label="17:00 - 18:00" value="slot6" />
                </Picker>
                <Button title="Prendre rendez-vous" onPress={handleAppointmentBooking} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
    },
    calendar: {
        marginBottom: 20,
    },
    picker: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
    },
});

export default Bookappointment;
