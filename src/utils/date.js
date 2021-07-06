function sumTimes() {
    let dt = new Date(0, 0, 0, 0, 0, 0, 0);

    dt.setHours(dt.getHours() + 1);
    dt.setMinutes(dt.getMinutes() + 30);

    return dt.getHours() + ':' + dt.getMinutes();
}

module.exports = {
    sumTimes
}