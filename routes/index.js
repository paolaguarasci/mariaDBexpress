const mariadb = require('mariadb')
var express = require('express')
var router = express.Router()

const pool = mariadb.createPool({
  host: 'galera',
  user: 'paola',
  password: 'root',
  database: 'bg',
  port: '3306'
})


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', data: '' })
})

router.get('/database', async function (req, res, next) {
  let conn
  let rows
  try {
    conn = await pool.getConnection()
    rows = await conn.query("SELECT * from login")
    console.log(rows)
  } catch (err) {
    throw err
  } finally {
    if (conn) return conn.end()
  }

  res.render('index', { title: 'DB Connect', data: Array.from(rows) })
})














module.exports = router
