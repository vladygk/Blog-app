const express = require('express');
const morgan = require('morgan');

require('./config/config');
const connectToDatabase = require('./config/database');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');
const userRouter = require('./routes/user.route');
const logger = require('./utils/logger');
const cors = require('cors');

const app = express();

app.use([cors(), express.urlencoded({extended:false}),express.json()]);
app.use(morgan('combined'));

app.use('/posts',postRouter);
app.use('/comments',commentRouter);
app.use('/auth',userRouter);

const port = process.env.PORT;
connectToDatabase();


app.listen(port,()=>{
    logger.info(`Http server stared on port ${port}`);
});
