const express = require('express');
const path = require('path');
const port = 3000;
const app = express();

app.set('view engine','jade');
app.set('views', './app/templates')

app.use( express.static(path.join(__dirname, 'public')))

/**
 * Routes
 */
app.get('/',(req,res) =>{
  res.render('./index')
})

app.get('/form', (req, res) => {
  res.render('./form')
})

/*Port*/
app.listen(port,() =>{
  console.log('Application running on port 3000')
});
