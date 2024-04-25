import { Express} from "express";

const mysql = require('mysql');
const cors = require('cors');

const app = Express();
app.use(cors());
app.use(Express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'

});