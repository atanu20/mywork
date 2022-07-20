require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const auth = require('./middleware/auth');
const employeeTable = require('./models/user');

// Routes
app.use('/user', require('./routes/userRouter'));

app.get('/', (req, res) => {
  res.send('Welcome to Bill Management');
});
app.get('/auth/isVerify', auth, async (req, res) => {
  try {
    const user = req.user;
    // console.log(user.id);
    const mydata = await employeeTable.findById(user.id).select('-password');

    if (mydata) {
      res.send({ success: true, msg: 'done', userInfo: mydata });
    } else {
      res.send({ success: false, msg: 'something wrong', userInfo: [] });
    }
  } catch (err) {
    res.send({ success: false, msg: 'Something wrong' });
  }
});
// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to mongodb');
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
//
