const express = require('express');
const sequelize = require('./database/config');
const userRouter = require('./router/user-routes');

const app = express();
app.use(express.json());

//Connect and Sync database
sequelize.authenticate()
.then(() => {
    console.log('Database Connected!');
    return sequelize.sync();
})
.then(() => console.log('Models Synced!')
)
.catch(err => console.error('Database error', err)
);

app.use('/api/user',userRouter);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});