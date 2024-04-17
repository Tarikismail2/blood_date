const getSlotLabel = (value) => {
    switch (value) {
        case 'slot1':
            return '9:00 - 10:00';
        case 'slot2':
            return '10:00 - 11:00';
        case 'slot3':
            return '11:00 - 12:00';
        case 'slot4':
            return '15:00 - 16:00';
        case 'slot5':
            return '16:00 - 17:00';
        case 'slot6':
            return '17:00 - 18:00';
        default:
            return '';
    }
};
export default getSlotLabel;