const express = require('express');
const cron = require('node-cron');
const Food = require('./model/Food');
const mongoose = require('mongoose');
const path = require('path');
const dbconnect = require("./config/db")
require('dotenv').config
const PORT = 3000
const app = express()

dbconnect()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/test", (req,res) => {
    checkAndSendEmail()
})

const getRouter = require('./routes/api');
const postRouter = require('./routes/post');
app.use('/', getRouter);      
app.use('/', postRouter); 


const sendReminderEmail = require('./util/sendemail');

// 1. 로직을 하나의 독립된 함수로 분리
async function checkAndSendEmail() {
  console.log('⏰ 유통기한 임박 식품 체크 시작...');
  
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);

  const urgentFoods = await Food.find({
    expirationDate: { $gte: today, $lte: threeDaysLater }
  });

  if (urgentFoods.length > 0) {
    await sendReminderEmail(urgentFoods);
  }
}

// 2. 매일 아침 9시 자동 스케줄러 등록
cron.schedule('0 9 * * *', checkAndSendEmail);

// 🎯 [시연용] 서버 실행되자마자 즉시 1회 실행!
app.listen(PORT, () => {
    console.log(`🚀 서버가 포트 ${PORT}에서 정상 작동 중입니다!`)
})