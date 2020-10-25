const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = 80;

app.listen(PORT, () => console.log(`app started at ${PORT}`));

const userRouter = require('./routers/users');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRouter);

app.use('/api', (req, res) => {
  res.json({ success: true });
});
