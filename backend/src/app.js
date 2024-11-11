//import
const express= require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const { logging } = require('./middleware')
const { playerRouter} = require('./routes');
const { initializeDB } = require('./config/dbConfig');

//Initialization
const app = express();
const PORT =8080;


app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(logging);
app.use('/player', playerRouter);


//Run server
(async ()=>{
    await initializeDB();
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    });
})();
