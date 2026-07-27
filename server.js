const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dbconnect = require("./config/db")
require('dotenv').config
const PORT = 3000
const app = express()

dbconnect()

app.get('/test', (req, res) => {
  res.send('서버 생존 확인!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getRouter = require('./routes/api');
const postRouter = require('./routes/post');

app.use('/', getRouter);      
app.use('/', postRouter); 

app.listen(PORT, () => {
    console.log(`🚀 서버가 포트 ${PORT}에서 정상 작동 중입니다!`)
})