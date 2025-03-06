import mysql from 'mysql2'

export const User=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'Neer5114r',
    database: 'LevelUp',
    port: 3306,
}).promise();