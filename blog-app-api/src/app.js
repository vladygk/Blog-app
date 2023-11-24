const express = require('express');
require('./config/config');
const connectToDatabase = require('./config/database');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');
const morgan = require('morgan');
const logger = require('./utils/logger');

const app = express();

app.use([express.urlencoded({extended:false}),express.json()]);
app.use(morgan('combined'));

app.use('/posts',postRouter);
app.use('/comments',commentRouter);

const port = process.env.PORT;
connectToDatabase();
app.listen(port,()=>{
    logger.info(`Http server stared on port ${port}`);
});
