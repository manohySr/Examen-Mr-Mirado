const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "postgres",
    password: "mnhy20002?",
    host: "localhost",
    port: 5432,
    database: "GestionEtudiant"
})
module.exports = pool;