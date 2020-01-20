const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login-route');
const gradeRoute = require('./routes/grade-route');
const subjectRoute = require('./routes/subject-route');
const groupRoute = require('./routes/group-route');
const userRoute = require('./routes/user-route');

const app = express();

app.use(bodyParser.json());
require('./driver/mongo-driver');

const port = process.env.PORT || 3030;
app.use(cors());

app.use('/login', loginRoute);
app.use('/grade', gradeRoute);
app.use('/subject', subjectRoute);
app.use('/group', groupRoute);
app.use('/user', userRoute);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
