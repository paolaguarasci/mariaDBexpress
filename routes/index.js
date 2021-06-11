const mariadb = require('mariadb')
var express = require('express')
var router = express.Router()

const pool = mariadb.createConnection({
  host: 'my-mariadb-galera.paola-galera-3.svc.cluster.local',
  user: 'paola',
  password: 'root',
  database: 'bg',
  port: '3306'
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', data: '' })
})




router.get('/db', async function (req, res, next) {

  let conn
  let rows
  let results
  try {
    conn = await pool.getConnection()
    rows = await conn.query("SELECT 1 as val")
    console.log(rows) //[ {val: 1}, meta: ... ]
    results = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"])
    console.log(res) // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
    throw err
  } finally {
    if (conn) return conn.end()
  }

  res.render('index', { title: 'DB Connect', data: results })
})














module.exports = router
