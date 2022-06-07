export const round = (num, places) => {
    if (!('' + num).includes('e')) {
        const exponencial = num + 'e+' + places;
        return +(Math.round(Number(exponencial)) + 'e-' + places);
    } else {
        const arr = ('' + num).split('e');
        let sig = '';
        if (+arr[1] + places > 0) {
            sig = '+';
        }
        const exponencial = +arr[0] + 'e' + sig + (+arr[1] + places);
        return +(Math.round(Number(exponencial)) + 'e-' + places);
    }
};
