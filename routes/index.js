const mariadb = require('mariadb')
var express = require('express')
var router = express.Router()

const pool = mariadb.createPool({
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
    let num = Math.floor((Math.random() * 1000) + 1)
    conn = await pool.getConnection()
    results = await conn.query("INSERT INTO myTable value (?, ?)", [1, `mariadb-${num}`])
    rows = await conn.query("SELECT * from myTable")
    console.log(rows)
  } catch (err) {
    throw err
  } finally {
    if (conn) return conn.end()
  }

  res.render('index', { title: 'DB Connect', data: rows })
})














module.exports = router
