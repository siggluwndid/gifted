const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  // 1. 음식 이름
  name: { 
    type: String, 
    required: true 
  },
  // 2. 냉장 / 냉동 구분 ('fridge' 또는 'freezer'만 허용)
  storageType: { 
    type: String, 
    required: true, 
    enum: ['냉장', '냉동'] // 다른 값이 들어오지 않게 검증
  },
  // 3. 유통기한 (리마인더용)
  expirationDate: { 
    type: Date, 
    required: true 
  }
});

module.exports = mongoose.model('Food', foodSchema);