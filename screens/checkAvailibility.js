import axios from 'axios';
import local from './key';

const checkAvailability = async (centerName, timeSlot, date) => {
    try {
        const response = await axios.post(local + '/check-availability', {
            centerName,
            timeSlot,
            date,
        });
        return response.data.available;
    } catch (error) {
        console.error('Error checking availability:', error);
        return false;
    }
};
export default checkAvailability;
