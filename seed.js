const mongoose = require('mongoose');
require('dotenv').config
const Food = require('./model/Food'); // 작성하신 스키마 파일 경로

const MONGO_URI = "mongodb+srv://didalswns:didalswns@cluster0.hdno9aa.mongodb.net/gifted"
const dummyFoods = [
    { name: "배추김치", storageType: "냉장", expirationDate: new Date("2026-08-15") },
    { name: "서울우유", storageType: "냉장", expirationDate: new Date("2026-08-02") },
    { name: "만두", storageType: "냉동", expirationDate: new Date("2027-01-10") },
    { name: "돼지고기 앞다리살", storageType: "냉동", expirationDate: new Date("2026-09-30") },
    { name: "양파", storageType: "냉장", expirationDate: new Date("2026-08-20") },
    {name: "닭가슴살", storageType: "냉동", expirationDate: new Date("2026-10-15") },
    { name: "사과", storageType: "냉장", expirationDate: new Date("2026-08-05") },
    { name: "대파", storageType: "냉장", expirationDate: new Date("2026-08-03") },
    { name: "소고기 국거리", storageType: "냉동", expirationDate: new Date("2026-11-20") },
    { name: "슬라이스 치즈", storageType: "냉장", expirationDate: new Date("2026-09-01") },
    { name: "즉석밥", storageType: "냉장", expirationDate: new Date("2027-05-10") },
    { name: "오이", storageType: "냉장", expirationDate: new Date("2026-08-02") },
    { name: "새우살", storageType: "냉동", expirationDate: new Date("2026-12-31") },
    { name: "참치캔", storageType: "냉장", expirationDate: new Date("2028-03-15") }
];

async function seedDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB 연결 성공!");

        // 기존 데이터 싹 비우고 넣으려면 주석 해제
        // await Food.deleteMany({});

        // 데이터 삽입
        const result = await Food.insertMany(dummyFoods);
        console.log(`성공적으로 ${result.length}개의 데이터가 추가되었습니다!`);

    } catch (error) {
        console.error("데이터 삽입 에러:", error);
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB 연결 종료.");
    }
}

seedDB();