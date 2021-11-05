const express = require('express');
const data_1=require("./routes/routes")
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use('/users',data_1)
app.get('/', (req, res) => {
  res.send("Hello World");
});
app.listen(8010, () => {
  console.log(`Server is listening on port`);
});



