const express = require('express');
const router = express.Router();
const Food = require('../model/Food'); 

router.get('/', async (req, res) => {
    try {
        const allFoods = await Food.find({});

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