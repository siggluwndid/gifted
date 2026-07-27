const express = require('express');
const router = express.Router();
const Food = require('../model/Food'); // 작성하신 Mongoose 모델 경로에 맞게 수정하세요

router.get('/', async (req, res) => {
    try {
        // 조건 없이 MongoDB 컬렉션의 모든 데이터를 싹 다 조회
        const allFoods = await Food.find({});

        // 모든 데이터를 그대로 JSON으로 응답
        return res.status(200).json({
            success: true,
            count: allFoods.length,
            foods: allFoods
        });

    } catch (error) {
        console.error("데이터 조회 에러:", error);
        return res.status(500).json({ 
            success: false, 
            message: "모든 데이터를 불러오는 데 실패했습니다." 
        });
    }
});

module.exports = router;