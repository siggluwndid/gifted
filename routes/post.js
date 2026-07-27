const express = require('express');
const router = express.Router();
const Food = require('../model/Food');

// POST 요청을 받아서 DB에 저장하는 라우터
router.post('/', async (req, res) => {
    try {
        // 파이썬에서 보낸 데이터 확인 (단일 객체 혹은 배열일 수 있음)
        const foodData = req.body;

        // MongoDB에 데이터 저장 (Mongoose create 사용)
        const savedFood = await Food.create(foodData);

        return res.status(201).json({
            success: true,
            message: "성공적으로 저장되었습니다.",
            data: savedFood
        });

    } catch (error) {
        console.error("데이터 저장 에러:", error);
        return res.status(500).json({ 
            success: false, 
            message: "데이터 저장에 실패했습니다.",
            error: error.message 
        });
    }
});

module.exports = router;