const exp = require('constants');
const cool = require('cool-ascii-faces');
const bodyParser = require('body-parser')
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
   const { Client } = require('pg');
    const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  client.connect();

  client.query('select * from hxtstorecap where code = $1::text ;',[code], (err, result) => {
  if(err) {
    res.send('Record not found')
  }
  else if(result.rows.length == 0){
    res.send('Record not found')
  }
  else{
    res.send(
      `
      <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
        }

        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }

        tr:nth-child(even) {
          background-color: #dddddd;
        }
        </style>
      <h2>Show HAXTER STORE Balance </h2>
      <table>
        <tr>
          <th>Code</th>
          <th>Part no.</th>
          <th>Quantity</th>
        </tr>
        <tr>
          <td>${result.rows[0].code} </td>
          <td>${result.rows[0].partno}</td>
          <td>${result.rows[0].quantity}</td>
        </tr>
      </table>
      `
    )
      }
    client.end()
  })

  })
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
   
    //client.end();
    x = client.query('SELECT NOW()', (err, res) => {
      
      console.log(err, res)
      client.end()
    })
    res.send(result+ "," + typeof(result) + "," + result.rows+" x = " + x)
  
    
})
.get('/testsql_show', function(req, res) {
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  client.connect();

  client.query('select * from hxtstorecap where code = \'ALP-COM-0-0\';', (err, result) => {
    res.send("show: "+ result+ ",type :" + typeof(result) + ",Code :" + result.rows[0].code)
    //console.log(err, res)
    client.end()
  })
 

  
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));