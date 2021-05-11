const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();


const PRIVATE_KEY = fs.readFileSync('src/app/keys/private.key')
const PUBLIC_KEY = fs.readFileSync('src/app/keys/public.key');

const {
    APP_HOST,
    APP_PORT,
    MYSQL_HOST, 
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD} = process.env;
module.exports = {APP_PORT,APP_HOST,MYSQL_HOST, MYSQL_PORT,MYSQL_DATABASE,MYSQL_USER,MYSQL_PASSWORD,PRIVATE_KEY,PUBLIC_KEY};
