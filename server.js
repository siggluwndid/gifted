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
    res.send("OK!!")
})

const getRouter = require('./routes/api');
const postRouter = require('./routes/post');
app.use('/', getRouter);      
app.use('/', postRouter); 


const sendReminderEmail = require('./util/sendemail');

// 1. 로직을 하나의 독립된 함수로 분리
async function checkAndSendEmail() {
  console.log('⏰ 유통기한 임박 식품 체크 시작...');
  
  async function checkAndSendEmail() {
  console.log('⏰ 유통기한 임박 식품 체크 시작...');
  
  // 🎯 DB 조회(Food.find)를 빼고 하드코딩 배열 입력! (50초 대기 원인 제거)
  const urgentFoods = [
    { name: '우유', expirationDate: '2026-07-30' },
    { name: '계란', expirationDate: '2026-07-31' }
  ];

  console.log('✉️ 이메일 전송 시작...');
  await sendReminderEmail(urgentFoods);
  console.log('🎉 전송 로직 완료!');
}
}

// 2. 매일 아침 9시 자동 스케줄러 등록
cron.schedule('0 9 * * *', checkAndSendEmail);

// 🎯 [시연용] 서버 실행되자마자 즉시 1회 실행!
app.listen(PORT, () => {
    console.log(`🚀 서버가 포트 ${PORT}에서 정상 작동 중입니다!`)
})