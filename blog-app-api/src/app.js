const express = require('express');
require('./config/config');
const connectToDatabase = require('./config/database');
const app = express();


const port = process.env.PORT;
connectToDatabase();
app.listen(port,()=>{
    console.log(`Http server stared on port ${port}`);
});
