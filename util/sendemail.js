const nodemailer = require('nodemailer');

// 1. 이메일을 보낼 '집배원(transporter)' 설정
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'baechoo0527@gmail.com',
    pass: 'ubur hlev wndu txxd'
  }
});

// 2. 메일 전송 함수 정의
async function sendReminderEmail(urgentFoods) {
  const foodListText = urgentFoods.map(food => {
    const rawExp = food.expirationDate || food.expiration;
    const expDate = String(rawExp).split('T')[0];
    return `- ${food.name} (유통기한: ${expDate})`;
  }).join('\n');

  // 메일 옵션 (받는 사람, 제목, 내용 전부 하드코딩!)
  const mailOptions = {
    from: '"냉장고에 굶주린 검은흑곰🐻" <baechoo0527@gmail.com>',
    to: 'siggluwndid@naver.com', 
    subject: '🚨 [경고] 냉장고에 유통기한이 임박한 식품이 있습니다',
    text: `안녕하세요!\n\n아래 식품들의 유통기한이 3일 이하로 남았습니다.\n빠른 소비 권장드립니다!\n\n이우진\n\n오늘도 좋은 하루 되세요!`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✉️ 이메일 전송 성공:', info.response);
  } catch (error) {
    console.error('❌ 이메일 전송 실패:', error);
  }
}

module.exports = sendReminderEmail;