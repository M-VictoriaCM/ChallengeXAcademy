//import
const express= require('express');
const bodyParser = require('body-parser');
const { logging } = require('./middleware')
const { playerRouter} = require('./routes');
const { initializeDB } = require('./config/dbConfig');

//Initialization
const app = express();
const PORT =8080;

app.use(bodyParser.json());
app.use(logging);
app.use('/player', playerRouter);

//Run server
(async ()=>{
    await initializeDB();
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    });
})();
