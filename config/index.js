
const HOSTNAME = process.env.HOST?process.env.HOST:"http://localhost";
const PORT_NO = process.env.PORT?process.env.PORT:"5002";

const UPLOAD_IMAGE_URL = `${HOSTNAME}:${PORT_NO}`; // http://localhost:5002
const REST_API_URL = `${HOSTNAME}:${PORT_NO}/product-rush/api`; // http://localhost:5002/product-rush/api


module.exports = { HOSTNAME, PORT_NO, UPLOAD_IMAGE_URL, REST_API_URL }
