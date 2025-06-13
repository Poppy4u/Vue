const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/user', userRouter);

app.listen(3000, () => {
  console.log('API server running at http://localhost:3000');
});