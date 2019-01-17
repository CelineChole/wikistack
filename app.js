const morgan = require('morgan');
const express = require('express');
const { db } = require('./models');

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.send('Hello World');
})

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const init = async () => {
  //Secind option:
    //await models.user.sync()
    //await models.page.sync()
    await db.sync()
    //await models.db.sync({force: true})
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
  })  
}

init();
