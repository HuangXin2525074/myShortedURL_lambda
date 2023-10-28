const {idToShortURL} = require('./until');

const id = new Date().valueOf();

console.log("id:", id);

const shorted  = idToShortURL(id);
console.log("shorted:", shorted);