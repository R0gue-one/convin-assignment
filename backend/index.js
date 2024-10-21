import express from 'express';
import cors from 'cors';
import {connectToMongoDB} from './utils/prerun.js';

import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';
import expenseRoute from './routes/expense.js';
import addFriendRoute from './routes/addFriend.js';
import emailBSRoute from './routes/balanceSheet-email.js';
import overallBSRoute from './routes/balanceSheet-overall.js';
import downloadBSRoute from './routes/balanceSheet-download.js';


const app = express();
const port = 3000;


// Middleware
app.use(cors());
app.use(express.json());

//initalise moogo connection
(async () => {
  await connectToMongoDB();
})();


// Routes
app.get('/', (req, res) => {
  res.json({
    msg: "Hello World!"
  });
});

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/expense', expenseRoute);
app.use('/addFriend', addFriendRoute);
app.use('/balanceSheet', emailBSRoute);
app.use('/balanceSheet-overall', overallBSRoute);
app.use('/balanceSheet/download', downloadBSRoute);


// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

