const express = require('express');
require('./config/config');
const connectToDatabase = require('./config/database');
const postRouter = require('./routes/post.route');
const morgan = require('morgan');


const app = express();

app.use([express.urlencoded({extended:false}),express.json()]);
app.use(morgan('combined'));

app.use('/posts',postRouter);

const port = process.env.PORT;
connectToDatabase();
app.listen(port,()=>{
    console.log(`Http server stared on port ${port}`);
});
