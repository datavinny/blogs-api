const today = new Date();
const currentTimestamp = `${(today.getMonth() + 1)}-${today.getDate()}-${today.getFullYear()}`;

module.exports = currentTimestamp;