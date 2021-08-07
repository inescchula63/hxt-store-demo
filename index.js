const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


app.get('/showbalance/:code', function(req, res) {

   //if(req.params.code %2 == 0) id = "xxx"
   //else id = "yyy"
   const code = req.params.code
   res.send('code: ' + code + ' and name: pending');
});



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
