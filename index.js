const express = require('express');
const bodyParser = require('body-parser');
const PORT = 8002;
const app = express();
const cors = require('cors');
const userRoutes = require('./ROUTES/userRoutes');
const taskRoutes = require('./ROUTES/taskRoutes');

require('dotenv').config();
require('./db');

app.use(cors());
app.use(bodyParser.json());
app.use('/users',userRoutes);
app.use('/tasks',taskRoutes);
//test api
app.get('/', (req,res)=> {
    res.json({message:"api is working"})
})

app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})