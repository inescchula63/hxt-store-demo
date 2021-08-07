const exp = require('constants');
const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000; //5000 or 5432

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/showbalance/:code', function(req, res) {
   const code = req.params.code
   res.send('code: ' + code + ' and name: pending');})
  .get('/testsql_add', function(req, res) {
    const { Client } = require('pg');
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    client.connect();
    const result = client.query('INSERT INTO hxtstorecap (Code, PartNo, Quantity) VALUES (\'ALP-COM-0-2\', \'test ALP3\',5);');
    client.end()
   
    //client.end();
    x = client.query('SELECT NOW()', (err, res) => {
      
      console.log(err, res)
      client.end()
    })
    res.send(result+ "," + typeof(result) + "," + result.rows+" x = " + x)
  
    
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));