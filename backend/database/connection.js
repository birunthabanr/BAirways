const sql = require("mssql");

const sqlConfig = {
  user: "root",
  password: "Pulinduv@2002",
  database: "BAirways",
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};
(async () => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`select * from mytable where id = ${value}`;
    console.dir(result);
  } catch (err) {}
})();
