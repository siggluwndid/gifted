const mongoose = require('mongoose');
const express = require('mongoose')


const MONGO_URI = "mongodb+srv://didalswns:didalswns@cluster0.hdno9aa.mongodb.net/gifted";

function dbconnect() {
    mongoose.connect(MONGO_URI)
    .then(() => console.log('🟢 몽고DB 연결 성공! 데이터베이스 준비 완료.'))
    .catch((err) => {
        console.error('❌ 몽고DB 연결 실패:', err.message);
    });
}

module.exports = dbconnect;