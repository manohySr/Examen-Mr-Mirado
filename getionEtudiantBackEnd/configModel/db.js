const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "postgres",
    password: "it was the password",
    host: "localhost",
    port: 5432,
    database: "GestionEtudiant"
})
module.exports = pool;
