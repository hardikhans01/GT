const express = require('express');
const app = express();

const superUserRoutes = require('./routes/superUserRoutes');
const router = require('./routes/router');

app.use(express.json());

app.get('/',function(req,res){
    res.write('hello world');
    res.end();
})

app.use(router);
app.use(superUserRoutes);
app.use((req, res) => {
    res.status(404).send('Not Found');
  });

module.exports = app;